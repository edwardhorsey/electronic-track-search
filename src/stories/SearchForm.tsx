import { useForm } from 'react-hook-form';
import { InputText } from './InputText';
import { Button } from './Button';
import uniqueId from '../utils/uniqueId';
import { SearchQuery } from '../types/types';

const formIds = {
  artist: uniqueId('artist'),
  track: uniqueId('track'),
};

interface SearchFormProps {
  onSubmit: (values: SearchQuery) => Promise<boolean>;
}

const SearchForm = ({ onSubmit }: SearchFormProps): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form my-6 text-left"
      aria-label="form"
    >
      <div className="flex flex-col sm:flex-row justify-center mt-6">
        <InputText
          id={formIds.artist}
          label="Artist"
          name="artist"
          placeholder="Seleccion Natural"
          errors={errors}
          required
          register={register}
        />
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
      <div className="flex justify-center mt-1">
        <Button
          text="Search"
          submit
        />
      </div>
    </form>
  );
};

export default SearchForm;
