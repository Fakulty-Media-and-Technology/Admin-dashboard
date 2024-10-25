import { IPagination, ISuggestionResponse } from "@/types/api/suggestion.types";
import { apiSlice } from "./apiSlice";
import { apiCall, } from "./auth.api";
import { IGeneric } from "@/types/api/auth.types";

export const suggestionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSuggestions: builder.query<ISuggestionResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("auth_token");
                return {
                    url: `superadmin/suggestions/all?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetSuggestionsQuery } = suggestionApiSlice;

export const getSuggestions = async (data: IPagination) =>
    await apiCall<ISuggestionResponse>((baseApi) =>
        baseApi.get<ISuggestionResponse>(
            `superadmin/suggestions/all?limit=${data.limit}&page=${data.page}`
        )
    );

export const markAsRead = async (_id: string) =>
    await apiCall<IGeneric>((baseApi) =>
        baseApi.put<IGeneric>(`/superadmin/suggestion/markread/${_id}`)
    );

export const deleteSuggestion = async (_id: string) =>
    await apiCall<IGeneric>((baseApi) =>
        baseApi.delete<IGeneric>(`/superadmin/suggestion/del/${_id}`)
    );
