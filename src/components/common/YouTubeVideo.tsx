interface YouTubeVideoProps {
  videoId?: string;
  title?: string;
}

function YouTubeVideo({
  videoId = "wGv79GFS4Vg",
  title = "YouTube Video",
}: YouTubeVideoProps) {
  return (
    <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YouTubeVideo;
