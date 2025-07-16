"use client";

import {
  AppButton,
  CustomInput,
  SelectInputForm,
} from "@/components/AppLayout";
import {
  roboto_400,
  roboto_500,
} from "@/config/fonts";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectUserProfile } from "@/store/slices/usersSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ClientsComponent } from "./ClientComp";
import { ModalComponent } from "./ModalComp";
import { useGetLivestreamDetailsQuery } from "@/api/dashboard";
import { createVotesInfo, updateVotesInfo } from "@/api/voteSlice";
import { ILivestreamDetails } from "@/types/api/dashboard.types";
import { toast } from "react-toastify";

export const runtime = "edge";


export default function page() {
  const user = useAppSelector(selectUserProfile);
  const isSuperAdmin = user?.profile.role === "superadmin";
  const [cta, setCTA] = useState<string>("Vote");
  const [isActive, setActive] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("");
  const [isButtonEnabled, setButtonEnabled] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const [live, setLive] = useState<ILivestreamDetails | null>(null);
  const {
          data: livesteamDetails,
          isSuccess: isSuccess_L,
      } = useGetLivestreamDetailsQuery(undefined, {});
  
      async function handleSave() {
        if (cta === "vote") {
          console.log("You are on vote");
        }
        try {
          if (!live?._id) throw new Error("Live ID is missing");
          const res = await createVotesInfo({liveId: live._id, price ,status: isActive,});
          console.log(live._id)

          if (res.ok && res.data) {
            toast(`${res.data.message}`, { type: "success" });
          } else {
            toast(`${res.data?.message || "Vote creation failed"}`, { type: "error" });
          }
        } catch (error: any) {
          toast(`${error.message || "Something went wrong"}`, { type: "error" });
        }
      }


      useEffect(() => {
        if (!livesteamDetails || livesteamDetails.data.length===0) return
        setLive(livesteamDetails.data[0])
      }, [isSuccess_L]);

     useEffect(() => {
      const trimmedPrice = price.trim();
      const isLiveReady = live?._id !== undefined;
      setButtonEnabled(trimmedPrice !== "" && isLiveReady);
    }, [price, live]);

  return (
    <section className={`${roboto_400.className} relative pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">
          Home / Call To Action
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-y-4 sm:gap-y-0 justify-around">
        <div className="w-[200px]">
          <span
            className={`${roboto_500.className} text-white ml-1 text-base mb-2`}
          >
            CTA
          </span>
          <SelectInputForm
            placeholder={cta}
            setType={setCTA}
            selectData={["Vote", "Donations"]}
            className="font-normal text-sm mt-2 py-1 pb-1.5 border border-border_grey rounded-md"
            textStyles="text-grey_500 text-sm"
          />
        </div>

        <div className="w-[200px]">
          <span
            className={`${roboto_500.className} text-white ml-1 text-base mb-2`}
          >
            Amount per CTA
          </span>
          <CustomInput
            type="text"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="font-normal outline-none bg-transparent text-left mt-2 text-sm py-1 flex-1 border border-border_grey rounded-md"
          />
        </div>

        <div className="">
          <span
            className={`${roboto_500.className} text-white ml-1 text-base mb-2`}
          >
            CTA Status
          </span>
          <div
            className={`w-[45px] h-[18px] mt-2 flex items-center rounded-[15px] ${isActive ? "bg-[#FF131373]" : "bg-[#BCBDBD73]"
              }`}
          >
            <div
              onClick={() => setActive(!isActive)}
              className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${isActive
                ? "translate-x-5 bg-red"
                : "-translate-x-0 bg-[#BCBDBD]"
                } `}
            />
          </div>
        </div>

        <div className="w-[200px]">
          <AppButton
            onClick={handleSave}
            title="Save"
            disabled={!isButtonEnabled}
            className={`${roboto_500.className} ${isButtonEnabled ? "bg-red" : "bg-gray-500 cursor-not-allowed"} text-white rounded-md mt-5 px-6 py-2 ml-auto flex items-end text-[18px] text-center hover:scale-[1.1] transition-all duration-100 ease-in`}
          />
        </div>
      </div>

      {!isSuperAdmin && (
        <ClientsComponent handleClose={() => console.log("first")} />
      )}
    </section>
  );
};




