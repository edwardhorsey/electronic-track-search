import { DiscogsResponse, DiscogsResultsReduced } from '../types';

const filterDiscogsResults = (
  results: DiscogsResponse,
): DiscogsResultsReduced => {
  const {
    title,
    cover_image: coverImage,
    label,
    country,
    year,
    style,
    format,
  } = results;

  return {
    title,
    coverImage,
    label,
    country,
    year,
    style,
    format,
  };
};

export default filterDiscogsResults;
