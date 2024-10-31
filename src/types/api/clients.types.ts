import { IGeneric } from "./auth.types";

export interface IClientsResponse extends IGeneric {
    data: IClientsData[]
}


export interface IClientsData {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    mobile: string;
    role: string;
    verified: boolean;
    createdat: string
}


export interface IClientCreate {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    cpassword: string;
    country_code: string;
    mobile: string;
    verified: boolean;
    client_type: string;
    photo?: IPhoto
}


export interface IPhoto {
    Bucket: string;
    Key: string;
}