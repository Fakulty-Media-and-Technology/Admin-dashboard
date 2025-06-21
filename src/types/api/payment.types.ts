import { IGeneric } from "./auth.types";


export interface IPaymentResponse extends IGeneric {
    data: {}
}

export interface IPaymentData{
    amount:number;
    currency:"NGN"|"USD"|string;
    useCase:"live schedule"|"live schedule ext";
    fullName:string;
    email:string
}