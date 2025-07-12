
import { IPagination } from "@/types/api/suggestion.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IGiftCardResponse } from "@/types/api/giftCard.types";

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

export const getGiftCards = async (data: IPagination) => {
  const authToken = localStorage.getItem("auth_token");

  return await apiCall<IGiftCardResponse>((baseApi) =>
    baseApi.get<IGiftCardResponse>(
      `superadmin/giftcard/generated/fetch?limit=${data.limit}&page=${data.page}`,
      {
        headers: {
          "superadmin-auth": `${authToken}`,
        },
      }
    )
  );
};

export const activateGiftCard = async (data: FormData) => {
    const authToken = localStorage.getItem("auth_token");
  return await apiCall<IGiftCardResponse>((baseApi) =>
    baseApi.put<IGiftCardResponse>(
      `/superadmin/giftcard/activate/${data.get("giftCode")}/${data.get("adminToken")}`, 
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "superadmin-auth": `${authToken}`,
        }
      }
    )
  )};
