// import { useQuery } from "@tanstack/react-query";
// import { Container, Alert } from "@mui/material";
// import { getTrendingVideos } from "../../api/YouTubeApi";
// import { VideoCard } from "./VideoCard";

// const TrendingVideosGrid = () => {
//   const { data, isPending, isError, error } = useQuery({
//     queryKey: ["trendingVideos"],
//     queryFn: () => getTrendingVideos(),
//     staleTime: 60 * 1000,
//   });

//   // if (isPending) {
//   //   return (
//   //     <Container className="py-8">
//   //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//   //         <div className="h-full flex flex-col bg-black rounded-lg overflow-hidden py-1 transition-shadow duration-300 justify-between">
//   //           <div className="relative p-3">
//   //             <div className="h-48 w-full rounded-xl bg-gray-700 animate-pulse" />
//   //             <div className="absolute bottom-2 right-2 bg-gray-700 animate-pulse h-6 w-16 rounded" />
//   //           </div>
//   //           <div className="p-4 flex-grow flex flex-col">
//   //             <div className="h-6 bg-gray-700 rounded animate-pulse mb-2" />
//   //             <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4" />
//   //             <div className="mt-2 flex items-center">
//   //               <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse mr-1" />
//   //               <div className="flex-grow h-4 bg-gray-700 rounded animate-pulse w-1/2" />
//   //             </div>
//   //             <div className="mt-2 flex items-center">
//   //               <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse mr-1" />
//   //               <div className="flex-grow h-4 bg-gray-700 rounded animate-pulse w-1/3" />
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </Container>
//   //   );
//   // }

//   if(isPending){

//     return (
//     <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center">
//       {/* Logo */}
//       <div className="mb-12 flex items-center">
//         <h1 className="text-4xl font-bold">
//           <span className="text-red-500">U</span>
//           <span className="text-white">-Tube</span>
//         </h1>
//       </div>

//       {/* Animated Music Equalizer */}
//       <div className="flex items-end mb-10 h-20">
//         {[...Array(12)].map((_, i) => {
//           const barHeight = 20 + Math.sin((progress / 10) + (i / 2)) * 40;
//           const delay = i * 0.05;

//           return (
//             <div
//               key={i}
//               className="w-3 mx-1 bg-red-500 rounded-t-sm"
//               style={{
//                 height: `${barHeight}px`,
//                 animation: `equalizer 1s ${delay}s ease-in-out infinite alternate`,
//                 opacity: progress > 20 ? 1 : progress / 20
//               }}
//             />
//           );
//         })}
//       </div>

//       {/* Loading Progress */}
//       <div className="w-64 h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
//         <div
//           className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
//           style={{ width: `${progress}%` }}
//         />
//       </div>

//       <p className="text-gray-400 text-sm">
//         {progress < 100 ? "Loading your music..." : "Ready to play!"}
//       </p>

//       {/* Animated Record */}
//       <div className="mt-12 relative">
//         <div
//           className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border-4 border-gray-700 flex items-center justify-center"
//           style={{
//             animation: "spin 3s linear infinite",
//             opacity: progress > 40 ? 1 : progress / 40
//           }}
//         >
//           <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-700" />
//         </div>
//         {/* Record arm */}
//         <div
//           className="absolute top-10 -right-6 w-16 h-2 bg-gray-600 rounded-r-full origin-left"
//           style={{
//             transform: `rotate(${Math.min(45, progress/2 - 5)}deg)`,
//             opacity: progress > 60 ? 1 : progress / 60
//           }}
//         >
//           <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-red-500" />
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes equalizer {
//           0% {
//             height: 10px;
//           }
//           100% {
//             height: 60px;
//           }
//         }

//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//   if (isError) {
//     console.error(error, "\t:Error");
//     return (
//       <Container className="py-8">
//         <Alert severity="error" className="mb-4">
//           Error loading trending videos. Please try again later.
//         </Alert>
//       </Container>
//     );
//   }

//   if (!data || data.length === 0) {
//     return (
//       <Container className="py-8">
//         <Alert severity="info">
//           No trending videos available at the moment.
//         </Alert>
//       </Container>
//     );
//   }

//   const date = new Date().toLocaleDateString();
//   console.log(date);

//   return (
//     <Container className="py-8">
//       <div className="">
//         <div className="space-x-3 p-2">
//           <div className="border inline-block px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer">
//             <span>All</span>
//           </div>
//           <div className="border inline-block px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer">
//             <span>Trending</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         {data.map((video) => (
//           <div key={video.id}>
//             <VideoCard video={video} />
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default TrendingVideosGrid;

import { useQuery } from "@tanstack/react-query";
import { Container, Alert } from "@mui/material";
import { getTrendingVideos } from "../../api/YouTubeApi";
import { VideoCard } from "./VideoCard";
import { useEffect, useState } from "react";

const TrendingVideosGrid = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["trendingVideos"],
    queryFn: () => getTrendingVideos(),
    staleTime: 60 * 1000,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPending) return;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [isPending]);

  if (isPending) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="mb-12 flex items-center">
          <h1 className="text-4xl font-bold">
            <span className="text-red-500">U</span>
            <span className="text-white">-Tube</span>
          </h1>
        </div>

        <div className="flex items-end mb-10 h-20">
          {[...Array(12)].map((_, i) => {
            const barHeight = 20 + Math.sin(progress / 10 + i / 2) * 40;
            const delay = i * 0.05;

            return (
              <div
                key={i}
                className="w-3 mx-1 bg-red-500 rounded-t-sm"
                style={{
                  height: `${barHeight}px`,
                  animation: `equalizer 1s ${delay}s ease-in-out infinite alternate`,
                  opacity: progress > 20 ? 1 : progress / 20,
                }}
              />
            );
          })}
        </div>

        <div className="w-64 h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-400 text-sm">
          {progress < 100 ? "Loading ..." : "Ready to play!"}
        </p>

        <div className="mt-12 relative">
          <div
            className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border-4 border-gray-700 flex items-center justify-center"
            style={{
              animation: "spin 3s linear infinite",
              opacity: progress > 40 ? 1 : progress / 40,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-700" />
          </div>

          <div
            className="absolute top-10 -right-6 w-16 h-2 bg-gray-600 rounded-r-full origin-left"
            style={{
              transform: `rotate(${Math.min(45, progress / 2 - 5)}deg)`,
              opacity: progress > 60 ? 1 : progress / 60,
            }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-red-500" />
          </div>
        </div>

        <style>{`
          @keyframes equalizer {
            0% {
              height: 10px;
            }
            100% {
              height: 60px;
            }
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

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
          <div key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TrendingVideosGrid;
