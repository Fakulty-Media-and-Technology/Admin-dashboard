import { IGeneric } from "./auth.types";
import { IUser } from "./users.types";

export interface IClientsResponse extends IGeneric {
    data: IClientsData[]
}

export interface IClientsDepositResponse extends IGeneric {
    data: IClientsDepositData[]
}


export interface IClientsData extends Omit<IUser, 'gender'> {
    role: string
}

export interface IClientsDepositData {
    _id: string;
    user_id: string;
    full_name: string;
    email: string;
    amount: number;
    reference: string;
    status: string;
    is_used: boolean;
    createdAt: string;
    updatedAt: string;
    use_case: string;
    client: IClient[]
}

export interface IClient {
    _id: string;
    role: string;
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