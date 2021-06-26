import Head from 'next/head'
import Image from 'next/image'
import Title from '../components/Title'
import SearchForm from 'components/SearchForm'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Electronic Track Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Title />
        <SearchForm />
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
  )
}