export interface SearchQuery {
  artist: string;
  track: string;
}

export interface DiscogsResponse {
  'country': string;
  'year': string;
  'format': string[];
  'label': string[];
  'type'?: string;
  'genre'?: string[];
  'style': string[];
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
  'title': string;
  'thumb'?: string;
  'cover_image': string;
  'resource_url'?: string;
  'community'?: {
    'want'?: number;
    'have'?: number;
  },
}

export interface DiscogsResultsReduced {
  title: string;
  coverImage: string;
  label: string[];
  country: string;
  year: string;
  style: string[];
  format: string[];
}

export interface YoutubeResultsData {
  name: string;
  youtubeResult: string;
}

export type SoundcloudResult = { link: string };

export interface SoundcloudResults {
  items: SoundcloudResult[];
}

export interface DiscogsResultsData {
  name: string;
  discogsResults: DiscogsResponse;
}

export type MixesDbResults = string[];

export interface MixesDbResultsData {
  name: string;
  mixesDbResults: MixesDbResults;
}

export interface MixesDbResultsError {
  message: string;
  error: unknown;
}
export interface SoundcloudMixResultsData {
  name: string;
  soundcloudResults: SoundcloudResult[];
}

export type MixesDbLink = string;
export interface MixesDbTitle {
  title: string;
  link: MixesDbLink;
}
