import { IGeneric } from "./auth.types";

export interface IPlanSubsResponse extends IGeneric {
    data: IPlanSubsData[]
}

export interface IPlanSubsData {
    _id: string;
    admin_id: string;
    months_duration: number
    price: number;
    details: string;
    createdAt: string;
    updatedAt: string
    title: string;
}


export interface ISubscriptionResponse extends IGeneric {
    data: ISubscription[]
}


export interface ISubscription {
    _id: string;
    user_id: string;
    plan_id: string;
    start_date: string;
    expiry_date: string;
    payment_method: string;
    amount: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    plan: {
        _id: string;
        months_duration: number
        price: number;
        title: string;
    }
}


export interface IAddPlans {
    title: string;
    months: number;
    price: number;
    details: string;
}