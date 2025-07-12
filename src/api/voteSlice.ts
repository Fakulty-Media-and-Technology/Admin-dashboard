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