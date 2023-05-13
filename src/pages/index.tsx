import Head from 'next/head';
import { useRouter } from 'next/router';
import Title from '../components/Title';
import SearchForm from '../components/SearchForm';
import MetaData from '../components/MetaData';
import Footer from '../components/Footer';
import { SearchQuery } from '../types';

export default function Home(): JSX.Element {
    const router = useRouter();
    const onSubmit = (values: SearchQuery): Promise<boolean> => {
        const { track } = values;

        return router.push({ pathname: '/track', query: { track } });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>Electronic Track Search</title>
                <MetaData />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-5 sm:px-15 md:px-20">
                <Title />
                <SearchForm onSubmit={onSubmit} />
            </main>

            <Footer />
        </div>
    );
}
