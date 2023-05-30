import { ErrorMessage } from './ErrorMessage';

export interface YoutubeResultProps {
    youtubeResult: string;
}

export const YoutubeResult = ({ youtubeResult }: YoutubeResultProps) => {
    if (!youtubeResult) return <ErrorMessage message={'Could not find YouTube Id'} />;

    return (
        <div className="w-full max-w-2xl h-64 md:h-72 lg:h-96 mx-auto">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeResult}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
};
