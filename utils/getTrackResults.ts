import { GetTrackResultsData, SearchQuery } from '../types/types';

const getTrackResults = async (
  searchQuery: SearchQuery,
): Promise<GetTrackResultsData> => (
  fetch('/api/trackSearch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchQuery }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err))
);

export default getTrackResults;
