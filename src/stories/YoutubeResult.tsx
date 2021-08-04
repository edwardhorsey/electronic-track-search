export interface YoutubeResultProps {
  embedId: string;
}

export const YoutubeResult = ({ embedId }: YoutubeResultProps): JSX.Element => (
  <div className="w-100% h-64">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
