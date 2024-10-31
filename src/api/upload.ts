import { IUploadImage } from "@/types/api/upload.types";
import { apiCall } from "./auth.api";

export const uploadImage = async (data: FormData, token: string) =>
  await apiCall<IUploadImage>(baseApi => baseApi.post<IUploadImage>(
    `/superadmin/media/upload-image`,
    data
  )
  );
