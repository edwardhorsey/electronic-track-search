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
      <h3>{title}</h3>
      <div className="flex">
        {coverImage && (
          /* eslint-disable @next/next/no-img-element */
          <div className="max-w-sm">
            <img
              src={coverImage}
              alt={`${title} cover`}
              className="max-w-full max-h-full"
            />
          </div>
        )}
        <div>
          <p>{`Label: ${label}`}</p>
          <p>{`Country: ${country}`}</p>
          <p>{`Year: ${year}`}</p>
          {style && <p>{`Style: ${style.join(' ')}`}</p>}
          {format && <p>{`Format: ${format.join(' ')}`}</p>}
        </div>
      </div>
    </div>
  );
};
