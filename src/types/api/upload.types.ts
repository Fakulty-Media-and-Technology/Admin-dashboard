import { IGeneric } from "./auth.types";

export interface IUploadImage extends IGeneric {
  data: IPhotoData;
}

export interface IPhotoData {
  Bucket: string;
  ContentType: string;
  Key: string;
}

export interface IFile {
  name: string;
  url: string;
  file?: File;
}

export interface ISubtitle {
  language: string;
  srtFile: {
    name: string;
    url: string;
  };
}
