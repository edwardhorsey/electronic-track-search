import { GetServerSideProps } from 'next';
import { ShowResults } from '../stories/ShowResults';

interface TrackPageContainerProps {
    children: JSX.Element;
}

const TrackPageContainer = ({ children }: TrackPageContainerProps): JSX.Element => (
    <main
        className="flex flex-col items-center justify-center
      w-full flex-1 sm:px-10 md:px-20 text-center md:h-screen min-h-700"
    >
        <h1 className="text-4xl font-bold py-3">Track results</h1>
        {children}
    </main>
);

interface TrackProps {
    artist: string;
    track: string;
}

const Track = ({ artist, track }: TrackProps): JSX.Element => {
    if (artist && typeof artist === 'string' && track && typeof track === 'string') {
        return (
            <TrackPageContainer>
                <ShowResults artist={artist} track={track} />
            </TrackPageContainer>
        );
    }

    return (
        <TrackPageContainer>
            <h2 className="text-2xl">Invalid query</h2>
        </TrackPageContainer>
    );
};

export default Track;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const { artist, track } = query;

    return {
        props: { artist, track },
    };
};
