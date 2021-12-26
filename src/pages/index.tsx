import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Title from '../stories/Title';
import { SearchQuery } from '../types';
import SearchForm from '../stories/SearchForm';

export default function Home(): JSX.Element {
  const router = useRouter();
  const onSubmit = (values: SearchQuery): Promise<boolean> => (
    router.push({
      pathname: '/track',
      query: { ...values },
    })
  );

  return (
    <div
      className="flex flex-col items-center justify-center
      min-h-screen"
    >
      <Head>
        <title>Electronic Track Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="flex flex-col items-center justify-center
        w-full flex-1 px-5 sm:px-15 md:px-20"
      >
        <Title />
        <SearchForm onSubmit={onSubmit} />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/edwardhorsey/ets"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Ed Horsey
          <span>
            <Image src="/vercel.svg" alt="Github Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
