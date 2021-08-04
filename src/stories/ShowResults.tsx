import useSWR from 'swr';
import { SearchQuery } from '../types/types';
import getTrackResults from '../utils/getTrackResults';
import filterDiscogsResults from '../utils/filterDiscogsResults';
import SkeletonLoader from './SkeletonLoader';
import { ErrorMessage } from './ErrorMessage';
import { DiscogsResults } from './DiscogsResults';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ShowResultsProps extends SearchQuery {}

const ShowResults = ({ artist, track }: ShowResultsProps): JSX.Element => {
  const url = `/api/trackSearch/?artist=${artist}&track=${track}`;
  const { data, error } = useSWR(url, getTrackResults);

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return <SkeletonLoader />;

  const discogsResults = filterDiscogsResults(data.discogsResults);
  return <DiscogsResults results={discogsResults} />;
};

export default ShowResults;
