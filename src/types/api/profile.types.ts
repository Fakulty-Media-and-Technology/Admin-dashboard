import { IGeneric } from "./auth.types";

export interface IProfile {
  profile: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    mobile: string;
    role: string;
    photo: {
      Bucket: string;
      Key: string;
      ContentType: string;
    };
    wallet_bal: {
      _id: string;
      balance: string;
    };
  };
  photo_url: string;
}

export interface UserResponse extends IGeneric {
  data: IProfile;
}

export interface SuperUserResponse extends IGeneric {
  data: IProfile[];
}

export interface IEditUser {
  first_name: string;
  last_name: string;
  email: string;
  country_code: string;
  mobile: string;
  photo: {
    Bucket: string;
    Key: string;
  };
  password: string;
}
