import React, { useRef } from "react";
import { ImPrevious } from "react-icons/im";
import { BiSkipNextCircle } from "react-icons/bi";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { MdQueueMusic } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import YouTube from "react-youtube";
import { useGlobalPlayer } from "../context/PlayerContext";
import { useQueue } from "../context/QueueContext";
import Tooltip from "./common/TooltipWrapper";

const BottomPlayer: React.FC = () => {
  const {
    currentVideo,
    isPlaying,
    currentTime,
    duration,
    isDragging,
    dragTime,

    showPlayer,
    player,
    togglePlayPause,
    nextVideo,
    previousVideo,
    seekTo,
    setPlayer,
    setIsPlaying,

    setDuration,
    setIsDragging,
    setDragTime,
    toggleMinimize,

    hasNext,
    hasPrevious,
  } = useGlobalPlayer();

  const { queue, addToQueue, removeFromQueue } = useQueue();
  const progressBarRef = useRef<HTMLDivElement>(null);

  if (!showPlayer || !currentVideo) {
    return null;
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
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
    } else if (playerState === 2 || playerState === 0) {
      setIsPlaying(false);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    seekTo(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressBarClick(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, moveX / rect.width));
    const newTime = percentage * duration;

    setDragTime(newTime);
  };

  const handleMouseUp = () => {
    if (isDragging && player) {
      seekTo(dragTime);
    }
    setIsDragging(false);
    setDragTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage =
    duration > 0 ? ((isDragging ? dragTime : currentTime) / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-2xl z-50">
      <div
        ref={progressBarRef}
        className="h-1 bg-gray-700 cursor-pointer relative hover:h-2 transition-all duration-200"
        onClick={handleProgressBarClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="h-full bg-red-500 transition-all duration-150"
          style={{ width: `${progressPercentage}%` }}
        />
        <div
          className="absolute top-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity"
          style={{ left: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="relative">
            <div className="w-0 h-0 overflow-hidden opacity-0">
              <YouTube
                videoId={currentVideo.id}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
              />
            </div>

            <img
              src={
                currentVideo.thumbnail ||
                `https://img.youtube.com/vi/${currentVideo.id}/mqdefault.jpg`
              }
              alt={currentVideo.title}
              className="w-14 h-10 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleMinimize}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-white text-sm font-medium truncate">
              {currentVideo.title}
            </h4>
            <p className="text-gray-400 text-xs truncate">
              {currentVideo.channelTitle || "Unknown Artist"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Tooltip
            children={
              <button
                disabled={!hasPrevious}
                className="text-white disabled:text-gray-600 hover:text-red-400 transition-colors disabled:cursor-not-allowed"
                onClick={previousVideo}
              >
                <ImPrevious size={16} />
              </button>
            }
            position="top"
            tooltipText="Previous"
          />

          <Tooltip
            children={
              <button
                className="text-white hover:text-red-400 transition-colors  bg-opacity-10 rounded-full p-2 hover:bg-opacity-20"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <BsPauseFill size={20} />
                ) : (
                  <BsPlayFill size={20} />
                )}
              </button>
            }
            tooltipText={isPlaying ? "Pause" : "Play"}
            position="top"
          />

          <Tooltip
            children={
              <button
                disabled={!hasNext}
                onClick={nextVideo}
                className="text-white disabled:text-gray-600 hover:text-red-400 transition-colors disabled:cursor-not-allowed"
              >
                <BiSkipNextCircle size={16} />
              </button>
            }
            position="top"
            tooltipText="Next"
          />
        </div>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <span className="text-gray-400 text-xs whitespace-nowrap">
            {formatTime(isDragging ? dragTime : currentTime)} /{" "}
            {formatTime(duration)}
          </span>

          <div className="flex items-center space-x-2">
            <Tooltip
              children={
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (queue.includes(currentVideo.id)) {
                      removeFromQueue(currentVideo.id);
                    } else {
                      addToQueue(currentVideo.id);
                    }
                  }}
                  className={`transition-colors ${
                    queue.includes(currentVideo.id)
                      ? "text-green-500 hover:text-green-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <MdQueueMusic size={18} />
                </button>
              }
              tooltipText={
                queue.includes(currentVideo.id)
                  ? "Remove from Queue"
                  : "Add to Queue"
              }
              position="top"
            />

            <Tooltip
              children={
                <button className="text-gray-400 hover:text-white transition-colors">
                  <AiOutlineLike size={18} />
                </button>
              }
              tooltipText="Like"
              position="top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
