import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Title from '../components/Title';
import SearchForm from '../components/SearchForm';
import { FieldValues } from 'react-hook-form';
import MetaData from '../components/MetaData';

export default function Home(): JSX.Element {
    const router = useRouter();
    const onSubmit = (values: FieldValues): Promise<boolean> => {
        return router.push({
            pathname: '/track',
            query: { ...values },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>Electronic Track Search</title>
                <link rel="icon" href="/favicon.ico" />
                <MetaData />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-5 sm:px-15 md:px-20">
                <Title />
                <SearchForm onSubmit={onSubmit} />
            </main>

            <footer className="flex items-center justify-center w-full h-10 md:h-12">
                <a
                    className="flex items-center justify-center text-slate-700 text-sm md:text-base"
                    href="https://github.com/edwardhorsey/ets"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made by Ed Horsey
                    <span className="ml-2 mt-1">
                        <Image className="rounded-full" src="/58594573.jpeg" alt="Ned" width={20} height={20} />
                    </span>
                </a>
            </footer>
        </div>
    );
}
