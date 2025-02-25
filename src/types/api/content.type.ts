import { ImageProps } from "@/app/plans/ClientComponent";

export interface ContentData {
  title: string;
  pg: string;
  releasedDate: string;
  category: string[];
  genre: string[];
  cast: string[];
  description: string;
  runtime: string;
  defaultRating: string;
  expiryDate: string;
  vidClass: string;
  videoLink?: string;
  trailerLink?: string;
}

export interface ContentFormData {
  landscapePoster: ImageProps;
  portraitPoster: ImageProps;
  trailer?: ImageProps | null;
  video?: ImageProps | null;
  data: ContentData;
}
