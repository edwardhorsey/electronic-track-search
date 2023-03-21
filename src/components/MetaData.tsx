import { description, favicon, ogImage, siteUrl, title as defaultTitle, locale } from '../config';
import { trimMultipleWhitespaces } from '../utils/misc';

interface MetaDataProps {
    title?: string;
}

const MetaData = ({ title = undefined }: MetaDataProps): JSX.Element => {
    const metaTitle = trimMultipleWhitespaces(title ?? defaultTitle);

    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000" />
            <link rel="icon" href={favicon} />
            <link rel="canonical" href={siteUrl} />
            <meta name="title" content={metaTitle} />
            <meta name="description" content={description} />
            <meta property="og:locale" content={locale} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:site_name" content={metaTitle} />
            <meta property="og:image" content={ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:image" content={ogImage} />
            <link rel="apple-touch-icon" href={ogImage} />
        </>
    );
};

export default MetaData;
