import { LoginRequest, LoginResponse } from "@/types/api/auth.types";
import { apiSlice } from "./apiSlice";
import { SUCESS_CODES } from "@/screens/Login";
import { SuperUserResponse, UserResponse } from "@/types/api/profile.types";
import {
  IEventEstimate,
  IEventEstimateResponse,
} from "@/types/api/extrax.types";

const CLIENT_URL = "clients";
const SUPERADMIN_URL = "superadmin";

export const extraxApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    eventEstimate: builder.mutation<IEventEstimateResponse, IEventEstimate>({
      query: (data) => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `/clients/event/payment/estimate?start=${data.start}&expiry=${data.end}&currency=${data.currency}`,
          method: "GET",
          headers: {
            "clients-auth": `${authToken}`,
          },
        };
      },
    }),
  }),
});

export const { useEventEstimateMutation } = extraxApiSlice;
