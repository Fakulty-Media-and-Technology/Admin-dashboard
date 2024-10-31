
import { IPagination } from "@/types/api/suggestion.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IGiftCardResponse } from "@/types/api/giftCard.types";
import { IAdsResponse } from "@/types/api/ads.types";
import { IGeneric } from "@/types/api/auth.types";

export const adsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getADs: builder.query<IAdsResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("auth_token");
                return {
                    url: `superadmin/ads/fetchall?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetADsQuery } = adsApiSlice;

export const getAllAds = async (data: IPagination) =>
    await apiCall<IAdsResponse>((baseApi) =>
        baseApi.get<IAdsResponse>(
            `superadmin/ads/fetchall?limit=${data.limit}&page=${data.page}`
        )
    );

export const deleteAds = async (_id: string) =>
    await apiCall<IGeneric>((baseApi) =>
        baseApi.get<IGeneric>(
            `superadmin/ads/remove/${_id}`
        )
    );
