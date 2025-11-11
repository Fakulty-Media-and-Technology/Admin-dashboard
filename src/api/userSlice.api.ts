import { apiSlice } from "./apiSlice";
import { SUCCESS_CODES } from "@/screens/Login";
import {
  LoginRequest,
  LoginResponse,
} from "@/types/api/auth.types";
import { IEditUser } from "@/types/api/profile.types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/superadmin/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (SUCCESS_CODES.includes(data.status)) {
            localStorage.setItem("auth_token", data.data.token); // Save token in localStorage
            dispatch(
              userApiSlice.util.updateQueryData(
                "getUserProfile",
                undefined,
                (draft) => {
                  Object.assign(draft, data);
                }
              )
            );
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    getUserProfile: builder.query<any, void>({
      query: () => {
        const token = localStorage.getItem("auth_token");
        return {
          url: "/superadmin/dashboard/profile/fetch",
          method: "GET",
          headers: {
            "superadmin-auth": token || "",
          },
        };
      },
    }),
    getSuperAdminProfile: builder.query<any, void>({
      query: () => {
        const token = localStorage.getItem("auth_token");
        return {
          url: "/superadmin/dashboard/profile/fetch",
          method: "GET",
          headers: {
            "superadmin-auth": token || "",
          },
        };
      },
    }),
    editProfile: builder.mutation<any, IEditUser>({
      query: (data) => {
        const token = localStorage.getItem("auth_token");
        return {
          url: "/superadmin/dashboard/profile/edit",
          method: "PATCH",
          headers: {
            "superadmin-auth": token || "",
          },
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useGetSuperAdminProfileQuery,
  useEditProfileMutation,
} = userApiSlice;
