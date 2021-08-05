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

export interface GetTrackResultsData {
  name: string;
  discogsResults: DiscogsResponse;
  youtubeResult: string;
  mixesDbResults: string[];
}
