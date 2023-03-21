import Head from 'next/head';
import { useRouter } from 'next/router';
import Title from '../components/Title';
import SearchForm from '../components/SearchForm';
import { FieldValues } from 'react-hook-form';
import MetaData from '../components/MetaData';
import Footer from '../components/Footer';

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
