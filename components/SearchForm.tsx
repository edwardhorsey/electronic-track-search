import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { SearchQuery } from '../types/types';
import { InputText } from '../stories/InputText';
import { Button } from '../stories/Button';
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
          <InputText
            id={formIds.artist}
            label="Artist"
            name="artist"
            placeholder="Seleccion Natural"
            errors={errors}
            required
            register={register}
          />
        </div>
        <div className="flex flex-col mb-2">
          <InputText
            id={formIds.track}
            label="Track"
            name="track"
            placeholder="Left Behind"
            errors={errors}
            required
            register={register}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="Search"
          submit
        />
      </div>
    </form>
  );
};

export default SearchForm;
