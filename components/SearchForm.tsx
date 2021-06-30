import React, { useState } from 'react';
import uniqueId from '../utils/uniqueId';

interface FormItems {
  artist: string;
  track: string;
}

const getTrackResults = async (artist: string, track: string) => {
  const body = JSON.stringify({
    searchString: `${artist} ${track}`,
  });

  const results = await fetch('/api/trackSearch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((res) => res.json())
    .catch((err) => err);

  return results;
};

const SearchForm = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<FormItems>({
    artist: '',
    track: '',
  });

  const [formIds] = useState<FormItems>({
    artist: uniqueId('artist'),
    track: uniqueId('track'),
  });

  const bit = uniqueId('testing this');
  console.log(bit);

  return (
    <form className="form my-6 text-left text-lg">
      <div className="flex justify-center mt-6">
        <div className="flex flex-col mb-2">
          <label htmlFor={formIds.artist} className="ml-3">
            Artist
            <input
              type="text"
              className="border border-gray-200 p-2 mt-1 mb-1 ml-2 mr-2
              rounded-lg appearance-none focus:outline-none
              focus:border-gray-500"
              name="artist"
              id={formIds.artist}
              value={searchQuery.artist}
              onChange={(e) => setSearchQuery({
                ...searchQuery,
                artist: e.target.value,
              })}
              placeholder="Seleccion Natural"
            />
          </label>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor={formIds.track} className="ml-3">
            Track
            <input
              type="text"
              className="border border-gray-200 p-2 mt-1 mb-1 ml-2 mr-2
              rounded-lg appearance-none focus:outline-none
              focus:border-gray-500"
              name="track"
              id={formIds.track}
              value={searchQuery.track}
              onChange={(e) => setSearchQuery({
                ...searchQuery,
                track: e.target.value,
              })}
              placeholder="Left Behind"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-300 text-xl font-bold pt-2 pb-2 pl-4 pr-4
          rounded-lg"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            getTrackResults(searchQuery.artist, searchQuery.track);
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
