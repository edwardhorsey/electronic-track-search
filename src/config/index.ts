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

if (soundcloudKeys.filter(Boolean).length === 0 || !keyDiscogs || !keyYoutube || !keyGoogleSiteSearchMixesDb) {
    throw new Error('Set env variables');
}

export { soundcloudKeys, keyDiscogs, keyYoutube, keyGoogleSiteSearchMixesDb };
