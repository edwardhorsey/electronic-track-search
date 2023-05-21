import type { NextApiRequest, NextApiResponse } from 'next';
import {
    MixesResultsData,
    MixesResultsError,
    MixesDbResults,
    SoundcloudMixResults,
    GoogleSearchRequest,
    MixesResultsState,
    MixesDbLink,
} from '../../types';
import { keyGoogleSiteSearchMixesDb, soundcloudKeys } from '../../config';
import { mockSoundcloudLinks } from '../../mocks/data';
import { extractMixTitles, findLinkFromSoundcloudDomain } from '../../lib/misc';

const getMixTitlesFromMixesdbResults = async (search: string): Promise<MixesDbLink[]> => {
    try {
        const mixesDbGoogleSearchUrl = `https://www.googleapis.com/customsearch/v1/siterestrict?&key=${keyGoogleSiteSearchMixesDb}&cx=011544546440637270403%3Argrlx5occ_0&q=${search}`;
        const mixesDbGoogleSearch = await fetch(mixesDbGoogleSearchUrl);
        const data = await mixesDbGoogleSearch.json();
        const mixesTitles = extractMixTitles(data.items);

        return mixesTitles;
    } catch (error) {
        console.log(error);

        return [];
    }
};

const createSoundcloudGoogleSearchRequests = (mixTitles: MixesDbResults): GoogleSearchRequest[] =>
    mixTitles.map((mixTitle, index) => {
        const encodedTitle = encodeURIComponent(mixTitle);
        const key = soundcloudKeys[index];

        return {
            title: mixTitle,
            url: `https://www.googleapis.com/customsearch/v1?siterequest?&key=${key}&cx=33af1a4cebf19519a&q=${encodedTitle}`,
        };
    });

const getSoundcloudLinkPromise = async (link: GoogleSearchRequest): Promise<SoundcloudMixResults> => {
    try {
        const { title: mixTitle, url: mixUrl } = link;
        const response = await fetch(mixUrl);
        const data = await response.json();

        if (response.ok && Number(data.searchInformation.totalResults) > 0 && data?.items) {
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

const fetchAllRequests = async (requests: GoogleSearchRequest[]): Promise<SoundcloudMixResults[]> => {
    const requestPromises = requests.map((searchrequest) => getSoundcloudLinkPromise(searchrequest));
    const settledPromises = await Promise.allSettled(requestPromises);
    const fulfilledPromiseValues = settledPromises.reduce(
        (acc: SoundcloudMixResults[], promise: PromiseSettledResult<SoundcloudMixResults>) => {
            if (promise.status === 'fulfilled' && promise?.value) {
                return [...acc, promise.value];
            }

            return acc;
        },
        [],
    );

    return fulfilledPromiseValues;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<MixesResultsData | MixesResultsError>) {
    const track = `${req.query.track ?? ''}`;
    const searchString = encodeURIComponent(track);

    try {
        if (!searchString) {
            throw new Error('Track not provided');
        }

        const mixTitlesFromMixesdbResults = await getMixTitlesFromMixesdbResults(searchString);
        const soundcloudGoogleSearchRequests = createSoundcloudGoogleSearchRequests(mixTitlesFromMixesdbResults);
        const soundcloudMixResults = await fetchAllRequests(soundcloudGoogleSearchRequests);

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
        console.error(error);

        res.status(404).json({
            message: 'Failed to get mixes',
            error,
        });
    }
}
