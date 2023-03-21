import type { NextApiRequest, NextApiResponse } from 'next';
import { DiscogsResultsData, DiscogsResultsError } from '../../types';
import { keyDiscogs } from '../../config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DiscogsResultsData | DiscogsResultsError>,
) {
    const { artist, track } = req.query;
    const searchString = encodeURIComponent(`${artist} ${track}`);

    try {
        const url = `https://api.discogs.com/database/search?q=${searchString}&token=${keyDiscogs}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data?.results.length) {
            const discogsResults = data.results[0];

            res.status(200).json({
                name: 'Discogs search',
                discogsResults,
            });
        } else {
            res.status(404).json({
                message: 'Failed to get discogs data',
                error: data,
            });
        }
    } catch (error) {
        console.error(error);

        res.status(404).json({
            message: 'Failed to get discogs data',
            error,
        });
    }
}
