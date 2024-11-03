'use client'

import { AppButton, CustomInput } from "@/components/AppLayout";
import { roboto_400, roboto_500 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import { useState } from "react";




interface ModalProps {
    handleClose: () => void;
    tab: string;
    handleReset: () => void
}

export const ModalComponent = ({ handleClose, handleReset, tab }: ModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [symbol, setSymbol] = useState<string>('');
    const [exchange, setExchange] = useState<string>('');
    const [isAutomatic, setAutomatic] = useToggle();


    function reset() {

    }



    return (
        <div className="z-[9999] w-[calc(100%-20px)] md:w-[calc(100%-40px)] lg:w-[calc(100%-56px)] absolute overflow-hidden flex justify-center">
            <div style={{
                marginTop: 40
            }} className="w-[90%] sm:w-[80%] lg:w-[50%] p-5 pb-10 rounded-[10px] overflow-y-auto bg-black4">
                <div className="ml-auto w-fit" onClick={handleClose}>
                    <Image
                        src="/closeIcon.svg"
                        width={20}
                        height={20}
                        alt="close modal"
                    />
                </div>

                <div style={{
                    marginBottom: tab === 'genre' ? 40 : 20
                }} className="flex flex-col items-center">


                    <div className="mt-5 space-y-5 w-[70%]">
                        {tab !== 'email' ? <>
                            <div>
                                <label
                                    htmlFor="name"
                                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                                >
                                    CURRENCY NAME
                                </label>

                                <CustomInput
                                    required
                                    type="text"
                                    placeholder=""
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    id="name"
                                    className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                                >
                                    ISO CODE
                                </label>

                                <CustomInput
                                    required
                                    type="text"
                                    placeholder=""
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                />
                            </div>


                            <div>
                                <label
                                    htmlFor="name"
                                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                                >
                                    SYMBOL
                                </label>

                                <CustomInput
                                    required
                                    type="text"
                                    placeholder=""
                                    value={symbol}
                                    onChange={e => setSymbol(e.target.value)}
                                    className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                />
                            </div>

                            <div className="flex items-center flex-wrap gap-3">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                                    >
                                        EXCHANGE
                                    </label>

                                    <CustomInput
                                        required
                                        type="text"
                                        placeholder="0.0"
                                        value={exchange}
                                        onChange={e => setExchange(e.target.value)}
                                        className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                        readOnly={isAutomatic}
                                    />
                                </div>

                                <div className="flex-1 pt-6 flex items-center gap-x-6">
                                    <p
                                        className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
                                    >
                                        Automatic
                                    </p>
                                    <div
                                        className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${(
                                            isAutomatic
                                        )
                                            ? "bg-[#FF131373]"
                                            : "bg-[#BCBDBD73]"
                                            }`}
                                    >
                                        <div
                                            onClick={() => setAutomatic()
                                            }
                                            className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${(
                                                isAutomatic
                                            )
                                                ? `translate-x-5 bg-red`
                                                : "-translate-x-0 bg-[#BCBDBD]"
                                                } `}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center justify-center gap-x-3">
                                <span className={`${roboto_500.className} text-white text-base`}>Mark as default</span>
                                <input
                                    type="checkbox"
                                    className="appearance-none bg-transparent w-[18px] h-[18px] outline-none border-[2px] border-[#C4C4C4] checked:appearance-auto"
                                    checked={isChecked}
                                    onChange={(e) =>
                                        setIsChecked(e.target.checked)
                                    }
                                />
                            </div>
                        </>
                            : <>
                                <div className="flex flex-col flex-1">
                                    <label
                                        className={`${roboto_400.className} font-normal text-white text-center text-base ml-2.5`}
                                    >
                                        TEST SMTP SETTINGS
                                    </label>
                                    <div className="flex justify-center">
                                        <p className="ml-2.5 mb-2 max-w-[256px] mt-1.5 text-[#747474] text-center text-sm">Enter the SMTP Host name (example smtp.gmail.com)</p>

                                    </div>
                                    <CustomInput
                                        type="text"
                                        placeholder=""
                                        className="font-normal min-w-[310px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </>}



                    </div>
                    <AppButton
                        isLoading={loading}

                        title="SAVE"
                        className="w-[70%] mt-10 text-xl py-2.5"
                    //   onClick={submitHandler}
                    />
                </div>
            </div>
        </div>
    );
};