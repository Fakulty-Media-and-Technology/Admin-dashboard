import { IGeneric } from "./auth.types";
import { IPhotoData } from "./upload.types";

export interface IEventResponse extends IGeneric {
    data: IEventData[]
}


export interface IEventData {
    _id: string;
    title: string;
    cover_photo: IPhotoData;
    vid_class: string;
    pg: string;
    active: boolean;
    expiry: string;
}