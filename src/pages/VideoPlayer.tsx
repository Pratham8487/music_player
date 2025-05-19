import { useState } from "react";
import YouTubeVideo from "../components/Video";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVideoById, getTrendingVideos } from "../api/YouTubeApi";
import Loader from "../components/common/Loader";
import { Container, Alert } from "@mui/material";
import Skeleton from "react-loading-skeleton";

interface VideoData {
  id: string;
  title: string;
}

const VideoPlayer = () => {
  const { id } = useParams();
  const location = useLocation();
  const stateVideo = location.state?.video;
  const [Subscribe, setSubscribe] = useState("Subscribe");

  const [trendingVideos] = useState<VideoData[]>([
    { id: "wGv79GFS4Vg", title: "Introduction To WiseGPT" },
    { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up" },
    { id: "jNQXAC9IVRw", title: "Me at the zoo" },
    { id: "kJQP7kiw5Fk", title: "Despacito" },
  ]);

  const [selectedVideo, setSelectedVideo] = useState<VideoData>(
    stateVideo || trendingVideos[0]
  );

  const { data: trendingList, isPending: pendingTrendingList } = useQuery({
    queryKey: ["trendingVideos"],
    queryFn: () => getTrendingVideos(),
    staleTime: 60 * 1000,
  });

  const { data, isPending, isError } = useQuery({
    queryKey: ["videos", id],
    queryFn: () => getVideoById(id as string),
    enabled: !!id,
  });

  const handleSubscribe = () => {
    if (Subscribe === "Subscribe") {
      setSubscribe("Subscribed");
    } else {
      setSubscribe("Subscribe");
    }
  };

  if (isPending) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-700 border border-zinc-800 flex items-center justify-center">
        <h1 className="text-xl text-white animate-ping">There is an error.</h1>
      </div>
    );
  }

  if (trendingList && trendingList.length === 0) {
    return (
      <Container className="py-8">
        <Alert severity="info">
          No trending videos available at the moment.
        </Alert>
      </Container>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen overflow-hidden">
      <div className="lg:col-span-2 p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <YouTubeVideo
            videoId={selectedVideo.id}
            title={selectedVideo.title}
          />
        </div>
        <div className="py-3 gap-5">
          <h6 className="font-bold text-shadow-lg text-lg text-pretty -tracking-tighter line-clamp-2">
            {data?.title}
          </h6>
          <div>
            <div className="flex justify-items-start space-x-5 items-center">
              <img src={data?.thumbnail} className="rounded-full w-10 h-10" />
              <h3 className="space-x-8 font-bold text-md text-pretty -tracking-tighter line-clamp-2">
                {data?.channelTitle}
              </h3>
              <div
                className="border inline-block px-2 py-1 rounded-full bg-white font-bold text-zinc-700 cursor-pointer"
                onClick={handleSubscribe}
              >
                <span
                  className={`text-sm transition-all duration-200 ${
                    Subscribe === "Subscribed"
                      ? "text-blue-500"
                      : "text-zinc-700"
                  }`}
                >
                  {Subscribe}
                </span>
              </div>
            </div>
            <h4 className="font-semibold text-sm text-pretty -tracking-tighter line-clamp-2">
              {data?.description}
            </h4>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 p-4">
        <div className="rounded-xl shadow-lg overflow-hidden bg-gray-300">
          <h2 className="text-xl font-semibold p-4 border-b text-gray-800 items-center flex justify-center ">
            Trending Music
          </h2>
          <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
            {pendingTrendingList
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="flex p-3">
                      <div className="w-32 h-20 bg-gray-300 flex-shrink-0 relative rounded overflow-hidden">
                        <Skeleton height={80} width={128} />
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                          <Skeleton height={14} width={30} />
                        </div>
                      </div>
                      <div className="ml-3 flex-grow">
                        <Skeleton height={16} width={150} />
                        <Skeleton
                          height={12}
                          width={100}
                          style={{ marginTop: 4 }}
                        />
                        <Skeleton
                          height={12}
                          width={120}
                          style={{ marginTop: 4 }}
                        />
                      </div>
                    </div>
                  ))
              : trendingList
              ? trendingList.map((video) => (
                  <div
                    key={video.id}
                    className={`flex p-3 cursor-pointer hover:bg-gray-100 transition ${
                      selectedVideo.id === video.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="w-32 h-20 bg-gray-300 flex-shrink-0 relative rounded overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="ml-3 flex-grow">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {video.channelTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {video.publishedTime} • {video.viewCount}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
