import type { VideoItem } from "../../types/Types";
import { User, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdQueueMusic } from "react-icons/md";
import { useQueue } from "../../context/QueueContext";

type VideoCardProps = {
  video: VideoItem;
};
export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();
  const { queue, addToQueue, removeFromQueue } = useQueue();
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToolTip = () => setShowTooltip(true);
  const hideToolTip = () => setShowTooltip(false);

  const handleClick = () => {
    navigate(`/watch/${video.id}`, { state: { video } });
  };

  useEffect(() => {
    console.log("Queue:- ", queue);
  }, [queue]);
  return (
    <div
      onClick={handleClick}
      className="h-full flex flex-col bg-black rounded-lg overflow-hidden py-1 transition-shadow duration-300 justify-between"
    >
      <div
        className="relative p-3 hover:scale-105 transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-48 w-full object-cover rounded-xl shadow-gray-500 cursor-pointer"
        />
        <div
          className={`absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium`}
        >
          {isHovered ? <FaPlay /> : video.duration}{" "}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h6 className="font-bold text-shadow-lg text-lg text-pretty -tracking-tighter line-clamp-2 hover:underline">
          {video.title}
        </h6>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center justify-between">
            <User size={16} className="mr-1 text-gray-300 " />
            <p className="flex-grow text-sm text-gray-300 -tracking-tighter font-semibold text-wrap">
              {video.channelTitle}
            </p>
          </div>

          <div className="relative inline-block">
            <MdQueueMusic
              onClick={(e) => {
                e.stopPropagation();
                if (queue.includes(video.id!)) {
                  removeFromQueue(video.id!);
                } else {
                  addToQueue(video.id!);
                }
              }}
              onMouseEnter={handleToolTip}
              onMouseLeave={hideToolTip}
              className={`hover:scale-180 scale-160 transition-all duration-300 cursor-pointer ${
                queue.includes(video.id!) ? "text-green-500" : ""
              }`}
            />
            {showTooltip && (
              <h6 className="absolute top-full left-1/2 -translate-x-1/2 mt-1 p-1 bg-black text-white text-[10px] font-mono rounded shadow z-10 text-pretty ">
                {queue.includes(video.id!)
                  ? "Remove from Queue"
                  : "Add to Queue"}
              </h6>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <Eye size={16} className="mr-1 text-gray-400" />
            <p className="flex-grow text-sm text-gray-400 -tracking-tighter font-semibold">
              {video.viewCount}
            </p>
          </div>
          <div className="flex items-center">
            <p className="flex-grow text-sm text-gray-400 -tracking-tighter font-semibold">
              {video.publishedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
