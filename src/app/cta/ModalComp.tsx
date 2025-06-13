'use client';

import { AppButton, CustomInput } from "@/components/AppLayout";
import { roboto_400_italic, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { useState } from "react";

export interface ModalProps {
    handleClose: () => void;
}

export const ModalComponent = ({ handleClose }: ModalProps) => {
    const [userPic, setUserPic] = useState<File | null>(null);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) setUserPic(files[0]);
    }
    return (
        <div className="z-[9999] w-full absolute overflow-hidden flex justify-center inset-0">
            <div className="w-[90%] h-[70%] md:h-[80%] sm:w-[70%] lg:w-[50%] mt-32 p-5 rounded-[10px] bg-black4">
                <div className="ml-auto w-fit" onClick={handleClose}>
                    <Image
                        src="/closeIcon.svg"
                        width={20}
                        height={20}
                        alt="close modal"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <div className="mb-4 mt-1 relative">
                        {/* Here */}
                            <Image
                                src={userPic ? URL.createObjectURL(userPic) : "/accDummy.svg"}
                                width={111}
                                height={111}
                                alt=""
                                className="w-[111px] h-[111px] rounded-full object-cover"
                            />
                       

                        <div className="absolute bottom-2 right-0 z-10">
                            <div className="w-fit relative">
                                <Image src="/editProfile.svg" alt="" width={20} height={20} />
                                <input
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    className="absolute top-0 -left-3 opacity-0"
                                    onChange={(e) => handleInput(e)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 sm:max-w-[400px]">
                        <div>
                            <label
                                htmlFor="name"
                                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                            >
                                FIRST AND LAST NAMES *
                            </label>
                            <CustomInput
                                required
                                type="text"
                                placeholder=""
                                id="name"
                                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                            />
                        </div>

                        <div className="flex items-end gap-x-3 mt-5">
                            <div>
                                <label
                                    htmlFor="occupation"
                                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                                >
                                    OCCUPATION *
                                </label>
                                <CustomInput
                                    required
                                    type="text"
                                    placeholder=""
                                    id="occupation"
                                    className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                />
                            </div>
                            <div className="max-w-[110px]">
                                <div className="text-center">
                                    <label
                                        htmlFor="contestant_number"
                                        className={`${roboto_500.className}  text-white align-baseline text-center`}
                                    >
                                        CONTESTANT NUMBER *
                                    </label>
                                </div>
                                <CustomInput
                                    required
                                    type="text"
                                    placeholder=""
                                    id="contestant_number"
                                    className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label
                                htmlFor="name"
                                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                            >
                                BIO *{" "}
                                <span
                                    className={`${roboto_400_italic.className} text-[15px] text-input_grey`}
                                >
                                    (Only 25 words alowed)
                                </span>
                            </label>

                            <div>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    className="h-[150px] text-grey_800 resize-none w-full outline-none bg-transparent text-sm p-2 pl-4 mt-2 border border-border_grey rounded-sm"
                                />
                            </div>
                        </div>

                        <AppButton
                            // isLoading={isLoading}
                            // disabled={}
                            title="SAVE"
                            className="w-full mt-2 text-xl py-2.5"
                        // onClick={submitHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};