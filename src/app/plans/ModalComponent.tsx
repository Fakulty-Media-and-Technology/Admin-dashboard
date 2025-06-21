'use client'

import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import { roboto_500, roboto_700 } from "@/config/fonts";
import { formatAmount } from "@/utilities/formatAmount";
import getSymbolFromCurrency from "currency-symbol-map";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";


interface ModalProps {
    handleClose: () => void;
    price: number;
    eventHours: string;
     handleEstFunc: (value: string) => Promise<void>
     currency: string
     disabled: boolean
     paymentFunc: () => Promise<void>
}

export const ModalComponent = ({
    handleClose,
    eventHours,
    price,
    currency,
    handleEstFunc,
    paymentFunc,
    disabled
}: ModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    async function handleFunc(params:string){
        try {
            setLoading(true);
            await handleEstFunc(params)
        } catch (error) {
            toast(`${error}`, {type: 'error'})
        }finally{
            setLoading(false);
        }
    }

    async function handlePaymentFunc() {
        try {
            setLoading(true);
            await paymentFunc();
         } catch (error) {
            toast(`${error}`, {type: 'error'})
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="z-[9999px] w-full absolute overflow-hidden flex justify-center inset-0">
            <div className="h-[365px] md:h-[565px] lg:h-[665px] w-[80%] md:w-[519px] lg:w-[619px] mt-5 p-5 bg-[#3a3a39]">
                <div className="ml-auto w-fit" onClick={handleClose}>
                    <Image
                        src="/closeIcon.svg"
                        width={20}
                        height={20}
                        alt="close modal"
                    />
                </div>

                <div className="flex flex-col items-center mt-20">
                    <p
                        className={`${roboto_500.className} text-[50px] text-[#747474] text-center`}
                    >
                        EXTEND
                    </p>

                    <div className="mt-12 sm:max-w-[400px]">
                        <p
                            className={`${roboto_700.className} text-[50px] text-white text-center`}
                        >
                            {getSymbolFromCurrency(currency === 'Select' ? 'NGN' :currency)}{formatAmount(price.toString())}.00
                        </p>

                        <div className="flex items-center mt-8 gap-x-2 w-full mb-3">
                            <div className="flex-1">
                                <CustomInput
                                    required
                                    type="number"
                                    id="name"
                                    value={eventHours}
                                    className="font-normal text-center h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                                    onChange={(e) => handleFunc(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <CustomInput
                                    type="text"
                                    placeholder="Hours"
                                    id="name"
                                    className="font-normal text-center h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                                    readOnly
                                />
                            </div>
                        </div>


                        <div className=" mt-12">
                            <AppButton 
                            title="PAY" 
                            className="w-full text-[28px]" 
                            isLoading={loading}
                            disabled={disabled}
                            onClick={handlePaymentFunc}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};