import { Html, Head, Main, NextScript } from 'next/document';
import DetectThemeJavaScript from '../components/DetectThemeScript';

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
                <DetectThemeJavaScript />
            </Head>
            <body className="bg-white text-bg-stone-900 dark:bg-stone-900 dark:text-white transition-colors duration-200">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
