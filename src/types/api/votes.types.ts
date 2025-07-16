import { IGeneric } from "./auth.types";

export interface IContestantData extends IVoteData{
    name : string
    occupation : string
    contestant_No : string
    bio : string
}

export interface ICreateVotesResponse extends IGeneric {
    data: IVoteData
}

export interface IVoteData{
    liveId : string
    price : number
    status : boolean
}

