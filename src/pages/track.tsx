import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import { ShowResults } from '../components/ShowResults';
import { DiscogsResponse } from '../types';
import { getDiscogsData } from '../utils/discogs';
import { getYoutubeData } from '../utils/youtube';

interface TrackProps {
    artist: string;
    track: string;
    discogsResult?: DiscogsResponse;
    youtubeResult: string;
}

const Track = ({ artist, track, discogsResult, youtubeResult }: TrackProps): JSX.Element => {
    return (
        <>
            <Head>
                <MetaData title={`${artist} ${track} - Electronic Track Search results`} />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 sm:px-10 md:px-20 text-center md:h-screen min-h-700">
                <ShowResults
                    artist={artist}
                    track={track}
                    discogsResult={discogsResult}
                    youtubeResult={youtubeResult}
                />
            </main>

            <Footer />
        </>
    );
};

export default Track;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const { artist, track } = query;
    const searchTerm = `${artist} ${track}`;
    const [discogsResult, youtubeResult] = await Promise.all([getDiscogsData(searchTerm), getYoutubeData(searchTerm)]);

    return {
        props: { discogsResult, youtubeResult, artist, track },
    };
};
