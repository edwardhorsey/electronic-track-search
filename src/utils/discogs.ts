import { keyDiscogs } from '../config';
import { DiscogsResponse } from '../types';

export async function getDiscogsData(searchString: string): Promise<DiscogsResponse | undefined> {
    try {
        const url = `https://api.discogs.com/database/search?q=${searchString}&token=${keyDiscogs}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data?.results.length) {
            return data.results[0];
        }
    } catch (error) {
        console.log(error);
    }

    return undefined;
}
