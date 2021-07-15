import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next';

const getTrackResults = async (searchString: string) => (
  fetch('/api/trackSearch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchString }),
  })
    .then((res) => res.json())
);

const ShowData = ({ searchTerm }: { searchTerm: string }): JSX.Element => {
  const { data } = useSWR(searchTerm, getTrackResults);

  if (!data) {
    return (
      <div
        className="border border-blue-300 shadow rounded-md p-4
        max-w-sm w-full mx-auto"
      >
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-400 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-blue-400 rounded" />
              <div className="h-4 bg-blue-400 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { discogsResults } = data;

  return (
    <>
      <div>
        <h3>{discogsResults.title}</h3>
        <div>
          {/* <Image
            src={discogsResults.cover_image}
            alt="release album cover"
          /> */}
          <div>
            <p>
              Label:
              {discogsResults.label}
            </p>
            <p>
              Country:
              {discogsResults.country}
            </p>
            <p>
              Year:
              {discogsResults.year}
            </p>
            <p>
              Style:
              {discogsResults.style}
            </p>
            <p>
              Format:
              {discogsResults.format.join(' ')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Track = (): JSX.Element => {
  const router = useRouter();
  const { artist, track } = router.query;
  return (
    <main>
      <h1>Track page</h1>
      <p>
        Artist:
        {artist}
      </p>
      <p>
        Track:
        {track}
      </p>
      <ShowData searchTerm={`${artist} ${track}`} />
    </main>
  );
};

export default Track;
