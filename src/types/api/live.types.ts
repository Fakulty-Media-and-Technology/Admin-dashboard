import { IGeneric } from "./auth.types";
import { IPhotoData } from "./upload.types";

export interface IEventResponse extends IGeneric {
    data: IEventData[]
}


export interface IEventData {
    _id: string;
    title: string;
    location: string;
    description: string;
    active: boolean;
    expired: boolean;
    type: string;
    start: string;
    sponsored: boolean;
    popular: boolean;
    featured: boolean;
    coverPhoto: string;
    createdAt: string;
    updatedAt: string;
    upcoming: boolean;
    upcomingSubscribers: string[];
    viewsCount: number;
    streamKey: string;
    vidClass: string
    clientId: string;
    previewVideoUploadDocSrc: string;
    pg: string;
    expiry: string;
}