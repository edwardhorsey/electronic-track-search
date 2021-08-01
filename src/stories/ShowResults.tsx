import useSWR from 'swr';
import { SearchQuery } from '../types/types';
import getTrackResults from '../utils/getTrackResults';

const ShowResults = ({ artist, track }: SearchQuery): JSX.Element => {
  const url = `/api/trackSearch/?artist=${artist}&track=${track}`;
  const { data, error } = useSWR(url, getTrackResults);

  if (error) {
    return (
      <div
        className="border border-blue-300 shadow rounded-md p-4
        max-w-sm w-full mx-auto"
      >
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="border border-blue-300 shadow rounded-md p-4
        max-w-sm w-full mx-auto"
      >
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-400 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-blue-400 rounded" />
              <div className="h-4 bg-blue-400 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { discogsResults } = data;

  return (
    <>
      <div>
        <h3>{discogsResults.title}</h3>
        <div className="flex">
          {discogsResults.cover_image && (
            /* eslint-disable @next/next/no-img-element */
            <div className="max-w-sm">
              <img
                src={discogsResults.cover_image}
                alt={`${artist} - ${track} cover`}
                className="max-w-full max-h-full"
              />
            </div>
          )}
          <div>
            <p>{`Label: ${discogsResults.label}`}</p>
            <p>{`Country: ${discogsResults.country}`}</p>
            <p>{`Year: ${discogsResults.year}`}</p>
            <p>{`Style: ${discogsResults.style}`}</p>
            {discogsResults.format && (
              <p>{`Format: ${discogsResults.format.join(' ')}`}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowResults;
