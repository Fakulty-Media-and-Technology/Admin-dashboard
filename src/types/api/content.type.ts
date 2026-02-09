import { ImageProps } from "@/app/plans/ClientComponent";
import { IGeneric } from "./auth.types";

export interface ContentData {
  title: string;
  pg: string;
  primaryColor: string;
  releasedDate: string;
  category: string[];
  genre: string[];
  cast?: string[];
  description?: string;
  runtime: string;
  defaultRating: string;
  expiryDate: string;
  vidClass: string;
  videoLink?: string;
  trailerLink?: string;
  artistName?: string;
  currency?: string;
  amount?:number
}

export interface ContentFormData {
  landscapePoster: ImageProps;
  portraitPoster: ImageProps;
  trailer?: ImageProps | null;
  video?: ImageProps | null;
  data: ContentData;
}


export interface ISeasonResponse extends IGeneric {
  data: ISeasonData[]
}

export interface ISeasonData {
  _id: string;
  admin: string
  video: string;
  serial_number: number;
  episodes: IEpisodeData[];
  viewsCount: number;
}

export interface IEpisodeData {
  _id: string;
  admin: string
  season: string;
  episodeNumber: number;
  title: string;
  description: string;
  video: string;
  trailer: string;
}