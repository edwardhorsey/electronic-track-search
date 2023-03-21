import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel="preload"
                    as="font"
                    href="/fonts/Montserrat-Regular.woff2"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
