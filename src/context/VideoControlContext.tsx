import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";

interface VideoControlContextProps {
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  registerPlayer: (player: any) => void;
  setHasNext: (value: boolean) => void;
  setHasPrevious: (value: boolean) => void;
}

const VideoControlContext = createContext<VideoControlContextProps | null>(
  null
);

export const useVideoControl = () => useContext(VideoControlContext)!;

export const VideoControlProvider = ({ children }: { children: ReactNode }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const play = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  const next = () => {

  };

  const previous = () => {

  };

  const registerPlayer = (player: any) => {
    playerRef.current = player;
  };

  return (
    <VideoControlContext.Provider
      value={{
        isPlaying,
        play,
        pause,
        next,
        previous,
        registerPlayer,
        hasNext,
        hasPrevious,
        setHasNext,
        setHasPrevious,
      }}
    >
      {children}
    </VideoControlContext.Provider>
  );
};
