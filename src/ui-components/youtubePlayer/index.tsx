const getYoutubeVideoId = (url: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const YouTubePlayer = ({ url, width = "560", height = "315" }: any) => {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-player">
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video Player"
      />
    </div>
  );
};

export default YouTubePlayer;
