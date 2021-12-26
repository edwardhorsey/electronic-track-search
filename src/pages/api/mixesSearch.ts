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
  MixesDbResultsData,
} from '../../types';
import { keyGoogleSiteSearchMixesDb, soundcloudKeys } from '../../config';
import { mockSoundcloudLinks } from '../../mocks/data';
import {
  removeEmptyObjectsFromArray,
  extractMixTitles,
  findLinkFromSoundcloudDomain,
} from '../../utils/misc';

// const customSoundcloudOnlySearchVY = '011544546440637270403%3Aqlxjbhczn6i';
// const customSoundcloudMixcloudSiteSearchCY = '33af1a4cebf19519a';

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

const createSoundcloudGoogleSearchRequests = (
  array: MixesDbResults, keys: GoogleSearchKeys,
): GoogleSearchRequest[] => array.map((mixTitle, index) => ({
  title: mixTitle,
  // eslint-disable-next-line max-len
  url: `https://www.googleapis.com/customsearch/v1?siterequest?&key=${keys[index]}&cx=33af1a4cebf19519a&q=${mixTitle}`,
}));

const getSoundcloudLinkPromise = async (
  link: GoogleSearchRequest,
): Promise<SoundcloudMixResults> => {
  try {
    const { title: mixTitle, url: mixUrl } = link;
    const response = await fetch(mixUrl);
    const data = await response.json();
    console.log({ data });

    if (
      response.ok
      && Number(data.searchInformation.totalResults) > 0
      && data?.items
    ) {
      const soundcloudMixLink = findLinkFromSoundcloudDomain(data.items);

      if (soundcloudMixLink) {
        const output = {
          title: mixTitle,
          url: soundcloudMixLink,
        };

        return Promise.resolve(output);
      }
    }

    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchAllRequests = async (
  array: GoogleSearchRequest[],
): Promise<SoundcloudMixResults[]> => {
  const searches = [];
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const search = getSoundcloudLinkPromise(array[i]);
    console.log({ search });
    searches.push(search);
  }

  const settled = await Promise.allSettled(searches);
  console.log({ settled });

  const fulfilledPromises = settled.filter((promise) => promise.status === 'fulfilled');
  console.log(fulfilledPromises);

  const reducedPromises = settled.reduce((
    acc: SoundcloudMixResults[],
    promise: PromiseSettledResult<SoundcloudMixResults>,
  ) => {
    if (promise.status === 'fulfilled' && promise?.value) {
      return [...acc, promise.value];
    }

    return acc;
  }, []);
  console.log({ reducedPromises });

  return reducedPromises;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MixesResultsData|MixesResultsError>,
) {
  const { artist, track } = req.query;
  const searchString = encodeURIComponent(`${artist} ${track}`);

  try {
    const mixTitlesFromMixesdbResults = await getMixTitlesFromMixesdbResults(
      searchString,
    );
    const justOne = mixTitlesFromMixesdbResults.slice(2, 4);
    console.log({ justOne, length: justOne.length });

    const soundcloudGoogleSearchRequests = createSoundcloudGoogleSearchRequests(
      justOne,
      soundcloudKeys,
    );
    console.log({ soundcloudGoogleSearchRequests });

    const soundcloudMixResults = await fetchAllRequests(
      soundcloudGoogleSearchRequests,
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
