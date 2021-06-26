import React, { useState } from 'react'

interface SearchQuery {
  artist: string;
  track: string;
};

const SearchForm = () => {
  const [ searchQuery, setSearchQuery ] = useState<SearchQuery>({
    artist: '',
    track: '',
  });

  return (
    <form className="form my-6 text-left text-lg">
      <div className="flex justify-center mt-6">
        <div className="flex flex-col mb-2">
          <label
            htmlFor="artist"
            className="ml-3">Artist</label>
          <input 
            type="text"
            className="border border-gray-200 p-2 mt-1 mb-1 ml-2 mr-2
            rounded-lg appearance-none focus:outline-none focus:border-gray-500"
            name="artist"
            id="artist"
            value={searchQuery.artist}
            onChange={(e) => setSearchQuery({...searchQuery, artist: e.target.value})}
            placeholder="Seleccion Natural"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label
            htmlFor="track"
            className="ml-3">Track</label>
          <input
            type="text"
            className="border border-gray-200 p-2 mt-1 mb-1 ml-2 mr-2
            rounded-lg appearance-none focus:outline-none focus:border-gray-500"
            name="track"
            id="track"
            value={searchQuery.track}
            onChange={(e) => setSearchQuery({...searchQuery, track: e.target.value})}
            placeholder="Left Behind"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-300 text-xl font-bold pt-2 pb-2 pl-4 pr-4
          rounded-lg"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            const body = JSON.stringify({
              searchString: searchQuery.artist + ' ' + searchQuery.track
            });

            const results = await fetch('/api/trackSearch', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body,
            })
              .then(res => res.json())
              .catch(err => err);

            console.log(results);
            return results;
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;