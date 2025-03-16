import { IGeneric } from "./auth.types";
import { IEventData } from "./live.types";
import { IUpcomingData } from "./upcoming.types";
import { IPhotoData } from "./upload.types";

export interface IFeaturedContentResponse extends IGeneric {
  data: IFeaturedContent;
}

export interface IFeaturedContent {
  vods_contents: IUpcomingData[];
  lives_contents: IEventData[];
}

export interface ILiveContents {
  _id: string;
  client_id: string;
  title: string;
  sub_title: string;
  stream_key: string;
  location: string;
  cover_photo: IPhotoData;
  preview_video: {
    bucket: string;
    key: string;
  };
  vid_class: string;
  pg: string;
  category: string[];
  description: string;
  active: boolean;
  expired: boolean;
  type: string;
  participants: number;
  start: string;
  expiry: string;
  likes: [];
  sponsored: boolean;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
  feat_expiry: string;
  featured: boolean;
}

export interface IAddFeatured {
  id: string;
  type: string;
  expiry: string;
}
