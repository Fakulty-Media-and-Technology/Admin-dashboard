
import { IPagination } from "@/types/api/suggestion.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { ICreateGiftCardResponse, IGiftCardResponse } from "@/types/api/giftCard.types";
import { IGeneric } from "@/types/api/auth.types";

export const giftCardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGiftCards: builder.query<IGiftCardResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("auth_token");
                return {
                    url: `superadmin/giftcard/generated/fetch?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetGiftCardsQuery } = giftCardApiSlice;

export const getGiftCards = async (data: IPagination) =>
  await apiCall<IGiftCardResponse>((baseApi) =>
    baseApi.get<IGiftCardResponse>(
      `superadmin/giftcard/generated/fetch?limit=${data.limit}&page=${data.page}`
    )
  );

export const createGiftCard = async (data: {amount:string, currency:string}) =>
  await apiCall<ICreateGiftCardResponse>((baseApi) =>
    baseApi.post<ICreateGiftCardResponse>(
      `/superadmin/giftcard/generate/new`, 
      data,
    )
  );

export const activateGiftCard = async (data: {code:string, adminToken:string}) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.put<IGeneric>(
      `/superadmin/giftcard/activate/${data.code}/${data.adminToken}`, 
      data,
    )
  );
