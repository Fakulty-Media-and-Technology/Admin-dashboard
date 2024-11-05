'use client';

import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import { useState } from "react";

const countryLists = ["Nigeria Naira"];

export const ClientsComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectCountry, setCountry] = useState<string>("Select currency");

    return (
        <div
            className={`w-full sm:w-[350px] px-4 sm:px-0 mx-auto flex flex-col items-center justify-center mt-20 mb-10`}
        >
            <div className="w-full mt-20 space-y-4">
                <SelectInputForm
                    placeholder={selectCountry}
                    setType={setCountry}
                    selectData={countryLists}
                    className="font-normal text-sm py-2 pb-[9px] border border-border_grey rounded-sm"
                    textStyles="text-grey_500 text-center"
                />

                <CustomInput
                    required
                    type="text"
                    placeholder="₦ NGN"
                    disabled
                    className="font-normal h-[42px] outline-none bg-transparent text-center text-sm py-2 flex-1 border border-border_grey rounded-sm"
                />
            </div>

            <AppButton
                isLoading={isLoading}
                // disabled={}
                title="SAVE"
                className="w-full mt-5 text-2xl py-4"
            // onClick={submitHandler}
            />
        </div>
    );
};