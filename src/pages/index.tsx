import Head from 'next/head';
import { useRouter } from 'next/router';
import Title from '../components/Title';
import SearchForm from '../components/SearchForm';
import MetaData from '../components/MetaData';
import Footer from '../components/Footer';
import { SearchQuery } from '../types';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const DarkModeButton = dynamic(() => import('../components/DarkModeButton'), {
    ssr: false,
});

export default function Home() {
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

            <DarkModeButton />

            <Layout>
                <Title />
                <SearchForm onSubmit={onSubmit} />
            </Layout>

            <Footer />
        </div>
    );
}
