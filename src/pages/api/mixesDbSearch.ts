/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  SoundcloudMixResultsData,
  MixesDbResultsError,
  MixesDbResults,
  SoundcloudResults,
  SoundcloudMixResults,
  MixesDbLink,
  MixesDbTitle,
  GoogleSearchKeys,
  GoogleSearchRequest,
} from '../../types/types';
import { soundcloudKeys } from '../../config';

const createMixesDbGoogleSearchUrl = (search: string, key: string): string => (
  'https://www.googleapis.com/customsearch/v1/siterestrict'
  + `?&key=${key}&cx=011544546440637270403%3Argrlx5occ_0&q=${search}`
);
const extractMixTitles = (data: MixesDbTitle[]): MixesDbLink[] => (
  data.map((title: MixesDbTitle) => title.link
    .slice(title.link.indexOf('/w/') + 16).replace(/_/g, ' '))
);

const getRequests = (
  array: MixesDbResults, keys: GoogleSearchKeys,
): GoogleSearchRequest[] => array.map((el, index) => ({
  title: el,
  // eslint-disable-next-line max-len
  url: `https://www.googleapis.com/customsearch/v1?siterequest?&key=${keys[index]}&cx=011544546440637270403%3Aqlxjbhczn6i&q=${el}`,
}));

const findLink = (result: SoundcloudResults): string|null => {
  const resultWithLink = result.items.find((el) => el.link.includes('https://soundcloud.com/'));

  if (resultWithLink) {
    const { link } = resultWithLink;
    return link?.match(/\//g)?.length === 4 ? link : null;
  }

  return null;
};

const getSoundcloudLinkRequest = async (
  link: GoogleSearchRequest,
): Promise<SoundcloudMixResults> => fetch(link.url)
  .then((data) => data.json())
  .then((jsonData) => {
    const output = { title: link.title, url: findLink(jsonData) };

    return output;
  })
  .catch((error) => error);

const fetchAllUrls = async (array: GoogleSearchRequest[]) => {
  const searches = [];
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const search = await getSoundcloudLinkRequest(array[i]);
    searches.push(search);
  }

  return searches;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SoundcloudMixResultsData|MixesDbResultsError>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  try {
    const mixesDbGoogleSearchUrl = createMixesDbGoogleSearchUrl(
      searchString,
      process.env.keygmixesdb as string,
    );
    const mixesDbResults = await fetch(mixesDbGoogleSearchUrl);
    const mixesDbResultsJson = await mixesDbResults.json();
    const mixesDbResultsMixTitles = extractMixTitles(
      mixesDbResultsJson.items,
    );

    const arrayOfSoundcloudGoogleSearchRequests = getRequests(
      mixesDbResultsMixTitles,
      soundcloudKeys,
    );
    const soundcloudMixResults = await fetchAllUrls(
      arrayOfSoundcloudGoogleSearchRequests,
    );

    res.status(200).json({
      name: 'Soundcloud mixes search',
      soundcloudMixResults,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    res.status(404).json({
      message: 'Failed to get mixes',
      error,
    });
  }
}
