import { useQuery } from "@tanstack/react-query";
import { Container, Alert } from "@mui/material";
import { getTrendingVideos } from "../../api/YouTubeApi";
import { VideoCard } from "./VideoCard";

import { Link } from "react-router-dom";
import Loader from "../common/Loader";

const TrendingVideosGrid = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["trendingVideos"],
    queryFn: () => getTrendingVideos(),
    staleTime: 60 * 1000,
  });

  if (isPending) return <Loader />;

  if (isError) {
    console.error(error, "\t:Error");
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

  const date = new Date().toLocaleDateString();
  console.log(date);

  return (
    <Container className="py-8">
      <div className="">
        <div className="space-x-3 p-2">
          <div className="border inline-block px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer">
            <span>All</span>
          </div>
          <div className="border inline-block px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer">
            <span>Trending</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((video) => (
          <Link
            key={video.id}
            to={`/watch/${video.id}`}
            state={{ video }}
            className="block cursor-pointer"
          >
            <VideoCard video={video} />
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default TrendingVideosGrid;




// import { useQuery } from "@tanstack/react-query";
// import { Container, Alert } from "@mui/material";
// import { getTrendingVideos, searchVideos } from "../../api/YouTubeApi";
// import { VideoCard } from "./VideoCard";
// import { Link } from "react-router-dom";
// import Loader from "../common/Loader";
// import { useSearch } from "../../context/SearchContext";
// import type { VideoItem } from "../../types/Types"; // ✅ Type for video data from API

// const TrendingVideosGrid = () => {
//   const { searchQuery } = useSearch(); // ✅ custom context for current search text

//   // ✅ Fetch trending videos if no search query
//   const trendingQuery = useQuery({
//     queryKey: ["trendingVideos"],
//     queryFn: () => getTrendingVideos(),
//     staleTime: 60 * 1000,
//     enabled: !searchQuery
//   });

//   // ✅ Fetch search results if query is active
//   const searchResults = useQuery({
//     queryKey: ["searchVideos", searchQuery],
//     queryFn: () => searchVideos(searchQuery),
//     staleTime: 30 * 1000,
//     enabled: !!searchQuery
//   });

//   // ✅ Choose which data to use
//   const { data, isPending, isError, error } = searchQuery 
//     ? searchResults 
//     : trendingQuery;

//   // ✅ Show loading spinner
//   if (isPending) return <Loader />;

//   // ✅ Error state
//   if (isError) {
//     console.error(error, "\t:Error");
//     return (
//       <Container className="py-8">
//         <Alert severity="error" className="mb-4">
//           Error loading videos. Please try again later.
//         </Alert>
//       </Container>
//     );
//   }

//   // ✅ No data
//   if (!data || data.length === 0) {
//     return (
//       <Container className="py-8">
//         <Alert severity="info">
//           {searchQuery 
//             ? `No results found for "${searchQuery}". Try different keywords.` 
//             : "No trending videos available at the moment."}
//         </Alert>
//       </Container>
//     );
//   }

//   // ✅ Render video grid
//   return (
//     <Container className="py-8">
//       <div>
//         <div className="space-x-3 p-2">
//           <div className="border inline-block px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer">
//             <span>All</span>
//           </div>
//           <div className="border inline-block px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer">
//             <span>Trending</span>
//           </div>
//           {searchQuery && (
//             <div className="inline-block px-4 py-2 font-bold text-white">
//               <span>Search results for: "{searchQuery}"</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         {data.map((video: VideoItem) => (
//           <Link
//             key={video.id}
//             to={`/watch/${video.id}`}
//             state={{ video }}
//             className="block cursor-pointer"
//           >
//             <VideoCard video={video} /> 
//           </Link>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default TrendingVideosGrid;
