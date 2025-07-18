import { IGeneric } from "./auth.types";

export interface IContestantData extends IGeneric{
    _id: string;
    names: string;
    occupation: string;
    contact: string;
    bio: string;
    photo: File
    liveId: string;

}

export interface ICreateVotesResponse extends IGeneric {
    data: IVoteData
}

export interface IVoteData{
    liveId : string
    price : number
    status : boolean
}

