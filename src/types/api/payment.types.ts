import { IGeneric } from "./auth.types";


export interface IPaymentResponse extends IGeneric {
    data: {
        authorization_url: string,
        access_code: string,
        reference: string,
        paymentId: string
    }
}

export interface IPaymentData{
    amount:number;
    currency:"NGN"|"USD"|string;
    useCase:"live schedule"|"live schedule ext";
    fullName:string;
    email:string
}