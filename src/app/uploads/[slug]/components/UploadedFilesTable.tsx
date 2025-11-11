"use client";

import React, { Suspense } from "react";
import { IMediaData } from "@/types/api/media.types";
import { roboto_400, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { isExpired } from "@/utilities/dateUtilities";
import { deleteContent } from "@/api/contentSlice"; // ✅ (1) IMPORT deleteContent API
import { toast } from "react-toastify"; // ✅ optional toast notification

interface UploadedFilesTableProps {
  files: IMediaData[];
  onEdit: (file: IMediaData) => void;
  onDeleteSuccess?: (id: string) => void; // ✅ (2) optional callback to refresh after delete
}

const UploadedFilesTable: React.FC<UploadedFilesTableProps> = ({
  files,
  onEdit,
  onDeleteSuccess,
}) => {

  // ✅ (3) Implemented handleDelete here
  const handleDelete = async (id: string, type: string) => {
    try {
      const res = await deleteContent({ id, slug: type });

      if (res.ok) {
        toast.success("Deleted successfully ✅");
        console.log("Deleted successfully");
        if (onDeleteSuccess) onDeleteSuccess(id); // optional: refresh UI or remove item
      } else {
        console.error("Delete failed", res.problem);
        toast.error("Failed to delete content ❌");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="relative w-full h-full py-5 pb-6 pl-0 sm:ml-0 sm:pl-3 md:pl-10 overflow-x-auto">
      <div className="relative h-full">
        <table className={`${roboto_400.className} w-full min-w-[810px]`}>
          <thead className="h-[50px]">
            <tr>
              <th className={`${roboto_500.className} font-medium text-lg text-white uppercase`}>
                Title
              </th>
              <th className={`${roboto_500.className} font-medium text-lg text-white uppercase`}>
                Rating
              </th>
              <th className={`${roboto_500.className} font-medium text-lg text-white uppercase`}>
                Class
              </th>
              <th className={`${roboto_500.className} font-medium text-lg text-white uppercase`}>
                Year
              </th>
              <th className={`${roboto_500.className} font-medium text-lg text-white uppercase`}>
                Status
              </th>
              <th className={`${roboto_500.className} font-medium text-lg text-white uppercase`}>
                Options
              </th>
            </tr>
          </thead>

          <tbody>
            {files.map((file, index) => (
              <tr key={index} className="text-white h-[110px]">
                <td className="whitespace-nowrap text-white py-2 pr-4 w-[30px]">
                  <div className="flex items-center pl-2 py-1 pr-1 border-none rounded w-fit min-w-[140px]">
                    <Image
                      src={file.portraitPhoto}
                      width={42}
                      height={42}
                      alt="profiles"
                      className="object-cover h-[42px] rounded-full"
                    />
                    <div className="ml-2.5">
                      <p className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}>
                        {file.title}
                      </p>
                      <div className="flex items-center -mt-[2px]">
                        <Image src="/views.svg" width={12.5} height={10} alt="views" />
                        <p className={`${roboto_400.className} font-normal text-[13px] text-grey_800 ml-1.5`}>
                          {file.viewsCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-center font-normal text-xs capitalize">
                  {file.defaultRating}
                </td>

                <td className="text-center font-normal text-xs capitalize">
                  {file.vidClass}
                </td>

                <td className="text-center font-normal text-xs capitalize">
                  {new Date(file.releaseDate).getFullYear()}
                </td>

                <td className="text-center font-normal text-xs capitalize">
                  {!isExpired(file.expiryDate) ? "Active" : "Inactive"}
                </td>

                <td className="w-[50px] xl:w-[400px]">
                  <div className="flex items-center justify-center gap-x-10">
                    <button onClick={() => onEdit(file)}>
                      <Image src="/edit.svg" width={14} height={14} alt="edit" />
                    </button>

                    {/* ✅ (4) Modified delete button to pass correct file type */}
                    <button onClick={() => handleDelete(file._id, file.is_series ? "series" : "movie")}>
                      <Image src="/delete.svg" width={15} height={18} alt="delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Export the component with Suspense wrapper
const LazyUploadedFilesTable = (props: UploadedFilesTableProps) => (
  <Suspense fallback={<div>Loading table...</div>}>
    <UploadedFilesTable {...props} />
  </Suspense>
);

export default LazyUploadedFilesTable;
