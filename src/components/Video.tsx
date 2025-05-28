import { ImPrevious } from "react-icons/im";
import { BiSkipNextCircle } from "react-icons/bi";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useState } from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  onNextVideo?: () => void;
  onPreviousVideo?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

function YouTubeVideo({
  videoId,
  onNextVideo,
  onPreviousVideo,
  hasNext,
  hasPrevious,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  const togglePlayPause = () => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative bg-gray-900 gap-3">
      <div className="relative w-full h-96 overflow-hidden rounded-lg">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          className="w-full h-full"
        />
      </div>
      <div className="p-4 bg-gray-900 bottom-16 right-4 flex gap-2 justify-center">

        <button
          onClick={onPreviousVideo}
          disabled={!hasPrevious}
          className="px-4 py-2 bg-zinc-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
        >
          <ImPrevious />
        </button>
        <button
          onClick={togglePlayPause}
          className="px-4 py-2 bg-zinc-500 text-white rounded-md hover:bg-zinc-700 transition-colors"
        >
          {isPlaying ? <BsPauseFill size={20} /> : <BsPlayFill size={20} />}
        </button>
        <button
          onClick={onNextVideo}
          disabled={!hasNext}
          className="px-4 py-2 bg-zinc-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
        >
          <BiSkipNextCircle />
        </button>
      </div>
    </div>
  );
}

export default YouTubeVideo;
