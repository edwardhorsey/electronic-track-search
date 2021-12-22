/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  SoundcloudMixResultsData,
  MixesDbResultsError,
  MixesDbResults,
  SoundcloudResult,
  SoundcloudResults,
  MixesDbLink,
  MixesDbTitle,
} from '../../types/types';

const urlMixesDB = (search: string, key: string): string => (
  'https://www.googleapis.com/customsearch/v1/siterestrict'
  + `?&key=${key}&cx=011544546440637270403%3Argrlx5occ_0&q=${search}`
);
const mixesDbTitles = (data: MixesDbTitle[]): MixesDbLink[] => (
  data.map((title: MixesDbTitle) => title.link
    .slice(title.link.indexOf('/w/') + 16).replace(/_/g, ' '))
);

type GoogleSearchKeys = string[];

interface GoogleSearchRequest {
  title: string;
  url: string;
}

const soundcloudKeys: GoogleSearchKeys = [
  process.env.keyGoogleSc1 as string,
  process.env.keyGoogleSc2 as string,
  process.env.keyGoogleSc3 as string,
  process.env.keyGoogleSc4 as string,
  process.env.keyGoogleSc5 as string,
  process.env.keyGoogleSc6 as string,
  process.env.keyGoogleSc7 as string,
  process.env.keyGoogleSc8 as string,
  process.env.keyGoogleSc9 as string,
  process.env.keyGoogleSc10 as string,
];

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
): Promise<SoundcloudResult> => fetch(link.url)
  .then((data) => data.json())
  .then((jsonData) => {
    const output = { title: link.title, url: findLink(jsonData) };
    return output;
  })
  .catch((error) => error);

const runSearch = async (array: GoogleSearchRequest[]) => {
  const searches = [];
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const search = await getSoundcloudLinkRequest(array[i]);
    searches.push(search);
  }

  return searches;
};

// request soundcloud links
export const requestSC = async (
  reqArray: MixesDbLink[],
): Promise<SoundcloudResult[]> => {
  const arrayOfTitles = reqArray;
  const arrayOfSearches = getRequests(arrayOfTitles, soundcloudKeys);
  const links = await runSearch(arrayOfSearches);

  return links;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SoundcloudMixResultsData|MixesDbResultsError>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  try {
    const mixesDbResults = await fetch(
      urlMixesDB(searchString, process.env.keygmixesdb as string),
    );
    const mixesDbResultsJson = await mixesDbResults.json();
    const mixesDbResultsMixTitles = mixesDbTitles(mixesDbResultsJson.items);

    const soundcloudMixesLinks = await requestSC(mixesDbResultsMixTitles);

    res.status(200).json({
      name: 'Soundcloud mixes search',
      soundcloudResults: soundcloudMixesLinks,
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
