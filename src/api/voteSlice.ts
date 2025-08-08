import { apiCall } from "./auth.api";
import { IContestantData, ICreateVotesResponse } from "@/types/api/votes.types";
import { IGeneric } from "@/types/api/auth.types";


export const createVotesInfo = async (data: { liveId: string; price: string; status: boolean }) =>
  await apiCall<ICreateVotesResponse>(
    (baseApi) =>
      baseApi.post<ICreateVotesResponse>("/clients/livestream/vote/info", data),
      true
  );

  export const updateVotesInfo = async (data: {liveId: string; price: string; status: boolean }) =>
  await apiCall<ICreateVotesResponse>(
    (baseApi) =>
      baseApi.put<ICreateVotesResponse>("/clients/livestream/vote/info/update/", data),
      true
  );

  export const addVoteContestant = async (data: FormData) =>
  await apiCall<IContestantData>(
    (baseApi) =>
      baseApi.post<IContestantData>('/clients/livestream/vote/contestant', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    true
  );


  export const getVotePollForLive = async (liveId: string) =>
  await apiCall<IContestantData[]>(
    (baseApi) =>
      baseApi.get(`/clients/livestream/vote/contestant/fetch/${liveId}`),
    true
  );



    export const deleteContestant = async (liveId: string, contestant_id: string) =>
        await apiCall<IGeneric>((baseApi) =>
            baseApi.delete<IGeneric>(
                `/clients/livestream/vote/contestant/remove/${liveId}/${contestant_id}`
            )
        );
