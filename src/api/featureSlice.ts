import {
  IAddFeatured,
  IFeaturedContentResponse,
} from "@/types/api/featured.types";
import { apiSlice } from "./apiSlice";
import { apiCall, createAuth } from "./auth.api";

export const featuredApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchFeaturedContent: builder.mutation<IFeaturedContentResponse, string>({
      query: (data) => ({
        url: `/superadmin/featured/contents/search?text=${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchFeaturedContentMutation } = featuredApiSlice;

export const searchFeaturedContent = async (data: string) =>
  await apiCall((baseApi) =>
    baseApi.get<IFeaturedContentResponse>(
      `/superadmin/featured/contents/search?text=${data}`
    )
  );

export const addFeaturedContent = async (data: IAddFeatured) =>
  await apiCall((baseApi) =>
    baseApi.post("/superadmin/featured/contents/add", data)
  );
