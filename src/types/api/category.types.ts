import { IGeneric } from "./auth.types";


export interface ICategoryResponse extends IGeneric {
    data: ICategory[]
}

export interface ICategory {
    _id: string;
    name: string;
    position?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICast extends ICategory {
    title: string;
}

export interface ICastResponse extends IGeneric {
    data: ICast[]
}


export interface IAddCategory {
    name: string;
    title?: string
    position?: number
}