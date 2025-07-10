import { IPaymentData, IPaymentResponse } from "@/types/api/payment.types";
import { apiCall } from "./auth.api";


export const initiatePayment = async (data: IPaymentData) =>
    await apiCall<IPaymentResponse>((baseApi) =>
        baseApi.post<IPaymentResponse>(`/clients/shared/initiate-payment`, data),
        true
    );