import type { YouTubeVideo, VideoItem } from "../../types/Types";
import { User, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

type VideoCardProps = {
  video: VideoItem;
};
export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
// export const VideoCard = ({ video }: { video: YouTubeVideo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video.id}`, { state: { video } });
  };
  return (
    <div
      onClick={handleClick}
      className="h-full flex flex-col bg-black rounded-lg overflow-hidden py-1 transition-shadow duration-300 justify-between"
    >
      <div className="relative p-3 hover:scale-105 transition-all duration-700">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-48 w-full object-cover rounded-xl shadow-gray-500 cursor-pointer"
        />
        <div
          className={`absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium`}
        >
          {video.duration}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h6 className="font-bold text-shadow-lg text-lg text-pretty -tracking-tighter line-clamp-2">
          {video.title}
        </h6>

        <div className="mt-2 flex items-center">
          <User size={16} className="mr-1 text-gray-300 " />
          <p className="flex-grow text-sm text-gray-300 -tracking-tighter font-semibold">
            {video.channelTitle}
          </p>
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
