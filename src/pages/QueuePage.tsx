import { useQueue } from "../context/QueueContext";
import { useQueries } from "@tanstack/react-query";
import { getVideoById } from "../api/YouTubeApi";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import { VideoCard } from "../components/common/VideoCard";
import type { VideoItem } from "../types/Types";
import { useNavigate } from "react-router-dom";

const QueuePage = () => {
  const navigate = useNavigate();
  const { queue } = useQueue();

  const videoQueries = useQueries({
    queries: queue.map((id) => ({
      queryKey: ["videos", id],
      queryFn: () => getVideoById(id),
      enabled: !!id,
    })),
  });

  const isPending = videoQueries.some((query) => query.isPending);

  const fetchedVideos = videoQueries
    .map((query) => query.data)
    .filter((video) => video !== undefined && video !== null);

  if (isPending) {
    return <Loader />;
  }

  const handleNextPage = (video: VideoItem) => {
    navigate(`/watch/${video.id}`, { state: { video } });
  };

  if (queue.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Your Queue</h1>
        <div className="text-center p-12">
          <p className="text-xl text-gray-400">Your queue is empty</p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Explore Music
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl flex items-center justify-center text-red-200 font-bold mb-4">
        Your Queue ({queue.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* {fetchedVideos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-900 rounded-lg overflow-hidden"
          >
            <Link to={`/watch/${video.id}`}>
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/watch/${video.id}`}>
                <h3 className="font-bold text-lg line-clamp-2 hover:underline">
                  {video.title}
                </h3>
              </Link>

              <div className="mt-2 flex items-center text-gray-400 text-sm">
                <p>{video.channelTitle}</p>
              </div>

              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <p>{video.viewCount}</p>
                <p>{video.publishedTime}</p>
              </div>
            </div>
          </div>
        ))} */}
        {fetchedVideos.map((video) => (
          <div
            key={video.id}
            onDoubleClick={() => handleNextPage(video)}
            className="block cursor-pointer"
          >
            <VideoCard video={video} />
          </div>
        ))}
        {/* {data.map((video) => (
          <div
            key={video.id}
            onDoubleClick={() => handleNextPage(video)}
            className="block cursor-pointer"
          >
            <VideoCard  video={video} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default QueuePage;
