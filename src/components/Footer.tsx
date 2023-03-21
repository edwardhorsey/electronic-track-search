import Image from 'next/image';

const Footer = () => (
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
);

export default Footer;
