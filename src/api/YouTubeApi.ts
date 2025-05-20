import axios from "axios";
import type {
  YouTubeVideo,
  VideoItem,
  SearchResponse,
  VideoDetailResponse,
} from "../types/Types";

const API_KEY = "AIzaSyCuBAog_jEi3VWpg0cmiFGo7aQkeROyN_k";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const formatDuration = (duration: string): string => {
  const totalSeconds = parseDurationToSeconds(duration);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const parseDurationToSeconds = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  return hours * 3600 + minutes * 60 + seconds;
};

export const formatViewCount = (viewCount: string): string => {
  const count = parseInt(viewCount);
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
  return `${count} views`;
};

export function getRelativeTimeAgo(dateString: string): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Infinity, "year"],
  ];

  let duration = diffInSeconds;
  let unit: Intl.RelativeTimeFormatUnit = "second";

  for (const [amount, nextUnit] of intervals) {
    if (Math.abs(duration) < amount) break;
    duration /= amount;
    unit = nextUnit;
  }

  return rtf.format(Math.round(-duration), unit);
}

export const getTrendingVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 10,
        videoCategoryId: "10",
        key: API_KEY,
      },
    });
    return res.data.items.map(
      (item: {
        contentDetails: { duration: string };
        id: any;
        snippet: {
          title: any;
          channelTitle: any;
          thumbnails: {
            maxres: any;
            high: { url: any };
          };
          publishedAt: any;
        };
        statistics: { viewCount: string };
      }) => {
        const durationInSeconds = parseDurationToSeconds(
          item.contentDetails.duration
        );
        return {
          publishedTime: getRelativeTimeAgo(item.snippet.publishedAt),
          id: item.id,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.maxres.url,
          duration: formatDuration(item.contentDetails.duration),
          viewCount: formatViewCount(item.statistics.viewCount),
          startTime: 0,
          endTime: durationInSeconds,
        };
      }
    );
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    return [];
  }
};

// export const searchVideos = async (query: string): Promise<VideoItem[]> => {
//   try {
//     const searchResponse = await axios.get<SearchResponse>(
//       `${BASE_URL}/search`,
//       {
//         params: {
//           part: "snippet",
//           maxResults: 10,
//           q: query,
//           type: "video",
//           key: API_KEY,
//         },
//       }
//     );

//     if (!searchResponse.data.items.length) return [];

//     const videoIds = searchResponse.data.items
//       .filter((item) => item.id.videoId)
//       .map((item) => item.id.videoId);

//     const detailsResponse = await axios.get<VideoDetailResponse>(
//       `${BASE_URL}/videos`,
//       {
//         params: {
//           part: "contentDetails,statistics,snippet",
//           id: videoIds.join(","),
//           key: API_KEY,
//         },
//       }
//     );

//     return detailsResponse.data.items.map(
//       (item: {
//         contentDetails: { duration: string };
//         id: any;
//         snippet: {
//           title: any;
//           channelTitle: any;
//           thumbnails: { high: { url: any } };
//         };
//         statistics: { viewCount: string };
//       }) => {
//         const durationInSeconds = parseDurationToSeconds(
//           item.contentDetails.duration
//         );
//         return {
//           id: item.id,
//           title: item.snippet.title,
//           channelTitle: item.snippet.channelTitle,
//           thumbnail: item.snippet.thumbnails.high.url,
//           duration: formatDuration(item.contentDetails.duration),
//           viewCount: formatViewCount(item.statistics.viewCount),
//           startTime: 0,
//           endTime: durationInSeconds,
//         };
//       }
//     );
//   } catch (error) {
//     console.error("Error searching videos:", error);
//     return [];
//   }
// };

export const searchVideos = async (query: string): Promise<VideoItem[]> => {
  try {
    const searchResponse = await axios.get<SearchResponse>(
      `${BASE_URL}/search`,
      {
        params: {
          part: "snippet",
          maxResults: 10,
          q: query,
          type: "video",
          key: API_KEY,
        },
      }
    );

    if (!searchResponse.data.items.length) return [];

    const videoIds = searchResponse.data.items
      .filter((item) => item.id.videoId)
      .map((item) => item.id.videoId);

    const detailsResponse = await axios.get<VideoDetailResponse>(
      `${BASE_URL}/videos`,
      {
        params: {
          part: "contentDetails,statistics,snippet",
          id: videoIds.join(","),
          key: API_KEY,
        },
      }
    );

    return detailsResponse.data.items
      .filter((item) => item.contentDetails?.duration)
      .map((item) => {
        const duration = item.contentDetails.duration;
        const durationInSeconds = parseDurationToSeconds(duration);

        return {
          id: item.id,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.high.url,
          duration: formatDuration(duration),
          viewCount: formatViewCount(item.statistics.viewCount),
          startTime: 0,
          endTime: durationInSeconds,
        };
      });
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
};

export const getVideoById = async (
  videoId: string
): Promise<YouTubeVideo | null> => {
  try {
    const res = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoId,
        key: API_KEY,
      },
    });

    if (!res.data.items || res.data.items.length === 0) {
      return null;
    }

    const item = res.data.items[0];
    const durationInSeconds = parseDurationToSeconds(
      item.contentDetails.duration
    );

    return {
      kind: item.kind,
      etag: item.etag,
      id: item.id,
      snippet: item.snippet,
      contentDetails: item.contentDetails,
      statistics: item.statistics,
      description: item.snippet.description,
      publishedTime: getRelativeTimeAgo(item.snippet.publishedAt),
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: formatDuration(item.contentDetails.duration),
      viewCount: formatViewCount(item.statistics.viewCount),
      likeCount: item.statistics.likeCount,
      commentCount: item.statistics.commentCount,
      startTime: 0,
      endTime: durationInSeconds,
    };
  } catch (error) {
    console.error(`Error fetching video with ID ${videoId}:`, error);
    return null;
  }
};
