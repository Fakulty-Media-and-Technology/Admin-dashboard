import { IGeneric } from "./auth.types";

export interface IMediaResponse extends IGeneric {
    data: IMediaData[]
}


export interface IMediaData {
    _id: string;
    admin_id: string;
    title: string;
    sub_title: string;
    type: string;
    bucket: string;
    key: string;
    vid_class: string;
    pg: string;
    genre: [];
    category: [];
    cast: string[];
    releaseed_date: string;
    expiry_date: string;
    likes: [];
    runtime: string;
    default_rating: number;
    featured: boolean;
    is_series: boolean;
    episodes?: IEpisodes[]
}


export interface IMediaSeriesResponse extends IGeneric {
    data: IMediaSeriesData[]
}


export interface IMediaSeriesData extends IMediaData {
    episodes: IEpisodes[]
}

export interface IEpisodes {
    season: number;
    episode_number: number;
    episode_title: string;
    episode_description: string;
    bucket: string;
    key: string;
    _id: string;
}