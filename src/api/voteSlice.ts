import { apiCall } from "./auth.api";
import { ICreateVotesResponse } from "@/types/api/votes.types";
import { IGeneric } from "@/types/api/auth.types";

export const createVotesInfo = async (data: {live_id:string, price:string, status: boolean}) =>
  await apiCall<ICreateVotesResponse>((baseApi) =>
    baseApi.post<ICreateVotesResponse>(
      `/clients/livestream/vote/info`, 
      data,
    )
  );

  export const addVoteContestant = async (data:FormData) =>
    await apiCall<IGeneric>(baseApi => baseApi.post<IGeneric>('/clients/livestream/vote/contestant', data, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    }));

    export const deleteContestant = async (live_id: string, contestant_id: string) =>
        await apiCall<IGeneric>((baseApi) =>
            baseApi.delete<IGeneric>(
                `/clients/livestream/vote/contestant/remove/${live_id}/${contestant_id}`
            )
        );
