import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { SearchQuery } from '../types/types';
import { InputText } from '../stories/InputText';
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
            <InputText
              id={formIds.artist}
              placeholder="Seleccion Natural"
              {...register('artist', { required: true })}
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
            <InputText
              id={formIds.track}
              placeholder="Left Behind"
              {...register('track', { required: true })}
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
