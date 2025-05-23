import type { ReactNode } from "react";

export interface YouTubeVideo {
  description: string;
  likeCount: any;
  commentCount: any;
  publishedTime: ReactNode;
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      blocked?: string[];
    };
    contentRating: Record<string, unknown>;
    projection: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };

  title: string;
  channelTitle: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
  startTime: number;
  endTime: number;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface SearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchResultItem[];
}

export interface SearchResultItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface VideoDetailResponse {
  kind: string;
  etag: string;
  items: VideoDetailItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoDetailItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      blocked?: string[];
    };
    contentRating: Record<string, unknown>;
    projection: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface VideoItem {
  id?: string;
  title?: string;
  likeCount?: any;
  commentCount?: any;
  publishedTime?: ReactNode;
  kind?: string;
  etag?: string;
  channelTitle?: string;
  thumbnail?: string;
  duration?: string;
  viewCount?: string;
  startTime?: number;
  endTime?: number;
  description?: any;
  contentDetails?: {
    duration?: string;
    dimension?: string;
    definition?: string;
    caption?: string;
    licensedContent?: boolean;
    regionRestriction?: {
      blocked?: string[];
    };
    contentRating?: Record<string, unknown>;
    projection?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    favoriteCount?: string;
    commentCount?: string;
  };
  snippet?: {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: {
      default?: Thumbnail;
      medium?: Thumbnail;
      high?: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle?: string;
    tags?: string[];
    categoryId?: string;
    liveBroadcastContent?: string;
    localized?: {
      title?: string;
      description?: string;
    };
  };
}






