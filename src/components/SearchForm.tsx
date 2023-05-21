import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { uniqueId } from '../lib/misc';
import { useEffect, useState } from 'react';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import { AutoCompleteItem } from '../pages/api/autocomplete';
import { SearchQuery } from '../types';
import { fetchSuggestions } from '../lib/autocomplete';

const id = uniqueId('track');

interface SearchFormProps {
    onSubmit: (values: SearchQuery) => Promise<boolean>;
}

export default function SearchForm({ onSubmit }: SearchFormProps): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SearchQuery>();

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
}

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
