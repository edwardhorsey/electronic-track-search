import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { uniqueId } from '../utils/misc';
import { useEffect, useState } from 'react';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import { AutoCompleteItem } from '../pages/api/autocomplete';

const id = uniqueId('track');

export interface SearchFormFields {
    track: string;
}

interface SearchFormProps {
    onSubmit: (values: SearchFormFields) => Promise<boolean>;
}

const SearchForm = ({ onSubmit }: SearchFormProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SearchFormFields>();

    const searchTerm = watch('track' as const);
    const autocompleteResults = useAutocomplete(searchTerm);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="form my-6 text-left w-full xs:w-5/6 max-w-xl"
            aria-label="form"
        >
            <div className="flex flex-col sm:flex-row justify-center md:mt-6">
                <div className="flex flex-col w-full mb-6">
                    <label htmlFor={id} className="flex flex-col text-base sm:text-lg w-full">
                        <span className="mb-1">Track</span>
                        <Combobox aria-label="Track" className="flex flex-col text-base sm:text-lg">
                            <ComboboxInput
                                className="border border-slate-200 p-2 rounded-lg text-base sm:text-lg appearance-none focus:outline-none focus:border-slate-500"
                                placeholder={'Seleccion Natural Left Behind'}
                                {...register('track', { required: true })}
                            />
                            {autocompleteResults && (
                                <ComboboxPopover className="bg-white">
                                    {autocompleteResults.length > 0 ? (
                                        <ComboboxList className="ml-2 mb-1">
                                            {autocompleteResults.map((result) => {
                                                const str = `${result.bandName}, ${result.name}`;
                                                return (
                                                    <ComboboxOption
                                                        className="py-1 hover:bg-slate-100"
                                                        key={uniqueId(str)}
                                                        value={str}
                                                    />
                                                );
                                            })}
                                        </ComboboxList>
                                    ) : (
                                        <span className="block m-2">No results found</span>
                                    )}
                                </ComboboxPopover>
                            )}
                        </Combobox>
                    </label>
                    {errors['track']?.type === 'required' && (
                        <span className="mb-3 mt-1 text-normal text-red-500" role="alert">
                            Track is required
                        </span>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <Button text="Search" submit />
            </div>
        </form>
    );
};

function useAutocomplete(searchTerm: string) {
    const [suggestions, setSuggestions] = useState<AutoCompleteItem[]>([]);

    useEffect(() => {
        if (searchTerm?.trim() !== '') {
            let isFresh = true;

            fetchSuggestions(searchTerm)
                .then((cities) => {
                    if (isFresh) {
                        setSuggestions(cities);
                    }
                })
                .catch((err) => console.log('Failed to get autocomplete suggestions', err));

            return () => {
                isFresh = false;
            };
        }
    }, [searchTerm]);

    return suggestions;
}

const cache: Record<string, AutoCompleteItem[]> = {};

function fetchSuggestions(value: string): Promise<AutoCompleteItem[]> {
    if (cache[value]) {
        return Promise.resolve(cache[value]);
    }

    return fetch(`api/autocomplete?search_text=${value}`)
        .then((res) => res.json())
        .then((json: AutoCompleteItem[]) => {
            const items = json || [];

            if (items.length > 0) {
                cache[value] = items;
                return items;
            }

            return [];
        });
}

export default SearchForm;
