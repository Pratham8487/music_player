import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

interface VideoData {
  id: string;
  title: string;
  thumbnail?: string;
  channelTitle?: string;
  duration?: string;
}

interface GlobalPlayerState {
  currentVideo: VideoData | null;
  playlist: VideoData[];
  currentIndex: number;

  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isDragging: boolean;
  dragTime: number;

  isMinimized: boolean;
  showPlayer: boolean;

  player: any;
}

interface GlobalPlayerContextType extends GlobalPlayerState {
  playVideo: (video: VideoData, playlist?: VideoData[], index?: number) => void;
  togglePlayPause: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  seekTo: (time: number) => void;

  setPlayer: (player: any) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsDragging: (dragging: boolean) => void;
  setDragTime: (time: number) => void;

  toggleMinimize: () => void;
  hidePlayer: () => void;

  hasNext: boolean;
  hasPrevious: boolean;
}

const GlobalPlayerContext = createContext<GlobalPlayerContextType | undefined>(
  undefined
);

export const GlobalPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GlobalPlayerState>({
    currentVideo: null,
    playlist: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isDragging: false,
    dragTime: 0,
    isMinimized: false,
    showPlayer: false,
    player: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (state.player && !state.isDragging) {
        const current = state.player.getCurrentTime();
        setState((prev) => ({ ...prev, currentTime: current }));
      }
    }, 1000);
  }, [state.player, state.isDragging]);

  const stopProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const playVideo = useCallback(
    (video: VideoData, playlist: VideoData[] = [], index: number = 0) => {
      setState((prev) => ({
        ...prev,
        currentVideo: video,
        playlist: playlist,
        currentIndex: index,
        showPlayer: true,
        currentTime: 0,
        duration: 0,
      }));
      stopProgressTracking();
    },
    [stopProgressTracking]
  );

  const togglePlayPause = useCallback(() => {
    if (!state.player) return;

    if (state.isPlaying) {
      state.player.pauseVideo();
    } else {
      state.player.playVideo();
    }
  }, [state.player, state.isPlaying]);

  const nextVideo = useCallback(() => {
    if (
      state.playlist.length > 0 &&
      state.currentIndex < state.playlist.length - 1
    ) {
      const nextIndex = state.currentIndex + 1;
      const nextVideo = state.playlist[nextIndex];

      setState((prev) => ({
        ...prev,
        currentVideo: nextVideo,
        currentIndex: nextIndex,
        currentTime: 0,
        duration: 0,
      }));
      stopProgressTracking();
    }
  }, [state.playlist, state.currentIndex, stopProgressTracking]);

  const previousVideo = useCallback(() => {
    if (state.playlist.length > 0 && state.currentIndex > 0) {
      const prevIndex = state.currentIndex - 1;
      const prevVideo = state.playlist[prevIndex];

      setState((prev) => ({
        ...prev,
        currentVideo: prevVideo,
        currentIndex: prevIndex,
        currentTime: 0,
        duration: 0,
      }));
      stopProgressTracking();
    }
  }, [state.playlist, state.currentIndex, stopProgressTracking]);

  const seekTo = useCallback(
    (time: number) => {
      if (state.player) {
        state.player.seekTo(time, true);
        setState((prev) => ({ ...prev, currentTime: time }));
      }
    },
    [state.player]
  );

  const setPlayer = useCallback((player: any) => {
    setState((prev) => ({ ...prev, player }));
  }, []);

  const setIsPlaying = useCallback(
    (playing: boolean) => {
      setState((prev) => ({ ...prev, isPlaying: playing }));
      if (playing) {
        startProgressTracking();
      } else {
        stopProgressTracking();
      }
    },
    [startProgressTracking, stopProgressTracking]
  );

  const setCurrentTime = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setState((prev) => ({ ...prev, duration }));
  }, []);

  const setIsDragging = useCallback((dragging: boolean) => {
    setState((prev) => ({ ...prev, isDragging: dragging }));
  }, []);

  const setDragTime = useCallback((time: number) => {
    setState((prev) => ({ ...prev, dragTime: time }));
  }, []);

  const toggleMinimize = useCallback(() => {
    setState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const hidePlayer = useCallback(() => {
    setState((prev) => ({ ...prev, showPlayer: false }));
    stopProgressTracking();
  }, [stopProgressTracking]);

  const hasNext =
    state.playlist.length > 0 && state.currentIndex < state.playlist.length - 1;
  const hasPrevious = state.currentIndex > 0;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const contextValue: GlobalPlayerContextType = {
    ...state,
    playVideo,
    togglePlayPause,
    nextVideo,
    previousVideo,
    seekTo,
    setPlayer,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setIsDragging,
    setDragTime,
    toggleMinimize,
    hidePlayer,
    hasNext,
    hasPrevious,
  };

  return (
    <GlobalPlayerContext.Provider value={contextValue}>
      {children}
    </GlobalPlayerContext.Provider>
  );
};

export const useGlobalPlayer = () => {
  const context = useContext(GlobalPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalPlayer must be used within a GlobalPlayerProvider"
    );
  }
  return context;
};
