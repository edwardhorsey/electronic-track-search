/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  MixesResultsData,
  MixesResultsError,
  MixesDbResults,
  SoundcloudMixResults,
  GoogleSearchKeys,
  GoogleSearchRequest,
  MixesResultsState,
  MixesDbLink,
} from '../../types';
import { keyGoogleSiteSearchMixesDb, soundcloudKeys } from '../../config';
import { mockSoundcloudLinks } from '../../mocks/data';
import {
  removeEmptyObjectsFromArray,
  extractMixTitles,
  findLinkFromSoundcloudDomain,
} from '../../utils/misc';

const getMixTitlesFromMixesdbResults = async (
  search: string,
): Promise<MixesDbLink[]> => {
  try {
    // eslint-disable-next-line max-len
    const mixesDbGoogleSearchUrl = `https://www.googleapis.com/customsearch/v1/siterestrict?&key=${keyGoogleSiteSearchMixesDb}&cx=011544546440637270403%3Argrlx5occ_0&q=${search}`;
    const mixesDbGoogleSearch = await fetch(mixesDbGoogleSearchUrl);
    const data = await mixesDbGoogleSearch.json();
    const mixesTitles = extractMixTitles(data.items);

    return mixesTitles;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return [];
  }
};

const getRequests = (
  array: MixesDbResults, keys: GoogleSearchKeys,
): GoogleSearchRequest[] => array.map((mixTitle, index) => ({
  title: mixTitle,
  // eslint-disable-next-line max-len
  url: `https://www.googleapis.com/customsearch/v1?siterequest?&key=${keys[index]}&cx=011544546440637270403%3Aqlxjbhczn6i&q=${mixTitle}`,
}));

const getSoundcloudLinkRequest = async (
  link: GoogleSearchRequest,
): Promise<any> => {
  const { title: mixTitle, url: mixUrl } = link;
  const response = await fetch(mixUrl);
  const data = await response.json();
  console.log({ data });

  if (response.ok) {
    const output = {
      title: mixTitle,
      url: findLinkFromSoundcloudDomain(data),
    };
    console.log(output);

    return output;
  }

  return {};
};

const fetchAllUrls = async (
  array: GoogleSearchRequest[],
): Promise<SoundcloudMixResults[]> => {
  const searches = [];
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const search = await getSoundcloudLinkRequest(array[i]);
    console.log({ search });
    searches.push(search);
  }

  return removeEmptyObjectsFromArray(searches);
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MixesResultsData|MixesResultsError>,
) {
  const { artist, track } = req.query;
  const searchString = `${artist} ${track}`;

  try {
    const mixTitlesFromMixesdbResults = await getMixTitlesFromMixesdbResults(
      searchString,
    );
    const justOne = [mixTitlesFromMixesdbResults[1]];
    console.log({ justOne });

    const arrayOfSoundcloudGoogleSearchRequests = getRequests(
      justOne,
      soundcloudKeys,
    );
    console.log({ arrayOfSoundcloudGoogleSearchRequests });
    const soundcloudMixResults = await fetchAllUrls(
      arrayOfSoundcloudGoogleSearchRequests,
    );

    let mixesResults = soundcloudMixResults;
    let state: MixesResultsState = 'real';

    if (!soundcloudMixResults.length) {
      mixesResults = mockSoundcloudLinks;
      state = 'mock';
    }

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
