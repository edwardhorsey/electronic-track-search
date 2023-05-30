import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="flex flex-col items-center justify-center w-full flex-1 sm:px-10 md:px-20 text-center min-h-700">
            {children}
        </main>
    );
}
