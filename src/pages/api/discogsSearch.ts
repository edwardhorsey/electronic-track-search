/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import { DiscogsResultsData } from '../../types/types';

const urlDiscogs = (search: string, key: string): string => (
  'https://api.discogs.com/database/search?q='
  + `${search}&token=${key}`
);

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiscogsResultsData>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  const discogsResults = await fetch(
    urlDiscogs(searchString, process.env.keydiscogs as string),
  )
    .then((data) => data.json())
    .then((jsonData) => jsonData.results[0])
    .catch((error) => error);

  res.status(200).json({
    name: 'Discogs search',
    discogsResults,
  });
}
