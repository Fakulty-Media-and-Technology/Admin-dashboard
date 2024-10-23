import { SuperUserResponse, UserResponse } from "@/types/api/profile.types";
import { ApiResponse, create } from "apisauce";

export const createAuth = create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 12000,
  timeoutErrorMessage: "Request timed out",
});

export const createSuperAdminAuthWrapper = async () => {
  const token = localStorage.getItem("auth_token");
  return create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "superadmin-auth": token,
    },
  });
};

export const apiCall = async <T>(
  apiFunction: (baseApi: ReturnType<typeof create>) => Promise<ApiResponse<T>>
): Promise<ApiResponse<T>> => {
  const baseApi = await createSuperAdminAuthWrapper();
  return apiFunction(baseApi);
};

export const getSuperadminProfile = async (token: string) =>
  await createAuth.get<SuperUserResponse>(
    "/superadmin/dashboard/profile/fetch",
    {},
    {
      headers: {
        "superadmin-auth": token,
      },
    }
  );

export const getClientProfile = async (token: string) =>
  await createAuth.get<UserResponse>(
    "/clients/profile/fetch",
    {},
    {
      headers: {
        "clients-auth": token,
      },
    }
  );
