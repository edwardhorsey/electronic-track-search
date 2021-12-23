/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MixesResultsData,
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
import { mockSoundcloudLinks } from '../../mocks/data';

const removeEmptyObjectsFromArray = <T>(
  array: T[],
): T[] => array.filter((result) => (
    Object.keys(result).length > 0
  ));

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
  res: NextApiResponse<MixesResultsData|MixesDbResultsError>,
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

    const cleanupSoundcloudMixResults = removeEmptyObjectsFromArray(
      soundcloudMixResults,
    );

    const mixesResults = cleanupSoundcloudMixResults.length
      ? cleanupSoundcloudMixResults
      : mockSoundcloudLinks;

    const state = cleanupSoundcloudMixResults.length
      ? 'real'
      : 'mock';

    res.status(200).json({
      name: 'Soundcloud mixes search',
      mixesResults,
      state,
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
