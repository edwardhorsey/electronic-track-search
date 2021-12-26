import {
  MixesDbLink, MixesDbTitle, SoundcloudResults,
} from '../types';

export const uniqueId = ((): ((prefix: string) => string) => {
  let counter = 0;

  return (prefix: string): string => {
    counter += 1;

    return `${prefix}${counter}`;
  };
})();

export const removeEmptyObjectsFromArray = <T>(
  array: T[],
): T[] => array.filter((result) => (
    Object.keys(result).length > 0
  ));

export const extractMixTitles = (data: MixesDbTitle[]): MixesDbLink[] => (
  data.map((title: MixesDbTitle) => title.link
    .slice(title.link.indexOf('/w/') + 16).replace(/_/g, ' '))
);

export const findLinkFromSoundcloudDomain = (
  result: SoundcloudResults,
): string|null => {
  const resultWithLink = result?.items.find((el) => el?.link.includes('https://soundcloud.com/'));

  if (resultWithLink) {
    const { link } = resultWithLink;
    return link?.match(/\//g)?.length === 4 ? link : null;
  }

  return null;
};
