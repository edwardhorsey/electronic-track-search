import { useRouter } from 'next/router';
import ShowResults from '../components/ShowResults';

const Track = (): JSX.Element => {
  const router = useRouter();
  const { artist, track } = router.query;

  if (artist
    && typeof artist === 'string'
    && track
    && typeof track === 'string'
  ) {
    return (
      <main className="flex flex-col items-center justify-center
      w-full flex-1 px-20 text-center"
      >
        <h1 className="text-5xl font-bold">Track page</h1>
        <div className="flex flex-col items-center">
          <p className="text-2xl">{`Artist: ${artist}`}</p>
          <p className="text-2xl">{`Track: ${track}`}</p>
        </div>
        <ShowResults artist={artist} track={track} />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center
    w-full flex-1 px-20 text-center"
    >
      <h1 className="text-5xl font-bold">Track page</h1>
      <h2 className="text-2xl">Invalid query</h2>
    </main>
  );
};

export default Track;
