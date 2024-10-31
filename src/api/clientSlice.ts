
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IPagination } from "@/types/api/suggestion.types";
import { IClientsResponse } from "@/types/api/clients.types";

export const clientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query<IClientsResponse, IPagination>({
            query: (data) => {
                const authToken = localStorage.getItem("auth_token");
                return {
                    url: `/superadmin/clients/allfetch?limit=${data.limit}&page=${data.page}`,
                    method: "GET",
                    headers: {
                        "superadmin-auth": `${authToken}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetAllClientsQuery } = clientsApiSlice;

export const getAllClients = async (data: IPagination) =>
    await apiCall<IClientsResponse>((baseApi) =>
        baseApi.get<IClientsResponse>(
            `/superadmin/clients/allfetch?limit=${data.limit}&page=${data.page}`
        )
    );


// export const addCategoryEnums = async (data: IAddCategory, path: string) =>
//   await apiCall<IGeneric>((baseApi) =>
//     baseApi.post<IGeneric>(`/superadmin/enums/add-${path}`, data)
//   );


