import useSWR from 'swr';
import ReactPlayer from 'react-player';
import { SearchQuery, MixesResultsData } from '../types';
import getTrackResults from '../utils/getTrackResults';
import { ErrorMessage } from './ErrorMessage';
import { SkeletonLoader } from './SkeletonLoader';
import { uniqueId } from '../utils/misc';

interface SoundcloudPlayerProps {
    title: string;
    url: string;
}

export const SoundcloudPlayer = ({ title, url }: SoundcloudPlayerProps): JSX.Element => (
    <div className="my-2">
        <h3 className="text-base lg:text-lg pb-1">{title}</h3>
        <ReactPlayer height="130px" width="100%" url={url} />
    </div>
);

export type SoundcloudResultsProps = SearchQuery;

export const SoundcloudResults = ({ artist, track }: SoundcloudResultsProps): JSX.Element => {
    const url = `/api/mixesSearch/?artist=${artist}&track=${track}`;
    const { data, error } = useSWR(url, () => getTrackResults<MixesResultsData>(url));

    if (error) return <ErrorMessage message={error.message} />;

    if (!data) {
        return (
            <div className="w-full max-w-2xl h-full mx-auto md:overflow-y-auto">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
            </div>
        );
    }

    const mixes = data.mixesResults;

    return (
        <div className="w-full max-w-2xl h-full mx-auto md:overflow-y-auto">
            {mixes.map((soundcloudMix) => {
                const key = uniqueId('soundcloud-mix');
                const { title, url: mixUrl } = soundcloudMix;

                return <SoundcloudPlayer key={key} title={title} url={mixUrl} />;
            })}
        </div>
    );
};
