import useSWR from 'swr';
import ReactPlayer from 'react-player';
import { SearchQuery, SoundcloudMixResultsData } from '../types/types';
import getTrackResults from '../utils/getTrackResults';
import { ErrorMessage } from './ErrorMessage';
import { SkeletonLoader } from './SkeletonLoader';

let fakeKey = 0;

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface SoundcloudResultsProps extends SearchQuery {}

export const SoundcloudResults = ({
  artist,
  track,
}: SoundcloudResultsProps): JSX.Element => {
  const url = `/api/mixesDbSearch/?artist=${artist}&track=${track}`;
  const { data, error } = useSWR(
    url,
    () => getTrackResults<SoundcloudMixResultsData>(url),
  );

  if (error) return <ErrorMessage message={error.message} />;

  if (!data) return <SkeletonLoader />;

  const mixes = data.soundcloudMixResults;

  return (
    <div className="w-full max-w-2xl h-full mx-auto overflow-y-auto">
      {mixes.map((soundcloudMix) => {
        fakeKey += 1;
        const key = `fakeKey${fakeKey}`;
        return (
          <div key={key}>
            <h3>{soundcloudMix.title}</h3>
            <ReactPlayer height="150px" width="100%" url={soundcloudMix.url} />
          </div>
        );
      })}
    </div>
  );
};
