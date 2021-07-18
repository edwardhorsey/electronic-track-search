import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { SearchQuery } from '../types/types';
import uniqueId from '../utils/uniqueId';

const formIds = {
  artist: uniqueId('artist'),
  track: uniqueId('track'),
};

const SearchForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = (values: SearchQuery) => (
    router.push({
      pathname: '/track',
      query: { ...values },
    })
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form my-6 text-left text-lg"
    >
      <div className="flex justify-center mt-6">
        <div className="flex flex-col mb-2">
          <label htmlFor={formIds.artist} className="flex flex-col ml-3">
            Artist
            <input
              type="text"
              className="border border-gray-200 p-2 mt-1 mb-1
              rounded-lg appearance-none focus:outline-none
              focus:border-gray-500"
              id={formIds.artist}
              /* eslint-disable react/jsx-props-no-spreading */
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
          <label htmlFor={formIds.track} className="flex flex-col ml-3">
            Track
            <input
              type="text"
              className="border border-gray-200 p-2 mt-1 mb-1
              rounded-lg appearance-none focus:outline-none
              focus:border-gray-500"
              id={formIds.track}
              /* eslint-disable react/jsx-props-no-spreading */
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
