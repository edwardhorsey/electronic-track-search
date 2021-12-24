/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import { YoutubeResultsData, YoutubeResultsError } from '../../types';
import { keyYoutube } from '../../config';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<YoutubeResultsData|YoutubeResultsError>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  try {
    // eslint-disable-next-line max-len
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${keyYoutube}&type=video&q=${searchString}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data?.items.length) {
      const { videoId } = data.items[0].id;

      res.status(200).json({
        name: 'Youtube search',
        youtubeResult: videoId,
      });
    } else {
      res.status(404).json({
        message: 'Failed to get youtube data',
        error: data,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    res.status(404).json({
      message: 'Failed to get youtube data',
      error,
    });
  }
}
