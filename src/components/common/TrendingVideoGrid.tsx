import { useQuery } from "@tanstack/react-query";
import { Container, Alert } from "@mui/material";
import { getTrendingVideos, searchVideos } from "../../api/YouTubeApi";
import { VideoCard } from "./VideoCard";
import CategoryButtons from "./CategoryButtons";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { useSearch } from "../../context/SearchContext";
import type { VideoItem } from "../../types/Types";

const categories = [
  { label: "All", query: "All Bollywood Songs" },
  { label: "Trending", query: "Trending Bollywood Songs" },
  { label: "Romance", query: "Bollywood Romantic Songs" },
  { label: "BollyWood Party", query: "BollyWood Party Songs" },
  { label: "India’s Biggest Hits", query: "India’s Biggest Hits Songs" },
  { label: "T-Series", query: "T-Series Songs" },
];

const TrendingVideosGrid = () => {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const handleNextPage = (video: VideoItem) => {
    navigate(`/watch/${video.id}`, { state: { video } });
  };

  const trendingMusic = useQuery({
    queryKey: ["trendingMusic"],
    queryFn: () => getTrendingVideos(),
    enabled: !query,
    staleTime: 60 * 1000,
  });

  const searchQuery = useQuery({
    queryKey: ["searchMusic", query],
    queryFn: () => searchVideos(query),
    enabled: !!query,
    staleTime: 60 * 1000,
  });

  // const trendingMusic = useInfiniteQuery({
  //   queryKey: ["trendingMusic"],
  //   queryFn: ({ pageParam = "" }) => getTrendingVideos(pageParam),
  //   initialPageParam: "",
  //   getNextPageParam: (lastPage) => lastPage.nextPageToken,
  //   enabled: !query,
  //   staleTime: 60 * 1000,
  // });

  const data = query ? searchQuery.data : trendingMusic.data;
  const isPending = query ? searchQuery.isLoading : trendingMusic.isLoading;
  const isError = query ? searchQuery.isError : trendingMusic.isError;

  console.log("Data:-\n", data);

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

  if (!data) {
    return (
      <Container className="py-8">
        <Alert severity="info">
          No trending videos available at the moment.
        </Alert>
      </Container>
    );
  }
  const handleCatergoryButtonQuery = (query: string) => {
    setQuery(query);
  };

  return (
    <Container className="py-8">
      <CategoryButtons
        categories={categories}
        onCategoryClick={handleCatergoryButtonQuery}
        animate={false}
      />

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
