/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import { MixesDbResultsData } from '../../types/types';

interface MixesDbTitle {
  title: string;
  link: string;
}
const urlMixesDB = (search: string, key: string): string => (
  'https://www.googleapis.com/customsearch/v1/siterestrict'
  + `?&key=${key}&cx=011544546440637270403%3Argrlx5occ_0&q=${search}`
);
const mixesDbTitles = (data: MixesDbTitle[]): string[] => (
  data.map((title: MixesDbTitle) => title.link
    .slice(title.link.indexOf('/w/') + 16).replace(/_/g, ' '))
);

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MixesDbResultsData>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  const mixesDbResults = await fetch(
    urlMixesDB(searchString, process.env.keygmixesdb as string),
  )
    .then((data) => data.json())
    .then((jsonData) => mixesDbTitles(jsonData.items))
    .catch((error) => error);

  res.status(200).json({
    name: 'MixesDb search',
    mixesDbResults,
  });
}
