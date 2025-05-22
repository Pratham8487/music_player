import { useQueue } from "../context/QueueContext";
import { useQueries } from "@tanstack/react-query";
import { getVideoById } from "../api/YouTubeApi";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import { TbMusicCancel } from "react-icons/tb";
import { VideoCard } from "../components/common/VideoCard";
import type { VideoItem } from "../types/Types";
import { useNavigate } from "react-router-dom";
import Tooltip from "../components/common/TooltipWrapper";

const QueuePage = () => {
  const navigate = useNavigate();
  const { queue, clearQueue } = useQueue();

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
        <Container className="py-8">
          <h1 className="text-2xl flex items-center justify-center text-red-200 font-bold mb-4">
            Your Queue ({queue.length})
          </h1>
          <div className="text-center p-12">
            <p className="font-mono text-xl text-gray-400">
              Your queue is empty.
            </p>
            <Link to="/">
              <button className="mt-6 inline-block px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                Explore Music
              </button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <Container className="py-8">
        <div className="flex justify-between">
          <h1 className="text-2xl flex items-center justify-center text-red-200 font-bold mb-4">
            Your Queue ({queue.length})
          </h1>

          <div onClick={clearQueue}>
            <Tooltip children={<TbMusicCancel />} tooltipText="Clear Queue" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {fetchedVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleNextPage(video)}
              className="block cursor-pointer"
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default QueuePage;
