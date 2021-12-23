import useSWR from 'swr';
import ReactPlayer from 'react-player';
import { SearchQuery, MixesResultsData } from '../types/types';
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
  const url = `/api/mixesSearch/?artist=${artist}&track=${track}`;
  const { data, error } = useSWR(
    url,
    () => getTrackResults<MixesResultsData>(url),
  );

  if (error) return <ErrorMessage message={error.message} />;

  if (!data) return <SkeletonLoader />;

  const mixes = data.mixesResults;

  return (
    <div className="w-full max-w-2xl h-full mx-auto md:overflow-y-auto">
      {mixes.map((soundcloudMix) => {
        fakeKey += 1;
        const key = `fakeKey${fakeKey}`;
        return (
          <div className="my-2" key={key}>
            <h3 className="text-base lg:text-lg pb-1">{soundcloudMix.title}</h3>
            <ReactPlayer height="130px" width="100%" url={soundcloudMix.url} />
          </div>
        );
      })}
    </div>
  );
};
