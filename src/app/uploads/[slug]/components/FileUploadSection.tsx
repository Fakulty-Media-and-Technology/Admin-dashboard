"use client";

import React, { useState } from "react";
import { uploadImage } from "@/api/upload";
import { IUploadImage } from "@/types/api/upload.types";
import { ApiResponse } from "apisauce";
import { IGeneric } from "@/types/api/auth.types";
import { toast } from "react-toastify";

export interface FileUploadSectionProps {
  label: string; // Added label
  accept: string; // Added accept for file types
  fieldName: string; // Added fieldName for FormData key
  type: string; // type for fileHandle
  onUploadComplete: (url: string) => void; // Explicitly typed url
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  label,
  accept,
  fieldName,
  type,
  onUploadComplete,
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      toast("Authentication token not found", { type: "error" });
      return;
    }

    const file = files[0];
    setFileName(file.name);

    const data = new FormData();
    data.append("fileName", file.name);
    data.append("fileHandle", type);
    data.append(fieldName, file);

    try {
      setUploading(true);

      const res: ApiResponse<IUploadImage, IGeneric> = await uploadImage(data, authToken);

      if (res.ok && res.data) {
        const url = `https://${res.data.data.Bucket}.s3.amazonaws.com/${res.data.data.Key}`;
        toast(`${label} uploaded successfully!`, { type: "success" });
        onUploadComplete(url); // ✅ Explicitly typed
      } else {
        let errorMessage = "Failed to upload file";
        if (res.data && (res.data as any).message) {
          errorMessage = (res.data as any).message;
        } else if (res.problem) {
          errorMessage = `Upload failed: ${res.problem}`;
        }
        toast(errorMessage, { type: "error" });
      }
    } catch (err) {
      toast(`${label} upload error.`, { type: "error" });
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <div className="flex items-center gap-x-4">
        <div className="relative">
          <input
            type="file"
            accept={accept}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <label
            className={`cursor-pointer px-4 py-2 rounded-md ${
              uploading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            } text-white font-medium`}
          >
            {uploading ? "Uploading..." : "Choose File"}
          </label>
        </div>
        <span className="text-sm text-gray-500">
          {uploading ? "Uploading..." : fileName || "No file chosen"}
        </span>
      </div>
    </div>
  );
};

export default FileUploadSection;
