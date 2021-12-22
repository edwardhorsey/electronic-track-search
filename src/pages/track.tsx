import { GetServerSideProps } from 'next';
import { ShowResults } from '../stories/ShowResults';

interface TrackProps {
  artist: string;
  track: string;
}

const Track = ({ artist, track }: TrackProps): JSX.Element => {
  if (
    artist
    && typeof artist === 'string'
    && track
    && typeof track === 'string'
  ) {
    return (
      <main
        className="flex flex-col items-center justify-center
        w-full flex-1 px-20 text-center"
      >
        <h1 className="text-4xl font-bold">Track results</h1>
        <ShowResults artist={artist} track={track} />
      </main>
    );
  }

  return (
    <main
      className="flex flex-col items-center justify-center
      w-full flex-1 px-20 text-center"
    >
      <h1 className="text-4xl font-bold">Track results</h1>
      <h2 className="text-2xl">Invalid query</h2>
    </main>
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
