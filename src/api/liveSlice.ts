
import { ICategoryResponse, ICastResponse, IAddCategory } from "@/types/api/category.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IGeneric } from "@/types/api/auth.types";
import { IPagination } from "@/types/api/suggestion.types";
import { IEventResponse } from "@/types/api/live.types";

export const liveApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<IEventResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("auth_token");
                return {
                    url: `/superadmin/lives/all/events?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),

        getChannels: builder.query<IEventResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("auth_token");
                return {
                    url: `/superadmin/lives/all/channels?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),


        getTVShows: builder.query<IEventResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("auth_token");
                return {
                    url: `/superadmin/lives/all/tvshows?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetChannelsQuery, useGetEventsQuery, useGetTVShowsQuery } = liveApiSlice;

export const getFetchTVShows = async (data: IPagination) =>
    await apiCall<IEventResponse>((baseApi) =>
        baseApi.get<IEventResponse>(
            `/superadmin/lives/all/tvshows?limit=${data.limit}&page=${data.page}`
        )
    );

export const getFetchEvents = async (data: IPagination) =>
    await apiCall<IEventResponse>((baseApi) =>
        baseApi.get<IEventResponse>(
            `/superadmin/lives/all/events?limit=${data.limit}&page=${data.page}`
        )
    );

export const getFetchChannels = async (data: IPagination) =>
    await apiCall<IEventResponse>((baseApi) =>
        baseApi.get<IEventResponse>(
            `/superadmin/lives/all/channels?limit=${data.limit}&page=${data.page}`
        )
    );

// export const addCategoryEnums = async (data: IAddCategory, path: string) =>
//   await apiCall<IGeneric>((baseApi) =>
//     baseApi.post<IGeneric>(`/superadmin/enums/add-${path}`, data)
//   );


