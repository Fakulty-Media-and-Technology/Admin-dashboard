import { IGeneric } from "./auth.types";

export interface ICreateVotesResponse extends IGeneric {
    data: IVoteData
}

export interface IVoteData{
    live_id : string
    price : number
    status : boolean
}