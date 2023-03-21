import { MixesDbLink, MixesDbTitle, SoundcloudResult } from '../types';

export const uniqueId = ((): ((prefix: string) => string) => {
    let counter = 0;

    return (prefix: string): string => {
        counter += 1;

        return `${prefix}${counter}`;
    };
})();

export const removeEmptyObjectsFromArray = <T>(array: T[]): T[] => {
    return array.filter((result) => result && Object.keys(result).length > 0);
};

export const extractMixTitles = (data: MixesDbTitle[]): MixesDbLink[] => {
    return data.map((title: MixesDbTitle) => title.link.slice(title.link.indexOf('/w/') + 16).replace(/_/g, ' '));
};

export const findLinkFromSoundcloudDomain = (items: SoundcloudResult[]): string | null => {
    const resultWithLink = items.find((el) => el?.link.includes('https://soundcloud.com/'));

    if (resultWithLink) {
        const { link } = resultWithLink;
        return link?.match(/\//g)?.length === 4 ? link : null;
    }

    return null;
};

export const trimMultipleWhitespaces = (string: string) => {
    return string.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
};
