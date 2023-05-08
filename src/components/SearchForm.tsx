import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { uniqueId } from '../utils/misc';
import { useEffect, useState } from 'react';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import mockBandcampSearchResponse from '../data/mockBandcampSearchResponse.json';

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
                                                        key={str}
                                                        value={str}
                                                    />
                                                );
                                            })}
                                        </ComboboxList>
                                    ) : (
                                        <span style={{ display: 'block', margin: 8 }}>No results found</span>
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
    const [suggestions, setSuggestions] = useState<TrackAutoCompleteItem[]>([]);

    useEffect(() => {
        if (searchTerm?.trim() !== '') {
            let isFresh = true;

            fetchSuggestions(searchTerm).then((cities) => {
                if (isFresh) {
                    setSuggestions(cities);
                }
            });

            return () => {
                isFresh = false;
            };
        }
    }, [searchTerm]);

    return suggestions;
}

export interface BandcampSearchPublicApiResponse {
    auto: {
        results: Result[];
        stat_params_for_tag: string;
        time_ms: number;
    };
}

export interface Result {
    type: 'a' | 'b' | 't';
    id: number;
    art_id: number;
    img_id: null;
    name: string;
    band_id: number;
    band_name: string;
    album_name: null | string;
    item_url_root: string;
    item_url_path: string;
    img: string;
    album_id: number | null;
    stat_params: string;
}

interface TrackAutoCompleteItem {
    bandName: string;
    name: string;
}

const cache: Record<string, TrackAutoCompleteItem[]> = {};

function fetchSuggestions(value: string): Promise<TrackAutoCompleteItem[]> {
    if (cache[value]) {
        return Promise.resolve(cache[value]);
    }

    return fetch(
        'https://cors-anywhere.herokuapp.com/https://bandcamp.com/api/bcsearch_public_api/1/autocomplete_elastic',
        {
            method: 'post',
            body: JSON.stringify({
                search_text: value,
                search_filter: 't',
                full_page: false,
                fan_id: null,
            }),
        },
    )
        .then((res) => res.json())
        .then((res: BandcampSearchPublicApiResponse) => {
            // Mock for now
            res = mockBandcampSearchResponse as BandcampSearchPublicApiResponse;

            const items = res.auto.results;

            if (items.length > 0) {
                const results = items.map((item) => ({ bandName: item.band_name, name: item.name }));
                cache[value] = results;
                return results;
            }

            return [];
        });
}

export default SearchForm;
