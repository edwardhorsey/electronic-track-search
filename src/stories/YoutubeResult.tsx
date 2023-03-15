import useSWR from 'swr';
import { SearchQuery, YoutubeResultsData } from '../types';
import getTrackResults from '../utils/getTrackResults';
import { ErrorMessage } from './ErrorMessage';
import { SkeletonLoader } from './SkeletonLoader';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface YoutubeResultProps extends SearchQuery {}

export const YoutubeResult = ({ artist, track }: YoutubeResultProps): JSX.Element => {
    const url = `/api/youtubeSearch/?artist=${artist}&track=${track}`;
    const { data, error } = useSWR(url, () => getTrackResults<YoutubeResultsData>(url));

    if (error) return <ErrorMessage message={error.message} />;

    if (!data) return <SkeletonLoader type="Youtube" />;

    const { youtubeResult: embedId } = data;

    return (
        <div className="w-100% max-w-2xl h-64 md:h-72 lg:h-96 mx-auto">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
};
