import { useRouter } from 'next/router';
import ShowResults from '../stories/ShowResults';

const Track = (): JSX.Element => {
  const router = useRouter();
  const { artist, track } = router.query;

  if (artist
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
