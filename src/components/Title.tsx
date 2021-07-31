const Title = (): JSX.Element => (
  <>
    <h1 className="text-6xl font-bold">Electronic Track Search</h1>
    <h2 className="text-4xl font-italic">a track and DJ mix search engine</h2>
    <div className="flex justify-center mt-6 text-left">
      <ol className="list-decimal text-2xl">
        <li>Search for a track</li>
        <li>Receive release information</li>
        <li>Receive mixes featuring the track</li>
      </ol>
    </div>
  </>
);

export default Title;
