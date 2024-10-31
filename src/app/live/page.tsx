"use client";

import { outfit_500, roboto_400, roboto_500 } from "@/config/fonts";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectUserProfile } from "@/store/slices/usersSlice";
import Size from "@/utilities/useResponsiveSize";
import Lottie from "lottie-react";
import Image from "next/image";
import React, { useState } from "react";
import Loading from "@/config/lottie/dots.json";
import dynamic from "next/dynamic";
import SuperAdminComp from "./SuperAdminComp";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const page = () => {
  const user = useAppSelector(selectUserProfile);
  const isSuperAdmin = user?.profile.role === "superadmin";
  const isEVENT = user?.profile?.role === "event";
  const isTVSHOW = user?.profile?.role === "tvshow";
  const isChannel = user?.profile?.role === "channel";
  const isPodcast = user?.profile?.role === "podcast";
  return (
    <section className={`${roboto_400.className} h-full pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">Home / Live</p>
      </div>

      {(isEVENT || isTVSHOW || isChannel || isPodcast) && <ClientsComponent />}
      {isSuperAdmin && <SuperAdminComp />}
    </section>
  );
};

export default page;

export const ClientsComponent = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  function handleVideo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsPlaying(true);
  }
  return (
    <div className="lg:px-10 px-4 bg-black3 min-h-fit h-full py-5 pt-14 pb-6 mt-12 items-center flex flex-col">
      <div className="relative md:w-[55%] p-[2px] flex items-center bg-[#181818] h-11 justify-center">
        <div className="flex items-center justify-center flex-1 px-4">
          <input
            type="text"
            value=""
            readOnly
            className={`${roboto_400.className} outline-none flex-1 text-center bg-transparent text-base text-[#747474]`}
          />
        </div>
        <button className="lg:mr-6 mr-2">
          <Image
            src="/copyIcon.svg"
            alt=""
            width={24}
            height={24}
            className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6  object-contain rounded-full items-start"
          />
        </button>
      </div>

      <div className="relative p-[2px] md:w-[55%] my-5 flex items-center bg-[#181818] h-11 justify-center">
        <div className="flex items-center justify-center flex-1 px-4">
          <input
            type="text"
            value=""
            readOnly
            className={`${roboto_400.className} outline-none flex-1 text-center bg-transparent text-base text-[#747474]`}
          />
        </div>
        <button className="lg:mr-6 mr-2">
          <Image
            src="/copyIcon.svg"
            alt=""
            width={24}
            height={24}
            className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6  object-contain rounded-full items-start"
          />
        </button>
      </div>

      <p
        className={`${roboto_500.className} mt-6 lg:w-[35%] text-lg text-white text-center`}
      >
        Copy and paste the rmtp link & stream code directly into your live
        stream software
      </p>

      <div className="h-[60%] min-h-[370px] mt-10 w-full lg:w-[65.5%] relative mx-auto">
        <div
          style={{ zIndex: isPlaying ? 20 : 0 }}
          className="absolute w-full h-full"
        >
          <ReactPlayer
            playing={isPlaying}
            muted={mute}
            controls={false}
            // onProgress={e => }
            url="https://dun8iiyns9vdz.cloudfront.net/Most%20beautiful%20girl%20in%20Turkey%20event%20preview/Most%20beautiful%20girl%20in%20Turkey%20event%20preview_720p.mp4?Expires=1726752358&Key-Pair-Id=K2PD9X1HYUOEDS&Signature=S3ycijr0mbVRnHrguslkHD7G9qXboq7dbdy~I80ELECJnO3JK7eI9f6gT~9DqSar1oV7IROXzWZcZTmAMDENs766LBof6FNJaXcMEg8cHJrdmT~jGRrUJTX21~fUuPaiD-In-jEhoixFLDwq2qiFSaMZ17s2zrKDglF7KZAlbXTRXAt9ViC5p0-zEA9sNhQozfHEHlWxm5BVjGrnMRM5lYyYx9HTVnUGfTuWnvxrhMtGmQYG6pLG3EarM0qbvvteJyJeS9AyCpmh4gEZEAQdjxoLovGmGzhiSm-Bo2j2WatIDZyn8kDtGh8K~AZeQAAEmrwlGN~rRg2Y-jolxQ5pmg__"
            width="100%" // Set to 100%
            height="100%"
            volume={1}
            onEnded={() => setIsPlaying(false)}
            onReady={() => setIsPlayerReady(true)}
          />
        </div>

        {/* {isPlayerReady && ( */}
        <Image
          src="/coverphoto.png"
          alt=""
          width={Size.calcWidth(100)}
          height={Size.calcHeight(100)}
          className="w-full h-full absolute object-cover"
          style={{
            display: !isPlaying && isPlayerReady ? "inline" : "none",
          }}
        />

        {!isPlayerReady && (
          <div className="mt-5 flex w-full h-full items-center justify-center gap-x-3 absolute z-40">
            <span
              className={`${roboto_500.className} text-sm md:text-base lg:text-lg text-white ml-20  -mr-24 mb-2.5`}
            >
              Waiting for connection
            </span>
            <div className="overflow-hidden w-50 h-50">
              <Lottie
                animationData={Loading}
                loop
                size={10}
                style={{ width: 235, height: 235, marginRight: 5 }}
              />
            </div>
          </div>
        )}
        {/* )} */}
        <div className="bg-gradient-to-t from-[#000]/90 to-[#000]/10 absolute w-full h-full z-10" />
        <div className="bg-gradient-to-b from-[#000]/30 to-[#000]/0 absolute w-full h-full z-10" />
        {isPlayerReady && (
          <div className="pt-7 pb-3 px-10 flex flex-col absolute z-20 w-full h-full items-center justify-center">
            <div
              style={{ alignSelf: "flex-start" }}
              className="flex flex-row items-center"
            >
              <Image
                src="/channels.png"
                alt=""
                width={28}
                height={28}
                className="object-contain rounded-full"
              />
              <span
                className={`${outfit_500.className} font-medium text-[13px] text-white ml-2`}
              >
                Channels News
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <button
                style={{ display: isPlaying ? "none" : "inline" }}
                onClick={(e) => handleVideo(e)}
              >
                <Image
                  src="/playBtn.svg"
                  alt=""
                  width={30}
                  height={30}
                  className=" object-cover"
                />
              </button>
            </div>

            <div
              style={{ alignSelf: "flex-start" }}
              className="flex flex-row items-center gap-x-2"
            >
              <div className="w-[10px] h-[10px] animate-pulse rounded-full bg-red_500 " />
              <span
                className={`${outfit_500.className} font-medium text-[13px] text-white`}
              >
                LIVE
              </span>
              <div style={{}}>
                <Image
                  src="/unmute.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="px-10 h-[65%] overflow-hidden bg-black3 py-12 pb-9 ">
      </div> */}
    </div>
  );
};
