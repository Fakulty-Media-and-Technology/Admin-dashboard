import { IGeneric } from "@/types/api/auth.types";
import { apiCall } from "./auth.api";

export const createContent = async (data: FormData, type: string) =>
  await apiCall<IGeneric>((baseApi) =>
    baseApi.post<IGeneric>(`/superadmin/uploads/video/add/${type}`, data)
  );
