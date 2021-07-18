import { GetTrackResultsData } from '../types/types';

const getTrackResults = async (url: string): Promise<GetTrackResultsData> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

export default getTrackResults;
