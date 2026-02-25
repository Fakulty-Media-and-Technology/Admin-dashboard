
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IPagination } from "@/types/api/suggestion.types";
import { IClientCreate, IClientsDepositResponse, IClientsResponse } from "@/types/api/clients.types";
import { IGeneric } from "@/types/api/auth.types";

export const clientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query<IClientsResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("superadmin_token");
                return {
                    url: `/superadmin/clients/allfetch?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),

        getClientsDeposit: builder.query<IClientsDepositResponse, void>({
            query: (data) => {
                const authToken = localStorage.getItem("superadmin_token");
                return {
                    url: `/superadmin/clients/deposits`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetClientsDepositQuery, useGetAllClientsQuery } = clientsApiSlice;

export const getAllClients = async (data: IPagination) =>
    await apiCall<IClientsResponse>((baseApi) =>
        baseApi.get<IClientsResponse>(
            `/superadmin/clients/allfetch?limit=${data.limit}&page=${data.page}`
        )
    );


export const createCLientAcc = async (data: FormData) =>
    await apiCall<IGeneric>((baseApi) =>
        baseApi.post<IGeneric>(`/superadmin/create-clients`, data, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
    );

export const editCLientAcc = async (data: FormData, uId:string) =>
    await apiCall<IGeneric>((baseApi) =>
        baseApi.put<IGeneric>(`/clients/user-profile/shared/update/${uId}`, data, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
    );

export const searchClient = async (data: { value: string }) =>
    await apiCall<IClientsResponse>(baseApi => baseApi.get<IClientsResponse>(`/superadmin/lives/search-clients?search=${data.value}&page=1&limit=9999999999`))


