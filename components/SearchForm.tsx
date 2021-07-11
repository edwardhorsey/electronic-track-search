import React from 'react';
import { useForm } from 'react-hook-form';
import uniqueId from '../utils/uniqueId';

interface FormItems {
  artist: string;
  track: string;
}

const formIds = {
  artist: uniqueId('artist'),
  track: uniqueId('track'),
};

const getTrackResults = async ({ artist, track }: FormItems) => {
  const results = await fetch('/api/trackSearch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      searchString: `${artist} ${track}`,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err);

  return results;
};

const SearchForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form
      onSubmit={handleSubmit(getTrackResults)}
      className="form my-6 text-left text-lg"
    >
      <div className="flex justify-center mt-6">
        <div className="flex flex-col mb-2">
          <label htmlFor={formIds.artist} className="ml-3">
            Artist
            <input
              type="text"
              className="border border-gray-200 p-2 mt-1 mb-1
              rounded-lg appearance-none focus:outline-none
              focus:border-gray-500"
              id={formIds.artist}
              {...register('artist', { required: true })}
              placeholder="Seleccion Natural"
            />
            {errors.artist?.type === 'required' && (
              <p className="mb-3 text-normal text-red-500">
                Artist is required
              </p>
            )}
          </label>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor={formIds.track} className="ml-3">
            Track
            <input
              type="text"
              className="border border-gray-200 p-2 mt-1 mb-1
              rounded-lg appearance-none focus:outline-none
              focus:border-gray-500"
              id={formIds.track}
              {...register('track', { required: true })}
              placeholder="Left Behind"
            />
            {errors.track?.type === 'required' && (
              <p className="mb-3 text-normal text-red-500">
                Track is required
              </p>
            )}
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-300 text-xl font-bold pt-2 pb-2 pl-4 pr-4
          rounded-lg"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
