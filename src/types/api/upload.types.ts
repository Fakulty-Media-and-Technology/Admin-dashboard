import { IGeneric } from "./auth.types";

export interface IUploadImage extends IGeneric {
  data: IPhotoData;
}

export interface IPhotoData {
  Bucket: string;
  ContentType: string;
  Key: string;
}
