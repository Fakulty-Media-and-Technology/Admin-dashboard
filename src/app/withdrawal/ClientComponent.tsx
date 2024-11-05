'use client'

import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import { roboto_400, roboto_500, roboto_700 } from "@/config/fonts";
import { useState } from "react";


const paymentMethods = ["Visa/mastercard", "Paypal", "Crypto", "Bank Transfer"];

export const ClientsComponent = () => {
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sub, setSub] = useState<string>("Month");
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [selectPaymentMethod, setPaymentMethod] = useState<string>(
        "Select payment method"
    );

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            setImage(URL.createObjectURL(files[0]));
        }
    }

    console.log(image);

    return (
        <div
            className={`${isOnline ? "w-full sm:w-[300px]" : "w-full sm:w-[350px]"
                } mx-auto flex flex-col items-center pr-4 sm:pr-0 justify-center mt-20 mb-10`}
        >
            <div className="flex items-center justify-center">
                <div
                    onClick={() => setIsOnline(!isOnline)}
                    style={{ backgroundColor: isOnline ? "#0096D6C9" : "#212121" }}
                    className="py-3 px-4 cursor-pointer"
                >
                    <span
                        className={`${roboto_500.className} text-[17px] text-white text-center`}
                    >
                        Bank
                    </span>
                </div>
                <div
                    onClick={() => setIsOnline(!isOnline)}
                    style={{ backgroundColor: !isOnline ? "#0096D6C9" : "#212121" }}
                    className="py-3 px-4 cursor-pointer"
                >
                    <span
                        className={`${roboto_500.className} text-[17px] text-white text-center`}
                    >
                        Offline
                    </span>
                </div>
            </div>

            <p
                className={`${roboto_500.className} mt-16 text-lg text-center text-white`}
            >
                WALLET BALANCE
            </p>
            <p
                className={`${roboto_700} text-xl md:text-3xl lg:text-5xl text-center text-white mt-2`}
            >
                ₦0.00
            </p>

            <div className="flex items-center flex-col mt-8 w-full">
                {isOnline ? (
                    <>
                        <div className="w-full">
                            <SelectInputForm
                                placeholder={sub}
                                setType={setSub}
                                selectData={["Month", "Year"]}
                                className="font-normal h-[40px] text-sm py-2 border border-border_grey rounded-sm"
                                textStyles="text-grey_500 text-center"
                            />
                        </div>

                        <div className="w-full mt-4">
                            {name && (
                                <p
                                    className={`${roboto_400.className} text-sm text-[#F8A72D] text-center mb-1`}
                                >
                                    {name}
                                </p>
                            )}
                            <CustomInput
                                required
                                type="text"
                                placeholder="Account Number"
                                name="accountNumber"
                                className="font-normal text-center h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                            />
                        </div>
                    </>
                ) : (
                    <div className="w-full">
                        <CustomInput
                            required
                            type="text"
                            placeholder="Full names"
                            name="fullName"
                            className="font-normal text-center mt-4 h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                        />

                        <CustomInput
                            required
                            type="text"
                            placeholder="Email Address"
                            name="email"
                            className="font-normal text-center mt-4 h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                        />

                        <CustomInput
                            required
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            className="font-normal text-center mt-4 h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                        />

                        <p
                            className={`${roboto_400.className} text-[15px] text-center font-normal text-grey_2 mt-4 mx-auto`}
                        >
                            Bank Details
                        </p>
                        <div>
                            <textarea
                                name="bankDetails"
                                id="bankDetails"
                                className="font-normal text-center mt-1.5 h-[186px] outline-none bg-transparent text-sm py-2 pl-4 text-grey_800 flex-1 border border-border_grey rounded-sm"
                            />
                        </div>
                        {/* <CustomInput
              required
              type="text"
              multiple={true}
              placeholder=""
              name="bankDetails"
              className="font-normal text-center mt-1.5 h-[186px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
            /> */}
                    </div>
                )}

                <p
                    className={`${roboto_400.className} ml-auto text-sm text-right mt-1.5 text-grey_2`}
                >
                    Minimum: ₦5,000.00{" "}
                </p>

                <div className="font-normal text-center h-[40px] outline-none bg-transparent mt-4 text-sm py-2 flex justify-between w-full border border-border_grey rounded-sm">
                    <p className={`${roboto_400.className} text-[17px] text-white ml-3`}>
                        Amount <span className={`${roboto_700.className}`}>(₦)</span>
                    </p>

                    <input
                        type="text"
                        placeholder="0.00"
                        className={`${roboto_400.className} text-[17px] text-right w-[150px] outline-none bg-transparent mr-4 text-white placeholder:text-[#5E5C5C]`}
                    />
                </div>
            </div>

            <AppButton
                isLoading={isLoading}
                // disabled={}
                title="WITHDRAW"
                className="w-full mt-5 text-2xl py-4"
            // onClick={submitHandler}
            />
        </div>
    );
};