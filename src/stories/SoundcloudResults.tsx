import useSWR from 'swr';
import { SearchQuery } from '../types/types';
import getTrackResults from '../utils/getTrackResults';
import { ErrorMessage } from './ErrorMessage';
import { SkeletonLoader } from './SkeletonLoader';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface SoundcloudResultsProps extends SearchQuery {}

export const SoundcloudResults = ({
  artist,
  track,
}: SoundcloudResultsProps): JSX.Element => {
  const url = `/api/mixesDbSearch/?artist=${artist}&track=${track}`;
  const { data, error } = useSWR(
    url,
    () => getTrackResults<any>(url),
  );

  console.log({ data, error });
  if (error) return <ErrorMessage message={error.message} />;

  if (!data) return <SkeletonLoader />;

  return (
    <div className="w-100% max-w-2xl h-64 md:h-72 lg:h-96 mx-auto">
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};
