import {
  IAddFeatured,
  IFeaturedContentResponse,
} from "@/types/api/featured.types";
import { apiSlice } from "./apiSlice";
import { apiCall, createAuth } from "./auth.api";
import { IEditUserRP, IUsersResponse } from "@/types/api/users.types";
import { IGeneric } from "@/types/api/auth.types";

export const userRPApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUsersResponse, void>({
      query: () => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `superadmin/user/fetch`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetUsersQuery } = userRPApiSlice;

export const deleteUsers = async (data: string) =>
  await apiCall((baseApi) =>
    baseApi.delete<IGeneric>(`/superadmin/user/deleteUser/${data}`)
  );

export const updateUsers = async (data: IEditUserRP, _id: string) =>
  await apiCall((baseApi) =>
    baseApi.patch(`/superadmin/user/update/${_id}`, data)
  );

export const getAllUsers = async () =>
  await apiCall<IUsersResponse>((baseApi) =>
    baseApi.get<IUsersResponse>(`/superadmin/user/fetch`)
  );

export const usersbyID = async (_id: string) =>
  await apiCall<IUsersResponse>((baseApi) =>
    baseApi.get<IUsersResponse>(`/superadmin/user/fetch/${_id}`)
  );
