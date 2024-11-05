'use client'

import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import { roboto_500, roboto_700 } from "@/config/fonts";
import { formatAmount } from "@/utilities/formatAmount";
import Image from "next/image";
import { useState } from "react";


interface ModalProps {
    handleClose: () => void;
    price: number;
    eventHours: string;
}

export const ModalComponent = ({
    handleClose,
    eventHours,
    price,
}: ModalProps) => {
    const [selectedPaymentMethod, setPaymentMethod] = useState<string>(
        "Select payment method"
    );

    return (
        <div className="z-[9999px] w-full absolute overflow-hidden flex justify-center inset-0">
            <div className="h-[365px] md:h-[565px] lg:h-[665px] w-[80%] md:w-[519px] lg:w-[619px] mt-32 p-5 bg-[#3a3a39]">
                <div className="ml-auto w-fit" onClick={handleClose}>
                    <Image
                        src="/closeIcon.svg"
                        width={20}
                        height={20}
                        alt="close modal"
                    />
                </div>

                <div className="flex flex-col items-center mt-10">
                    <p
                        className={`${roboto_500.className} text-[50px] text-[#747474] text-center`}
                    >
                        CREATE
                    </p>

                    <div className="mt-12 sm:max-w-[400px]">
                        <p
                            className={`${roboto_700.className} text-[50px] text-white text-center`}
                        >
                            ₦{formatAmount(price.toString())}.00
                        </p>

                        <div className="flex items-center mt-8 gap-x-2 w-full mb-3">
                            <div className="flex-1">
                                <CustomInput
                                    required
                                    type="text"
                                    id="name"
                                    readOnly
                                    value={eventHours}
                                    className="font-normal text-center h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                                />
                            </div>
                            <div className="flex-1">
                                <CustomInput
                                    required
                                    type="text"
                                    placeholder="Hours"
                                    id="name"
                                    className="font-normal text-center h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                                />
                            </div>
                        </div>

                        <div className="flex-1 mt-5">
                            <SelectInputForm
                                placeholder={selectedPaymentMethod}
                                setType={setPaymentMethod}
                                selectData={["Month", "Year"]}
                                className="font-normal h-[40px] text-sm py-2 border border-border_grey rounded-sm"
                                textStyles="text-grey_500"
                            />
                        </div>

                        <div className=" mt-8">
                            <AppButton title="PAY" className="w-full text-[28px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};