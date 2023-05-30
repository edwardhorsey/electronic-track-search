import { DiscogsResponse, SearchQuery } from '../types';
import { DiscogsResults } from './DiscogsResults';
import { SoundcloudResults } from './SoundcloudResults';
import { YoutubeResult } from './YoutubeResult';

export interface ShowResultsProps extends SearchQuery {
    discogsResult?: DiscogsResponse;
    youtubeResult: string;
}

export const ShowResults = ({ track, discogsResult, youtubeResult }: ShowResultsProps) => {
    const title = discogsResult?.title ?? '';

    return (
        <div className="flex flex-col h-auto min-h-700 p-5">
            {title && <h3 className="text-xl md:text-2xl text-center">{title}</h3>}
            <div className="flex flex-col gap-5 md:flex-row w-full pt-5">
                <div className="flex flex-col w-full md:w-3/5 xl:pr-5">
                    <DiscogsResults discogsResult={discogsResult} />
                    <YoutubeResult youtubeResult={youtubeResult} />
                </div>
                <div className="flex justify-center w-full md:w-2/5">
                    <SoundcloudResults track={track} />
                </div>
            </div>
        </div>
    );
};
