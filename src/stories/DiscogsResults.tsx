import { DiscogsResultsReduced } from '../types/types';

export interface DiscogsResultsProps {
  results: DiscogsResultsReduced;
}

export const DiscogsResults = ({
  results,
}: DiscogsResultsProps): JSX.Element => {
  const {
    title,
    coverImage,
    label,
    country,
    year,
    style,
    format,
  } = results;

  return (
    <div>
      <h3 className="text-2xl text-center m-1">{title}</h3>
      <div className="flex">
        {coverImage && (
          /* eslint-disable @next/next/no-img-element */
          <div className="w-2/4 h-auto">
            <img
              src={coverImage}
              alt={`${title} cover`}
              className="max-w-full max-h-full"
            />
          </div>
        )}
        <div className="flex flex-col pl-5 pt-3">
          <p className="m-1">{`Label: ${label}`}</p>
          <p className="m-1">{`Country: ${country}`}</p>
          <p className="m-1">{`Year: ${year}`}</p>
          {style && <p className="m-1">{`Style: ${style.join(' ')}`}</p>}
          {format && <p className="m-1">{`Format: ${format.join(' ')}`}</p>}
        </div>
      </div>
    </div>
  );
};
