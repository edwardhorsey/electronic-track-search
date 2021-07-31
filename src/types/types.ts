export interface SearchQuery {
  artist: string;
  track: string;
}

export interface DiscogsResults {
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

export interface GetTrackResultsData {
  name: string;
  discogsResults: DiscogsResults;
  youtubeResult: string;
  mixesDbResults: string[];
}
