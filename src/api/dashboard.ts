import { LoginRequest, LoginResponse } from "@/types/api/auth.types";
import { apiSlice } from "./apiSlice";
import { SUCESS_CODES } from "@/screens/Login";
import { SuperUserResponse, UserResponse } from "@/types/api/profile.types";
import {
  IDashboardTOTAL_Contents,
  IDashboardTOTAL_Users,
} from "@/types/api/dashboard.types";

const SUPERADMIN_URL = "superadmin";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardContentList: builder.query<IDashboardTOTAL_Contents, void>({
      query: () => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `${SUPERADMIN_URL}/dashboard/totcontentsandchunks`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),

    getDashboardTotalUser: builder.query<IDashboardTOTAL_Users, void>({
      query: () => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `${SUPERADMIN_URL}/dashboard/fetchbalanceandusers`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetDashboardContentListQuery,
  useGetDashboardTotalUserQuery,
} = dashboardApiSlice;
