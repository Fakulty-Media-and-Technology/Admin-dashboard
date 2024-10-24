
  import { ICategoryResponse, ICastResponse, IAddCategory } from "@/types/api/category.types";
import { apiSlice } from "./apiSlice";
  import { apiCall } from "./auth.api";
  import { IUpcomingQuery, IUpcomingResponse } from "@/types/api/upcoming.types";
import { IGeneric } from "@/types/api/auth.types";
  
  export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getCategory: builder.query<ICategoryResponse, void>({
        query: (data) => {
          const authToken = localStorage.getItem("auth_token");
          return {
            url: `superadmin/enums/get-categories`,
            method: "GET",
            headers: {
              "superadmin-auth": `${authToken}`,
            },
          };
        },
      }),

      getGenre: builder.query<ICategoryResponse, void>({
        query: (data) => {
          const authToken = localStorage.getItem("auth_token");
          return {
            url: `superadmin/enums/get-genres`,
            method: "GET",
            headers: {
              "superadmin-auth": `${authToken}`,
            },
          };
        },
      }),


      getCast: builder.query<ICastResponse, void>({
        query: (data) => {
          const authToken = localStorage.getItem("auth_token");
          return {
            url: `superadmin/enums/get-cast`,
            method: "GET",
            headers: {
              "superadmin-auth": `${authToken}`,
            },
          };
        },
      }),
    }),
  });
  
  export const { useGetCategoryQuery, useGetGenreQuery, useGetCastQuery } = categoryApiSlice;
  
  export const geetFetchCategories = async () =>
    await apiCall<ICategoryResponse>((baseApi) =>
      baseApi.get<ICategoryResponse>(
        `superadmin/enums/get-categories`
      )
    );

  export const geetFetchGenres = async () =>
    await apiCall<ICategoryResponse>((baseApi) =>
      baseApi.get<ICategoryResponse>(
        `superadmin/enums/get-genres`
      )
    );
  
  export const geetFetchCast = async () =>
    await apiCall<ICastResponse>((baseApi) =>
      baseApi.get<ICastResponse>(
        `superadmin/enums/get-cast`
      )
    );
  
  export const addCategoryEnums = async (data: IAddCategory, path:string) =>
    await apiCall<IGeneric>((baseApi) =>
      baseApi.post<IGeneric>(`/superadmin/enums/add-${path}`, data)
    );
  

export const deleteCategoryEnums = async (_id:string, path:string) => await apiCall<IGeneric>(baseApi => baseApi.delete(`/superadmin/enums/rem-${path}/${_id}`))