
import { ICategoryResponse, ICastResponse, IAddCategory } from "@/types/api/category.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IGeneric } from "@/types/api/auth.types";
import { IPagination } from "@/types/api/suggestion.types";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<ICategoryResponse, IPagination|undefined>({
      query: (data) => {
        const authToken = localStorage.getItem("superadmin_token");
        return {
          url: `/superadmin/shared/get-categories?limit=${data ? data.limit : 100}&page=${data ? data.page:1}`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),

    getClientCategory: builder.query<ICategoryResponse, void>({
      query: (data) => {
        const authToken = localStorage.getItem("auth_token");
        return {
          url: `/clients/shared/get-categories?limit=100&page=1`,
          method: "GET",
          headers: {
            "clients-auth": `${authToken}`,
          },
        };
      },
    }),

    getGenre: builder.query<ICategoryResponse, IPagination|undefined>({
      query: (data) => {
        const authToken = localStorage.getItem("superadmin_token");
        return {
          url: `/superadmin/shared/get-genres?limit=${data ? data.limit : 100}&page=${data ? data.page:1}`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),


    getCast: builder.query<ICastResponse, IPagination|undefined>({
      query: (data) => {
        const authToken = localStorage.getItem("superadmin_token");
        return {
          url: `/superadmin/shared/get-casts?limit=${data ? data.limit : 100}&page=${data ? data.page:1}`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetCategoryQuery, useGetClientCategoryQuery, useGetGenreQuery, useGetCastQuery } = categoryApiSlice;

export const searchFetchCast = async (searchTerm:string) =>
  await apiCall<ICastResponse>((baseApi) =>
    baseApi.get<ICastResponse>(
      `superadmin/enums/search-casts/${searchTerm}?limit=100&page=1`
    )
  );
export const geetFetchCategories = async (data?:IPagination) =>
  await apiCall<ICategoryResponse>((baseApi) =>
    baseApi.get<ICategoryResponse>(
      `superadmin/shared/get-categories?limit=${!data ? 100 : data.limit }&page=${!data ? 1 :data.page}`
    )
  );

export const geetFetchGenres = async (data?:IPagination) =>
  await apiCall<ICategoryResponse>((baseApi) =>
    baseApi.get<ICategoryResponse>(
      `superadmin/shared/get-genres?limit=${!data ? 100 : data.limit }&page=${!data ? 1 :data.page}`
    )
  );

export const geetFetchCast = async (data?:IPagination) =>
  await apiCall<ICastResponse>((baseApi) =>
    baseApi.get<ICastResponse>(
      `superadmin/shared/get-casts?limit=${!data ? 100 : data.limit }&page=${!data ? 1 :data.page}`
    )
  );

export const addCategoryEnums = async (data: IAddCategory|FormData, path: string) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.post<IGeneric>(`/superadmin/enums/add-${path}`, data , {...(path === 'cast' && {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })})
  );

export const editCategoryEnums = async (data: IAddCategory|FormData, path: string, catID:string) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.put<IGeneric>(`/superadmin/enums/${path === 'cast' ? 'edit-cast' : `update-${path}`}/${catID}`, data, {...(path === 'cast' && {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })})
  );


export const deleteCategoryEnums = async (_id: string, path: string) => await apiCall<IGeneric>(baseApi => baseApi.delete(`/superadmin/enums/rem-${path}/${_id}`))