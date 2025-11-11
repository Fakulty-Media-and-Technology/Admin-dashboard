import { apiSlice } from "./apiSlice";
import { SUCCESS_CODES } from "@/screens/Login";
import { SuperUserResponse, UserResponse } from "@/types/api/profile.types";

// Define the type for the estimate request
interface EventEstimateRequest {
  start: string;
  end: string;
  currency: string;
}

// Define the type for the estimate response
interface EventEstimateResponse {
  estimated_cost: number;
}

export const extraApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    eventEstimate: builder.mutation<{ data: EventEstimateResponse }, EventEstimateRequest>({
      query: (data) => ({
        url: "/superadmin/dashboard/estimate",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useEventEstimateMutation,
} = extraApiSlice;
