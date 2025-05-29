import { useEffect } from "react";
import YouTube from "react-youtube";
import { useGlobalPlayer } from "../context/PlayerContext";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  onNextVideo?: () => void;
  onPreviousVideo?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

function Player({
  videoId,
  onNextVideo,

  hasNext,
}: VideoPlayerProps) {
  const { setPlayer, setIsPlaying, setCurrentTime, setDuration } =
    useGlobalPlayer();

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 0,
      rel: 0,
    },
  };

  const onReady = (event: any) => {
    const playerInstance = event.target;
    setPlayer(playerInstance);

    const videoDuration = playerInstance.getDuration();
    setDuration(videoDuration);
  };

  const onStateChange = (event: any) => {
    const playerState = event.data;

    if (playerState === 1) {
      setIsPlaying(true);
    } else if (playerState === 2) {
      setIsPlaying(false);
    } else if (playerState === 0) {
      setIsPlaying(false);

      if (hasNext && onNextVideo) {
        onNextVideo();
      }
    }
  };

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [videoId, setCurrentTime, setDuration]);

  return (
    <div className="relative bg-gray-900 gap-3 flex flex-col justify-evenly">
      <div className="relative w-full h-96 overflow-hidden rounded-lg">
        <YouTube
          key={videoId}
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        />
      </div>

      <div className="px-4 py-2 bg-gray-800 rounded-b-xl">
        <h3 className="text-white text-lg font-semibold line-clamp-2">
          {videoId && `Playing: ${videoId}`}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Use the bottom player for full control
        </p>
      </div>
    </div>
  );
}

export default Player;
