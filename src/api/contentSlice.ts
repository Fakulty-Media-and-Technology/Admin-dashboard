import { IGeneric } from "@/types/api/auth.types";
import { apiCall } from "./auth.api";
import { ISeasonResponse } from "@/types/api/content.type";

export const createContent = async (data: FormData, type: string) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.post<IGeneric>(`/superadmin/uploads/video/add/${type}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );

export const editContent = async (data: FormData, id: string) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.put<IGeneric>(`/superadmin/uploads/edit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );

export const addSeason = async (data: FormData, seriesId: string) =>
  await apiCall<ISeasonResponse>((baseApi) =>
    baseApi.post<ISeasonResponse>(`/superadmin/uploads/seasons/add/${seriesId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );

export const addSubtitle = async (data: FormData) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.post<IGeneric>(`/superadmin/media/add-subtitle`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );

export const addEpisodes = async (data: FormData, seasonId: string) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.post<IGeneric>(`/superadmin/uploads/episodes/add/${seasonId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );

export const deleteContent = async (data: { id: string, slug: string }) =>
  await apiCall<IGeneric>(baseApi => baseApi.delete<IGeneric>(`/superadmin/uploads/remove/${data.id}/${data.slug}`))

export const getSeasons = async (data: { id: string }) =>
  await apiCall<ISeasonResponse>(baseApi => baseApi.get<ISeasonResponse>(`/superadmin/uploads/seasons/fetch/${data.id}`))
