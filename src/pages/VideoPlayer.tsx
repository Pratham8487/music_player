import { useState, useCallback } from "react";
import YouTubeVideo from "../components/Video";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTrendingVideos } from "../api/YouTubeApi";

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

  const [selectedVideo, setSelectedVideo] = useState<VideoData>(stateVideo);

  const { data: trendingList, isPending: pendingTrendingList } = useQuery({
    queryKey: ["trendingVideos"],
    queryFn: () => getTrendingVideos(),
    staleTime: 60 * 1000,
  });

  const [currentVideoIndex, setCurrentVideoIndex] = useState(() => {
    if (trendingList && id) {
      return trendingList.findIndex((video) => video.id === id);
    }
    return 0;
  });

  const handleNextVideo = useCallback(() => {
    if (trendingList && currentVideoIndex < trendingList.length - 1) {
      const nextVideo = trendingList[currentVideoIndex + 1];
      setSelectedVideo(nextVideo);
      setCurrentVideoIndex((prev) => prev + 1);
    }
  }, [currentVideoIndex, trendingList]);

  const handlePreviousVideo = useCallback(() => {
    if (trendingList && currentVideoIndex > 0) {
      const prevVideo = trendingList[currentVideoIndex - 1];
      setSelectedVideo(prevVideo);
      setCurrentVideoIndex((prev) => prev - 1);
    }
  }, [currentVideoIndex, trendingList]);

  if (trendingList && trendingList.length === 0) {
    return (
      <Container className="py-8 h-40 flex items-center justify-center">
        <Alert severity="info">
          <p className="text-4xl">
            No trending videos available at the moment.
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen overflow-hidden px-auto">
        <div className="lg:col-span-2 p-4 flex items-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-800 overflow-hidden w-full">
            <YouTubeVideo
              videoId={selectedVideo.id}
              title={selectedVideo.title}
              onNextVideo={handleNextVideo}
              onPreviousVideo={handlePreviousVideo}
              hasNext={
                trendingList && currentVideoIndex < trendingList.length - 1
              }
              hasPrevious={currentVideoIndex > 0}
            />
          </div>
        </div>

        <div className="lg:col-span-1 p-4">
          <div className="rounded-xl shadow-lg overflow-hidden bg-gray-950 text-white ">
            <h2 className="text-xl font-semibold p-4 border-b text-red-200 items-center flex justify-center ">
              <span className="text-red-700 ">U</span>-Tube{" "}
              <span className="text-zinc-600 font-semibold">Music</span>
            </h2>
            <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
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
                      className={`flex p-3 cursor-pointer hover:bg-gray-800 transition-all duration-500 ${
                        selectedVideo.id === video.id ? "bg-gray-800" : ""
                      }`}
                      onClick={() => {
                        setSelectedVideo(video);
                        setCurrentVideoIndex(
                          trendingList.findIndex((v) => v.id === video.id)
                        );
                      }}
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
                        <h3 className="font-medium text-sm text-white line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-200 font-mono mt-1">
                          {video.channelTitle}
                        </p>
                        <p className="text-xs text-gray-300 font-semibold">
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
    </Container>
  );
};

export default VideoPlayer;
