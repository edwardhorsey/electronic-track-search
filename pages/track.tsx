import { useRouter } from 'next/router';
import useSWR from 'swr';

interface FormItems {
  artist: string;
  track: string;
}

const getTrackResults = async ({ artist, track }: FormItems) => (
  fetch('/api/trackSearch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      searchString: `${artist} ${track}`,
    }),
  })
    .then((res) => res.json())
);

interface ShowDataProps {
  searchTerm: string;
}

const ShowData = ({ searchTerm }: ShowDataProps): JSX.Element => {
  const { data } = useSWR(searchTerm, getTrackResults);

  return (
    <p>
      {JSON.stringify(data)}
    </p>
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
