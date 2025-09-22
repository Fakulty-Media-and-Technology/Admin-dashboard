import { IGeneric } from "./auth.types";

export interface IUsersResponse extends IGeneric {
  data: IUser[];
}

export interface IUserResponse extends IGeneric {
  data: IUser;
}

export interface IUser {
  _id: string;
  email: string;
  mobile: string;
  country_code: string;
  photo: string | null;
  verified: boolean;
  fullname: string;
  joined: string;
  substatus: string;
  paymentHistory: IPaymentHistory[]
  gender?: string;
  walletBal: number
  subs: ISubData[]
}

export interface IUserExample {
  _id: string;
  fullname: string;
  email: string;
  subs: string;
  joined: string;
  substatus: string;
  mobile?: string;
  gender?: string;
  verified: string;
  country_code: string;
  photo: string | null;
  walletBal: number
  paymentHistory: IPaymentHistory[]
}

export interface IEditUserRP {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  gender: string;
  country_code: string;
  mobile: string;
}

export interface IPaymentHistory {
  _id: string;
  amount: number;
  reference: string;
  status: string;
  is_used: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISubData {
  _id: null | string;
  plansDuration: number;
  totalSubs: number;
  totalAmount: number;
}
