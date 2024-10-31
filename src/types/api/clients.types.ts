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