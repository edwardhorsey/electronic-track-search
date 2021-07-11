import type { NextApiRequest, NextApiResponse } from 'next';

interface Keys {
  keyDiscogs: string;
  keyGoogleYoutube: string;
  keyGoogleMixesDb: string;
}

interface DiscogsResults {
  'country'?: string;
  'year'?: string;
  'format'?: string[];
  'label'?: string[];
  'type'?: string;
  'genre'?: string[];
  'style'?: string[];
  'id'?: number;
  'barcode'?: [],
  'user_data'?: {
    'in_wantlist'?: boolean;
    'in_collection'?: boolean;
  },
  'master_id'?: number;
  'master_url'?: string;
  'uri'?: string;
  'catno'?: string;
  'title'?: string;
  'thumb'?: string;
  'cover_image'?: string;
  'resource_url'?: string;
  'community'?: {
    'want'?: number;
    'have'?: number;
  },
}

interface Data {
  name: string;
  discogsResults: DiscogsResults;
  youtubeResult: string;
  mixesDbResults: string[];
}

const urlDiscogs = (search: string, key: string) => (
  'https://api.discogs.com/database/search?q='
  + `${search}&token=${key}`
);
const urlYoutube = (search: string, key: string) => (
  'https://www.googleapis.com/youtube/v3/search?'
  + `part=snippet&key=${key}&type=video&q=${search}`
);
const urlMixesDB = (search: string, key: string) => (
  'https://www.googleapis.com/customsearch/v1/siterestrict'
  + `?&key=${key}&cx=011544546440637270403%3Argrlx5occ_0&q=${search}`
);
const mixesDbTitles = (data: any) => (
  data.map((el: any) => el.link
    .slice(el.link.indexOf('/w/') + 16).replace(/_/g, ' '))
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { searchString } = req.body.searchString;
  const keys: Keys = {
    keyDiscogs: process.env.keydiscogs as string,
    keyGoogleYoutube: process.env.keygyoutube as string,
    keyGoogleMixesDb: process.env.keygmixesdb as string,
  };
  const discogsResults = await fetch(urlDiscogs(searchString, keys.keyDiscogs))
    .then((data) => data.json())
    .then((jsonData) => jsonData.results[0])
    .catch((error) => error);
  const youtubeResult = await fetch(
    urlYoutube(searchString, keys.keyGoogleYoutube),
  )
    .then((data) => data.json())
    .then((jsonData) => jsonData.items[0].id.videoId)
    .catch((error) => error);
  const mixesDbResults = await fetch(
    urlMixesDB(searchString, keys.keyGoogleMixesDb),
  )
    .then((data) => data.json())
    .then((jsonData) => mixesDbTitles(jsonData.items))
    .catch((error) => error);

  res.status(200).json({
    name: 'Track search',
    discogsResults,
    youtubeResult,
    mixesDbResults,
  });
}