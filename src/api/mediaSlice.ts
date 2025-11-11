
import { IPagination } from "@/types/api/suggestion.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";
import { IGeneric } from "@/types/api/auth.types";
import { IMediaResponse } from "@/types/api/media.types";

/**
 * ✅ CHANGES (where):
 *  - Added providesTags for GET queries (so RTK can refetch lists when mutations invalidate).
 *  - Added add* mutations (addMovie/addSkit/addMusicVideo/addSeries) for uploads (they invalidate the list tag).
 *  - Corrected fetch helper paths (getFetch*).
 */

export const mediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovie: builder.query<IMediaResponse, IPagination>({
      query: (data) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/fetch/movie?page=${data.page}&limit=${data.limit}&withMediaSources=true`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((r) => ({ type: "Media" as const, id: r._id })),
              { type: "Media" as const, id: "LIST_MOVIES" },
            ]
          : [{ type: "Media" as const, id: "LIST_MOVIES" }],
    }),

    getAllSkits: builder.query<IMediaResponse, IPagination>({
      query: (data) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/fetch/skit?page=${data.page}&limit=${data.limit}&withMediaSources=true`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map((r) => ({ type: "Media" as const, id: r._id })), { type: "Media" as const, id: "LIST_SKITS" }]
          : [{ type: "Media" as const, id: "LIST_SKITS" }],
    }),

    getAllMusic: builder.query<IMediaResponse, IPagination>({
      query: (data) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/fetch/music-video?page=${data.page}&limit=${data.limit}&withMediaSources=true`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map((r) => ({ type: "Media" as const, id: r._id })), { type: "Media" as const, id: "LIST_MUSIC" }]
          : [{ type: "Media" as const, id: "LIST_MUSIC" }],
    }),

    getAllSeries: builder.query<IMediaResponse, IPagination>({
      query: (data) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/fetch/series?page=${data.page}&limit=${data.limit}&withMediaSources=true`,
          method: "GET",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map((r) => ({ type: "Media" as const, id: r._id })), { type: "Media" as const, id: "LIST_SERIES" }]
          : [{ type: "Media" as const, id: "LIST_SERIES" }],
    }),

    // mutations for adding media (invalidate corresponding list tag)
    addMovie: builder.mutation<IGeneric, FormData>({
      query: (form) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/video/add/movie`,
          method: "POST",
          body: form,
          headers: {
            "superadmin-auth": `${authToken}`,
            // do NOT set Content-Type for FormData here (browser will set it)
          },
        };
      },
      invalidatesTags: [{ type: "Media", id: "LIST_MOVIES" }],
    }),

    addSkit: builder.mutation<IGeneric, FormData>({
      query: (form) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/video/add/skit`,
          method: "POST",
          body: form,
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      invalidatesTags: [{ type: "Media", id: "LIST_SKITS" }],
    }),

    addMusicVideo: builder.mutation<IGeneric, FormData>({
      query: (form) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/video/add/music-video`,
          method: "POST",
          body: form,
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      invalidatesTags: [{ type: "Media", id: "LIST_MUSIC" }],
    }),

    addSeries: builder.mutation<IGeneric, FormData>({
      query: (form) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/video/add/series`,
          method: "POST",
          body: form,
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      invalidatesTags: [{ type: "Media", id: "LIST_SERIES" }],
    }),

    // delete and edit also included previously — keep as needed (not used in upload UI)
    deleteMedia: builder.mutation<IGeneric, { id: string; type: string }>({
      query: ({ id, type }) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/remove/${id}/${type}`,
          method: "DELETE",
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: "Media", id: `LIST_${arg.type.toUpperCase()}` }],
    }),

    editMovie: builder.mutation<IGeneric, { id: string; form: FormData }>({
      query: ({ id, form }) => {
        const authToken =
          typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
        return {
          url: `/superadmin/uploads/movie/edit/${id}`,
          method: "PUT",
          body: form,
          headers: {
            "superadmin-auth": `${authToken}`,
          },
        };
      },
      invalidatesTags: [{ type: "Media", id: "LIST_MOVIES" }],
    }),
  }),
});

// exported hooks
export const {
  useGetAllMovieQuery,
  useGetAllSkitsQuery,
  useGetAllMusicQuery,
  useGetAllSeriesQuery,
  useAddMovieMutation,
  useAddSkitMutation,
  useAddMusicVideoMutation,
  useAddSeriesMutation,
  useDeleteMediaMutation,
  useEditMovieMutation,
} = mediaApiSlice;

/**
 * Helper helpers for non-RTK usages (kept for any existing code).
 * ✅ Note: paths include &withMediaSources=true to match GET pattern used.
 */
export const getFetchMovies = async (data: IPagination) =>
  await apiCall<IMediaResponse>((baseApi) =>
    baseApi.get<IMediaResponse>(`/superadmin/uploads/fetch/movie?page=${data.page}&limit=${data.limit}&withMediaSources=true`)
  );

export const getFetchSkit = async (data: IPagination) =>
  await apiCall<IMediaResponse>((baseApi) =>
    baseApi.get<IMediaResponse>(`/superadmin/uploads/fetch/skit?page=${data.page}&limit=${data.limit}&withMediaSources=true`)
  );

export const getFetchMusicVideo = async (data: IPagination) =>
  await apiCall<IMediaResponse>((baseApi) =>
    baseApi.get<IMediaResponse>(`/superadmin/uploads/fetch/music-video?page=${data.page}&limit=${data.limit}&withMediaSources=true`)
  );

export const getFetchSeries = async (data: IPagination) =>
  await apiCall<IMediaResponse>((baseApi) =>
    baseApi.get<IMediaResponse>(`/superadmin/uploads/fetch/series?page=${data.page}&limit=${data.limit}&withMediaSources=true`)
  );
