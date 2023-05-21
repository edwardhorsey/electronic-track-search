import { AutoCompleteItem } from '../pages/api/autocomplete';

const cache: Record<string, AutoCompleteItem[]> = {};

export async function fetchSuggestions(value: string): Promise<AutoCompleteItem[]> {
    if (cache[value]) {
        return Promise.resolve(cache[value]);
    }

    const res = await fetch(`api/autocomplete?search_text=${value}`);
    const json = (await res.json()) as AutoCompleteItem[];

    const items = json || [];

    if (items.length > 0) {
        cache[value] = items;
        return items;
    }

    return [];
}
