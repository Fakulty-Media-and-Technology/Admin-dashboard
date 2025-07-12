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


export interface ICreateGiftCardResponse extends IGeneric {
  data: ICreateGiftCard;
};

export interface ICreateGiftCard {
  admin_id: string;
  serialNumber: number;
  amount: number;
  currency: string;
  code: string;
  used: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};