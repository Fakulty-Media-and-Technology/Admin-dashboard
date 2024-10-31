import { IGeneric } from "./auth.types";

export interface IAdsResponse extends IGeneric {
    data: IAdsData[]
}


export interface IAdsData {
    _id: string;
    title: string;
    sub_title: string;
    type: string;
    brand: string;
    link: string;
    duration: string;
    start: string;
    expiry: string;
    active: boolean;
    createdAt: string;
    updatedAt: string
}