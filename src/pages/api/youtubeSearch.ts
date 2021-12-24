/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import { YoutubeResultsData } from '../../types';

const urlYoutube = (search: string, key: string): string => (
  'https://www.googleapis.com/youtube/v3/search?'
  + `part=snippet&key=${key}&type=video&q=${search}`
);

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<YoutubeResultsData>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  const youtubeResult = await fetch(
    urlYoutube(searchString, process.env.keygyoutube as string),
  )
    .then((data) => data.json())
    .then((jsonData) => jsonData.items[0].id.videoId)
    .catch((error) => error);

  res.status(200).json({
    name: 'Youtube search',
    youtubeResult,
  });
}
