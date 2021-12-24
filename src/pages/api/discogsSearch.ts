/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import { DiscogsResultsData, DiscogsResultsError } from '../../types';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiscogsResultsData|DiscogsResultsError>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  try {
    // eslint-disable-next-line max-len
    const url = `https://api.discogs.com/database/sear?q=${searchString}&token=${process.env.keydiscogs}`;

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
    // eslint-disable-next-line no-console
    console.error(error);

    res.status(404).json({
      message: 'Failed to get discogs data',
      error,
    });
  }
}
