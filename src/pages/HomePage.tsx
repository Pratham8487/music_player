// import { useQuery } from "@tanstack/react-query";
// import { getTrendingVideos } from "../api/YouTubeApi";
import TrendingVideosGrid from "../components/common/TrendingVideoGrid";

const HomePage = () => {
  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["trendingVideos"],
  //   queryFn: () => getTrendingVideos(),
  //   staleTime: 60*1000,
  // });
  // if (isPending) {
  //   return <p>Loading...</p>;
  // }
  // if (!data) return null;
  // if (data) {
  //   return console.log("\ndata:---\t", data, "\t\nData");
  // }
  // if (isError) {
  //   console.log(error,"\t:Error")
  //   return <p>Error...</p>;
  // }
  return (
    <div className="min-h-screen bg-black">
      <TrendingVideosGrid />
    </div>
  );
};

export default HomePage;
