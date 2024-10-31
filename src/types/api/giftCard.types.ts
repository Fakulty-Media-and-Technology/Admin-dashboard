import { IGeneric } from "./auth.types";

export interface IGiftCardResponse extends IGeneric {
    data: IGiftCardData[]
}


export interface IGiftCardData {
    _id: string;
    admin_id: string;
    serial_number: string;
    amount: number;
    code: string;
    used: boolean;
    createdAt: string;
    updatedAt: string;
}