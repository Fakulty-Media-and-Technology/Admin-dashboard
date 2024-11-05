'use client'

import { AppButton, CustomInput } from "@/components/AppLayout";
import { roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { useState } from "react";



interface ModalProps {
    handleClose: () => void;
    handleReset: () => void;
}


export const ModalComponent = ({ handleClose, handleReset }: ModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [gift_code, setGift_Code] = useState<string>('');
    const [serial_NO, setSerial_NO] = useState<string>('');
    const [pin, setPIN] = useState<string>('');
    const isDisable = amount === '' || gift_code === '' || serial_NO === '' || pin === ''


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
    }


    return (
        <div className="z-[9999] w-[calc(100%-20px)] md:w-[calc(100%-40px)] lg:w-[calc(100%-56px)] absolute overflow-hidden flex justify-center">
            <div style={{
                marginTop: 20
            }} className="w-[90%] sm:w-[60%] lg:w-[40%] p-5 rounded-[10px] overflow-y-auto bg-black4">
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
                        <div>
                            <label
                                htmlFor="amount"
                                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                            >
                                AMOUNT *
                            </label>
                            <CustomInput
                                required
                                type="text"
                                placeholder=""
                                value={amount}
                                onChange={e => handleValidInput(e.target.value)}
                                id="amount"
                                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                            />
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
                                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
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
                                readOnly
                                id="pin"
                                className=" font-normal text-sm py-2.5 mt-1 border border-border_grey rounded-sm"
                            />
                        </div>







                    </div>
                    <AppButton
                        isLoading={loading}
                        disabled={amount === ''}
                        title="GENERATE"
                        className="w-[70%] mt-10 text-xl py-2.5"
                        onClick={() => console.log('geneerate func')}
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
    );
};