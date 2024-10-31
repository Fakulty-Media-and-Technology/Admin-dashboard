
import { IPagination } from "@/types/api/suggestion.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IGeneric } from "@/types/api/auth.types";
import { IAddPlans, IPlanSubsResponse, ISubscriptionResponse } from "@/types/api/sub.types";

export const subsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlanSubs: builder.query<IPlanSubsResponse, void>({
      query: (data) => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `/superadmin/subscription/plans/fetch`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),

    getSubscriptions: builder.query<ISubscriptionResponse, IPagination>({
      query: (data) => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `/superadmin/subscription/all/fetch?limit=${data.limit}&page=${data.page}`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),

  }),
});

export const { useGetPlanSubsQuery, useGetSubscriptionsQuery } = subsApiSlice;

export const getAllPlans = async () =>
  await apiCall<IPlanSubsResponse>((baseApi) =>
    baseApi.get<IPlanSubsResponse>(
      'superadmin/subscription/plans/fetch')
  );

export const getAllSubs = async (data: IPagination) =>
  await apiCall<ISubscriptionResponse>((baseApi) =>
    baseApi.get<ISubscriptionResponse>(
      `/superadmin/subscription/all/fetch?limit=${data.limit}&page=${data.page}`
    )
  );

export const addPlan = async (data: IAddPlans) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.post<IGeneric>(`/superadmin/subscription/plans/create`, data)
  );

export const updatePlan = async (data: IAddPlans, id: string) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.put<IGeneric>(`/superadmin/subscription/plans/update/${id}`, data)
  );


export const deletePlans = async (_id: string) => await apiCall<IGeneric>(baseApi => baseApi.delete(`/superadmin/subscription/plans/delete/${_id}`))