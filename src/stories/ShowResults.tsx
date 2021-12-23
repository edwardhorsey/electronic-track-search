import { SearchQuery } from '../types/types';
import { DiscogsResults } from './DiscogsResults';
import { SoundcloudResults } from './SoundcloudResults';
import { YoutubeResult } from './YoutubeResult';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ShowResultsProps extends SearchQuery {}

export const ShowResults = ({
  artist,
  track,
}: ShowResultsProps): JSX.Element => (
  <div className="flex flex-col md:flex-row w-full h-auto md:h-screen min-h-700">
    <div className="flex flex-col w-full md:w-3/5 border border-gray-300 p-5">
      <DiscogsResults artist={artist} track={track} />
      <YoutubeResult artist={artist} track={track} />
    </div>
    <div className="flex justify-center w-full md:w-2/5 border border-gray-300 p-5">
      <SoundcloudResults artist={artist} track={track} />
    </div>
  </div>
);
