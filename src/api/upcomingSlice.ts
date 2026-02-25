
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IUpcomingQuery, IUpcomingResponse } from "@/types/api/upcoming.types";

export const upcomingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpcoming: builder.query<IUpcomingResponse, IUpcomingQuery>({
      query: (data) => {
        const authToken = localStorage.getItem("superadmin_token");
        return {
          url: `superadmin/upcoming/event/getall?limit=${data.limit}&page=${data.page}`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetUpcomingQuery } = upcomingApiSlice;

export const getUpcomingEvent = async (data: IUpcomingQuery) =>
  await apiCall<IUpcomingResponse>((baseApi) =>
    baseApi.get<IUpcomingResponse>(
      `superadmin/upcoming/event/getall?limit=${data.limit}&page=${data.page}`
    )
  );

// export const usersbyID = async (_id: string) =>
//   await apiCall<IUsersResponse>((baseApi) =>
//     baseApi.get<IUsersResponse>(`/superadmin/user/fetch/${_id}`)
//   );
