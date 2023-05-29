const Title = () => (
    <article className="flex flex-col text-center">
        <h1 className="text-2xl xs:text-4xl md:text-5xl lg:text-6xl font-bold">Electronic Track Search</h1>
        <h2 className="text-lg xs:text-2xl md:text-3xl lg:text-4xl font-italic">a track and DJ mix search engine</h2>
        <div className="flex justify-center mt-3 text-left">
            <ol className="list-decimal text-base xs:text-lg md:text-2xl">
                <li>Search for a track</li>
                <li>Receive release information</li>
                <li>Receive mixes featuring the track</li>
            </ol>
        </div>
    </article>
);

export default Title;
