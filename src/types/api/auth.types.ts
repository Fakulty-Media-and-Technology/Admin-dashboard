export interface IGeneric {
  status: number;
  message: string;
}

export interface LoginResponse extends IGeneric {
  data: {
    _id: string;
    email: string;
    role: string;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SuperadminClientLoginRequest {
  email: string;
}
