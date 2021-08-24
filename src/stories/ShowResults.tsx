import { SearchQuery } from '../types/types';
import { DiscogsResults } from './DiscogsResults';
import { YoutubeResult } from './YoutubeResult';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ShowResultsProps extends SearchQuery {}

export const ShowResults = ({
  artist,
  track,
}: ShowResultsProps): JSX.Element => (
  <div className="flex flex-col md:flex-row w-full">
    <div className="flex flex-col w-full md:w-3/5 border border-gray-300 p-5">
      <DiscogsResults artist={artist} track={track} />
      <YoutubeResult artist={artist} track={track} />
    </div>
    <div className="flex justify-center w-full md:w-2/5 border border-gray-300 p-5">
      <p className="text-md">
        Soundcloud results
      </p>
    </div>
  </div>
);
