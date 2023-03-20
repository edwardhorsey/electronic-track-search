import { DiscogsResponse, SearchQuery } from '../types';
import { DiscogsResults } from './DiscogsResults';
import { SoundcloudResults } from './SoundcloudResults';
import { YoutubeResult } from './YoutubeResult';

export interface ShowResultsProps extends SearchQuery {
    discogsResult?: DiscogsResponse;
    youtubeResult: string;
}

export const ShowResults = ({ artist, track, discogsResult, youtubeResult }: ShowResultsProps): JSX.Element => (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-screen min-h-700">
        <div className="flex flex-col w-full md:w-3/5 p-5">
            <DiscogsResults discogsResult={discogsResult} />
            <YoutubeResult youtubeResult={youtubeResult} />
        </div>
        <div className="flex justify-center w-full md:w-2/5 p-5">
            <SoundcloudResults artist={artist} track={track} />
        </div>
    </div>
);
