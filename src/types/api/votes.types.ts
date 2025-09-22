import { IGeneric } from "./auth.types";

export interface ICreateVotesResponse extends IGeneric {
    data: IVoteData
};

export interface IVoteData{
    liveId : string
    price : number
    status : boolean
};

export interface IContestantResponse extends IGeneric{
    data : IContestantData
}

export interface IContestantData {
    _id : string
    liveId : string
    names : string
    occupation : string
    bio : string
    votes : string
    contact : string
    photo : File
}

