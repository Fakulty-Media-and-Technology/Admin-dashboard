import { IPaymentData, IPaymentResponse } from "@/types/api/payment.types";
import { apiSlice } from "./apiSlice";
import { apiCall } from "./auth.api";


export const initiatePayment = async (data: IPaymentData) =>
    await apiCall<IPaymentResponse>((baseApi) =>
        baseApi.post<IPaymentResponse>(`/clients/initiate-payment`, data),
        true
    );