'use client'

import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import { roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { useState } from "react";



interface ModalProps {
    handleClose: () => void;
    handleReset: () => void;
};

interface Response {
  status: number;
  message: string;
  data: Data;
};

interface Data {
  admin_id: string;
  serialNumber: number;
  amount: number;
  currency: string;
  code: string;
  used: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export const ModalComponent = ({ handleClose, handleReset }: ModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [wallet, setWallet] = useState<string>("Select currency") 
    const [amount, setAmount] = useState<string>('');
    const [gift_code, setGift_Code] = useState<string>('');
    const [serial_NO, setSerial_NO] = useState<string>('');
    const [pin, setPIN] = useState<string>('');
    const isDisable = !amount || !gift_code || !serial_NO  || !pin


    function reset() {
        setSerial_NO('');
        setAmount('');
        setGift_Code('')
        setPIN('')
    }

    function handleValidInput(query: string,) {
        const inputValue = query;
        if (/^\d*$/.test(inputValue)) {
            setAmount(inputValue);
        }
    }

    async function submitHandler() {
        try {
            setLoading(true);

        } catch (error) {

        } finally {
            
            setLoading(false)
        }
    };

    async function generateGiftCard() {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_RP_baseurl}/superadmin/giftcard/generate/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount,
                currency: wallet
            })
            });

            const result: Response = await response.json();

            if (!response.ok || !result.data) {
            throw new Error(result.message || "Gift card creation failed");
            }

            // Update state with response data
            setGift_Code(result.data.code);
            setSerial_NO(result.data.serialNumber.toString());
            setPIN("••••••"); // Optional: placeholder until user enters real authorization
            console.log("Gift code received:", result.data.code);

        } catch (error) {
            console.error("Gift card generation error:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="z-[9999] w-[calc(100%-20px] md:w-[calc(100%-40px)] lg:w-[calc(100%-56px)] absolute overflow-hidden flex justify-center">
            <div style={{
                marginTop: 20
            }} className="w-[90%] sm:w-[603px] p-5 rounded-[10px] overflow-y-auto bg-black4">
                <div className="ml-auto w-fit" onClick={handleClose}>
                    <Image
                        src="/closeIcon.svg"
                        width={20}
                        height={20}
                        alt="close modal"
                    />
                </div>

                <div style={{
                    marginBottom: 20
                }} className="flex flex-col items-center">


                    <div className="mt-5 space-y-5 w-[70%]">
                        <div className="w-full">
                            <label
                                htmlFor="amount"
                                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                            >
                                AMOUNT *
                            </label>
                            <div className="flex items-center gap-x-4 w-full max-sm:block">
                                <CustomInput
                                    required
                                    type="text"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={e => handleValidInput(e.target.value)}
                                    id="amount"
                                    className="font-normal text-sm text-center py-2 mt-2 border border-border_grey rounded-sm h-[32px] w-[212px]"
                                />
                                <div className="w-full">
                                    <SelectInputForm
                                        placeholder={wallet}
                                        setType={setWallet}
                                        selectData={["NGN", "USD"]}
                                        className="font-normal w-[160x] h-[32px] text-[10px] py-2 border border-border_grey rounded-sm mt-2"
                                        textStyles="text-grey_500 text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="gift_code"
                                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                            >
                                GIFT CODE *
                            </label>
                            <CustomInput
                                required
                                type="text"
                                placeholder=""
                                value={gift_code}
                                readOnly
                                id="gift_code"
                                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm text-white"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="serialNo"
                                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                            >
                                SERIAL NUMBER *
                            </label>
                            <CustomInput
                                required
                                type="text"
                                placeholder=""
                                value={serial_NO}
                                readOnly
                                id="serialNo"
                                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                            />
                        </div>
                        <div>

                            <CustomInput
                                required
                                type="text"
                                placeholder="ENTER AUTORIZED PIN TO CONTINUE"
                                value={pin}
                                onChange={e => setPIN(e.target.value)}
                                id="pin"
                                className=" font-normal text-sm py-2.5 mt-1 border border-border_grey rounded-sm"
                            />
                        </div>
                    </div>
                    <AppButton
                        isLoading={loading}
                        disabled={amount === "" || wallet === "Select currrency"}
                        title="GENERATE"
                        className="w-[70%] mt-10 text-xl py-2.5"
                        onClick={generateGiftCard}
                    />
                    <AppButton
                        isLoading={loading}
                        disabled={isDisable}
                        title="SAVE"
                        className="w-[70%] mt-3 text-xl py-2.5"
                        onClick={submitHandler}
                    />
                </div>
            </div>
        </div>
    )
}