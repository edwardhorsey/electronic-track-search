module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.discogs.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
};
