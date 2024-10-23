import { IGeneric } from "./auth.types";

export interface IUpcomingQuery {
  limit: number;
  page: number;
}

export interface IUpcomingResponse extends IGeneric {
  data: IUpcomingData[];
}

export interface IUpcomingData {
  _id: string;
  title: string;
  type: string;
  details: string;
  reminder: [];
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
