import { useQuery } from "@tanstack/react-query";
import { Container, Alert } from "@mui/material";
import { getTrendingVideos, searchVideos } from "../../api/YouTubeApi";
import { VideoCard } from "./VideoCard";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { useSearch } from "../../context/SearchContext";
import type { VideoItem } from "../../types/Types";

const TrendingVideosGrid = () => {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const handleNextPage = (video: VideoItem) => {
    navigate(`/watch/${video.id}`, { state: { video } });
  };

  const searchQuery = useQuery({
    queryKey: ["searchMusic", query],
    queryFn: () => searchVideos(query),
    enabled: !!query,
    staleTime: 60 * 1000,
  });

  const trendingMusic = useQuery({
    queryKey: ["trendingMusic"],
    queryFn: () => getTrendingVideos(),
    enabled: !query,
    staleTime: 60 * 1000,
  });

  const data = query ? searchQuery.data : trendingMusic.data;
  const isPending = query ? searchQuery.isLoading : trendingMusic.isLoading;
  const isError = query ? searchQuery.isError : trendingMusic.isError;

  console.log("Data------\n", data);

  if (isPending) return <Loader />;

  if (isError) {
    return (
      <Container className="py-8">
        <Alert severity="error" className="mb-4">
          Error loading trending videos. Please try again later.
        </Alert>
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Container className="py-8">
        <Alert severity="info">
          No trending videos available at the moment.
        </Alert>
      </Container>
    );
  }

  const handleSearchQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <Container className="py-8">
      <div className="flex flex-wrap gap-3 p-2 justify-center md:justify-start animate-pulse">
        <div
          className="border px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer text-sm sm:text-base"
          onClick={() => handleSearchQuery("All Bollywood Songs")}
        >
          <span>All</span>
        </div>
        <div
          className="border px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer text-sm sm:text-base"
          onClick={() => handleSearchQuery("Trending Bollywood Songs")}
        >
          <span>Trending</span>
        </div>
        <div
          className="border px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer text-sm sm:text-base"
          onClick={() => handleSearchQuery("Bollywood Romantic Songs")}
        >
          <span>Romance</span>
        </div>
        <div
          className="border px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer text-sm sm:text-base"
          onClick={() => handleSearchQuery("BollyWood Party Songs")}
        >
          <span>BollyWood Party</span>
        </div>
        <div
          className="border px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer text-sm sm:text-base"
          onClick={() => handleSearchQuery("India’s Biggest Hits Songs")}
        >
          <span>India’s Biggest Hits</span>
        </div>
        <div
          className="border px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer text-sm sm:text-base"
          onClick={() => handleSearchQuery("T-Series Songs")}
        >
          <span>T-Series</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {data.map((video) => (
          <div
            key={video.id}
            onDoubleClick={() => handleNextPage(video)}
            className="block cursor-pointer"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TrendingVideosGrid;
