import { IGeneric } from "./auth.types";

export interface IMediaResponse extends IGeneric {
    data: IMediaData[]
}

interface ICategory {
    _id: string;
    name: string;
    position: number
}
interface ICast {
    _id: string;
    name: string;
    title: number
}


export interface IMediaData {
    _id: string;
    admin_id: string;
    title: string;
    artistName?: string;
    sub_title: string;
    description: string;
    viewsCount: number;
    vidClass: string;
    pg: string;
    genre: ICategory[];
    category: ICategory[];
    cast: ICast[];
    releaseDate: string;
    expiryDate: string;
    likes: [];
    runtime: string;
    defaultRating: number;
    averageRating: number;
    featured: boolean;
    active: boolean;
    showViews: boolean;
    upcoming: boolean;
    upcomingSubscribers: string[]
    landscapePhoto: string;
    portraitPhoto: string;
    video: string;
    trailer: string;
    is_series: boolean;
    episodes?: IEpisodes[]
    seasons: [];
    createdAt: string
}

export interface IRemiders {
    userId: string
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