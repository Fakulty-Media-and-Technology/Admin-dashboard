import { IGeneric } from "./auth.types";
import { IEventData } from "./live.types";
import { IMediaData } from "./media.types";

export interface IUpcomingQuery {
  limit: number;
  page: number;
}

export interface IUpcomingResponse extends IGeneric {
  data: {
    vods: IUpcomingData[];
    lives: IEventData[]
  };
}

export interface IContentSearchResponse extends IGeneric {
  data: {
    vods: IUpcomingData[];
    events: IEventData[]
  };
}

export interface IUpcomingData extends IMediaData {
  type: string;
}

export interface IUpcomingEventFormated {
  title: string;
  reminder: string;
  type: string;
  option: string;
  views: string;
  _id: string;
  details: string;
  release_date: string;
  active: boolean;
  trailer_id: string;
  portrait_photo: {
    Bucket: string;
    Key: string;
    ContentType: string;
  };
  landscape_photo: {
    Bucket: string;
    Key: string;
    ContentType: string;
  };
}
