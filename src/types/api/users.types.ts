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
  gender?: string;
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
