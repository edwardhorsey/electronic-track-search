import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import { ShowResults } from '../components/ShowResults';
import { DiscogsResponse } from '../types';
import { getDiscogsData } from '../utils/discogs';
import { getYoutubeData } from '../utils/youtube';
import { trimMultipleWhitespaces } from '../utils/misc';

interface TrackProps {
    artist: string;
    track: string;
    discogsResult?: DiscogsResponse;
    youtubeResult: string;
}

const Track = ({ track, discogsResult, youtubeResult }: TrackProps): JSX.Element => {
    const pageTitle = trimMultipleWhitespaces(`${track} - Electronic Track Search results`);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <MetaData title={pageTitle} />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 sm:px-10 md:px-20 text-center md:h-screen min-h-700">
                <ShowResults track={track} discogsResult={discogsResult} youtubeResult={youtubeResult} />
            </main>

            <Footer />
        </>
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
