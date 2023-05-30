import { DarkModeProvider } from '../hooks/useDarkMode';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DarkModeProvider>
            <Component {...pageProps} />
        </DarkModeProvider>
    );
}
