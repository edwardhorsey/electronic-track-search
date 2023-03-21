import { GoogleSearchKeys } from '../types';

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

const keyDiscogs = process.env.keydiscogs as string;

const keyYoutube = process.env.keygyoutube as string;

const keyGoogleSiteSearchMixesDb = process.env.keygmixesdb as string;

if (
    typeof window === 'undefined' &&
    (soundcloudKeys.filter(Boolean).length === 0 || !keyDiscogs || !keyYoutube || !keyGoogleSiteSearchMixesDb)
) {
    throw new Error('Set env variables');
}

export { soundcloudKeys, keyDiscogs, keyYoutube, keyGoogleSiteSearchMixesDb };

export const description =
    'A search engine for tracks played in DJ sets - find mixes which feature a track. Search for a track - Receive release information - Receive mixes featuring the track';
export const favicon = '/favicon.ico';
export const ogImage = 'https://www.electronictracksearch.com/og.jpeg';
export const siteUrl = 'https://www.electronictracksearch.com/';
export const title = 'Electronic Track Search';
export const locale = 'en_GB';
