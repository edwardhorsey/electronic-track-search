import type { NextApiRequest, NextApiResponse } from 'next';

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

export interface AutoCompleteItem {
    bandName: string;
    name: string;
}

interface Error {
    message: string;
    error: unknown;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AutoCompleteItem[] | Error>) {
    const value = req.query?.search_text ?? '';

    try {
        const response = await fetch('https://bandcamp.com/api/bcsearch_public_api/1/autocomplete_elastic', {
            method: 'post',
            body: JSON.stringify({
                search_text: value,
                search_filter: 't',
                full_page: false,
                fan_id: null,
            }),
        });

        const data = (await response.json()) as BandcampSearchPublicApiResponse;

        if (response.ok && data) {
            const items = data.auto?.results || [];
            const autocomplete = items.map((item) => ({ bandName: item.band_name, name: item.name }));

            res.status(200).json(autocomplete);
        } else {
            res.status(404).json({
                message: 'Failed to get autocomplete data',
                error: data,
            });
        }
    } catch (error) {
        console.error(error);

        res.status(404).json({
            message: 'Failed to get autocomplete data',
            error,
        });
    }
}
