'use client';

import { AppButton, CustomInput } from "@/components/AppLayout";
import { roboto_400_italic, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addVoteContestant } from "@/api/voteSlice";
import { form } from "framer-motion/m";
import { toast } from "react-toastify";
import { useGetLivestreamDetailsQuery } from "@/api/dashboard";
import { ILivestreamDetails } from "@/types/api/dashboard.types";
import { IContestantData } from "@/types/api/votes.types";

export interface ModalProps {
    handleClose: () => void;
     handleSave: (newContestant: IContestantData) => void;
}

export const ModalComponent = ({ handleClose, handleSave }: ModalProps) => {
    const [userPic, setUserPic] = useState<File | null>(null);
    const [names, setNames] = useState<string>('');
    const [contestant_number, setContestantNumber] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [live, setLive] = useState<ILivestreamDetails | null>(null);
      const {
              data: livesteamDetails,
              isSuccess: isSuccess_L,
          } = useGetLivestreamDetailsQuery(undefined, {});

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) setUserPic(files[0]);
    };

    useEffect(() => {
        if (!livesteamDetails || livesteamDetails.data.length===0) return
        setLive(livesteamDetails.data[0])
        }, [isSuccess_L]);
        

    async function submitHandler() {
        try {
            setIsLoading(true)

            const formData = new FormData()
            formData.append("names", names)
            formData.append("bio", bio)
            formData.append("contact", contestant_number)
            formData.append("occupation", occupation)
            if(live?._id) formData.append("liveId", live._id)
            if(userPic) formData.append('photo', userPic);


            const res = await addVoteContestant(formData)
            if(res.ok && res.data){
                toast(`Contestant created successfully`, {type : "success"})
                handleSave(res.data);
            }else{
                toast(`${res.data?.message.replace('Invalid Request:', '')}`, { type: "error" });
            }
        } catch (error) {
             toast(`Opps! couldn't create client`, { type: "error" });
        }finally{
            setIsLoading(false)
        }
    };


    return (
        <div className="z-[9999] w-full absolute overflow-hidden flex justify-center inset-0">
            <div className="w-[90%] h-full md:h-[80%] sm:w-[70%] lg:w-[50%] mt-32 p-5 rounded-[10px] bg-black4">
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
                                value={names}
                                onChange={e => setNames(e.target.value)}
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
                                    value={occupation}
                                    onChange={e => setOccupation(e.target.value)}
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
                                    value={contestant_number}
                                    onChange={e => setContestantNumber(e.target.value)}
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
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                    className="h-[150px] text-grey_800 resize-none w-full outline-none bg-transparent text-sm p-2 pl-4 mt-2 border border-border_grey rounded-sm"
                                />
                            </div>
                        </div>

                        <AppButton
                            isLoading={isLoading}
                            // disabled={}
                            title="SAVE"
                            className="w-full mt-2 text-xl py-2.5"
                            onClick={submitHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};