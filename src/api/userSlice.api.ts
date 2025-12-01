import { IGeneric, LoginRequest, LoginResponse } from "@/types/api/auth.types";
import { apiSlice } from "./apiSlice";
import { SUCESS_CODES } from "@/screens/Login";
import {
  IEditUser,
  SuperUserResponse,
  UserResponse,
} from "@/types/api/profile.types";

const CLIENT_URL = "clients";
const SUPERADMIN_URL = "superadmin";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `/superadmin/auth/login`,
        method: "POST",
        body: data,
      }),
      // Save the token to localStorage after successful login
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status === SUCESS_CODES) {
            localStorage.setItem("auth_token", data.data.token); // Save token in localStorage
            console.log("Token saved");
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    getUserProfile: builder.query<UserResponse, void>({
      query: () => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `${CLIENT_URL}/profile/fetch`,
          method: "GET",
          headers: {
            "clients-auth": `${authToken}`,
          },
        };
      },
    }),

    getSuperAdminProfile: builder.query<SuperUserResponse, void>({
      query: () => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `${SUPERADMIN_URL}/dashboard/profile/fetch`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),

    editProfile: builder.mutation<IGeneric, IEditUser>({
      query: (data) => ({
        url: `/superadmin/dashboard/profile/edit`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useGetSuperAdminProfileQuery,
  useEditProfileMutation,
} = userApiSlice;
