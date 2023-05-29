import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import { ShowResults } from '../components/ShowResults';
import { DiscogsResponse } from '../types';
import { getDiscogsData } from '../lib/discogs';
import { getYoutubeData } from '../lib/youtube';
import { trimMultipleWhitespaces } from '../lib/misc';

import dynamic from 'next/dynamic';

const DarkModeButton = dynamic(() => import('../components/DarkModeButton'), {
    ssr: false,
});

interface TrackProps {
    artist: string;
    track: string;
    discogsResult?: DiscogsResponse;
    youtubeResult: string;
}

const Track = ({ track, discogsResult, youtubeResult }: TrackProps) => {
    const pageTitle = trimMultipleWhitespaces(`${track} - Electronic Track Search results`);

    return (
        <div className="flex flex-col items-center justify-center">
            <Head>
                <title>{pageTitle}</title>
                <MetaData title={pageTitle} />
            </Head>

            <DarkModeButton />

            <ShowResults track={track} discogsResult={discogsResult} youtubeResult={youtubeResult} />

            <Footer />
        </div>
    );
};

export default Track;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const track = `${context.query.track ?? ''}`;
    const [discogsResult, youtubeResult] = await Promise.all([getDiscogsData(track), getYoutubeData(track)]);

    return {
        props: { discogsResult, youtubeResult, track },
    };
};
