"use client";

import { CustomInput, SelectInputForm } from "@/components/AppLayout";
import {
  RP_Overview,
  RP_Overview3,
  RP_Overview_2,
  TableHeads_Dashboard,
} from "@/config/data/dashboard";
import {
  outfit_500,
  roboto_300,
  roboto_400,
  roboto_500,
  roboto_900,
} from "@/config/fonts";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import {
  selectShowAcc,
  selectUserProfile,
  setShowAcc,
} from "@/store/slices/usersSlice";
import { abbreviateNumber } from "@/utilities/abbrebiate";
import { formatAmount, formatWithoutDecimals } from "@/utilities/formatAmount";
import Size from "@/utilities/useResponsiveSize";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import Loading from "@/config/lottie/dots.json";
import {
  useGetDashboardContentListQuery,
  useGetDashboardTotalUserQuery,
  useGetLivestreamDetailsQuery,
} from "@/api/dashboard";
const LiveStreamPlayer = dynamic(() => import('@/components/LiveStreamPlayer'), {
  ssr: false,
});
export interface OverviewProps {
  name: string;
  value: string;
}

const overviewPOints = [
  {
    name: "Viewers Online",
    value: "0",
  },
  {
    name: "Broadcast expires",
    value: "0",
  },
  {
    name: "Total Views",
    value: "0",
  },
];

export const runtime = "edge";


function page() {
  const user = useAppSelector(selectUserProfile);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentId2, setCurrentId2] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const isSuperAdmin = user?.profile.role === "superadmin";
  const isEVENT = user?.profile?.role === "event";
  const isTVSHOW = user?.profile?.role === "tvshow";
  const isChannel = user?.profile?.role === "channel";
  const isPodcast = user?.profile?.role === "podcast";
  const [liveUrl, setLiveUrl] = useState<string>('')
  const [clientOverview, setClientOverview] = useState<OverviewProps[]>([
    ...overviewPOints,
  ]);
  const [duration, setDuration] = useState<string>("One week");
  const {
    data: dashboardTotList,
    refetch,
    error,
    isSuccess,
    isLoading,
  } = useGetDashboardContentListQuery(undefined, {});
  const {
    data: livesteamDetails,
    isSuccess: isSuccess_L,
  } = useGetLivestreamDetailsQuery(undefined, {});

  const { data: dashboardTotUsers, refetch: dashboardTotUserRefresh } =
    useGetDashboardTotalUserQuery(undefined, {});

  function  handleVideo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    console.log("isPlaying:", isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (!livesteamDetails || isSuperAdmin) return
    setLiveUrl(livesteamDetails.data[0].stream_url)
  }, [isSuccess_L])

  useEffect(() => {
    refetch();
    dashboardTotUserRefresh();
  }, []);

  return (
    <section className={`${roboto_400.className} h-full pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">Home / Dashboard</p>
      </div>

      <div className="px-10 bg-black3 py-5 pb-6 mt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <p
            className={`${roboto_300.className} font-light text-base text-white mb-2 sm:mb-0`}
          >
            {isSuperAdmin ? "REEPLAY OVERVIEW" : "OVERVIEW"}
          </p>
          {isSuperAdmin && (
            <SelectInputForm
              placeholder={duration}
              setType={setDuration}
              selectData={["One week", "30 days", "6 month", "1 year"]}
              className="font-normal h-[36px] text-sm px-3 py-2 border border-border_grey rounded flex items-center gap-x-2"
              textStyles={`${roboto_500.className} font-medium text-sm text-white`}
            />
          )}
        </div>

        <div
          style={
            isSuperAdmin
              ? { justifyContent: "space-between" }
              : { justifyContent: "center" }
          }
          className="flex sm:flex-row flex-col items-start mx-autos gap-x-5 flex-wrap"
        >
          {(!isSuperAdmin
            ? clientOverview
            : RP_Overview(dashboardTotList?.data)
          ).map((x, i) => {
            const active = currentId === `${i}${x}`;
            const isBroadCast = x.name === "Broadcast expires";
            return (
              <div
                key={i}
                style={isSuperAdmin ? { flex: 1 } : {}}
                className="mt-3  w-full sm:w-fit cursor-pointer"
              >
                <div
                  onClick={() => setCurrentId(`${i}${x}`)}
                  className={`${active ? "border-t-[5px] border-red_500" : ""
                    } min-w-[170px] h-[100px] bg-black2 flex flex-col items-center justify-center`}
                >
                  <p
                    className={`${roboto_400.className} font-normal text-sm text-white `}
                  >
                    {x.name}
                  </p>
                  <p
                    className={`${roboto_900.className} font-[900] text-2xl text-white`}
                  >
                    {abbreviateNumber(Number(x.value))} {isBroadCast && "Hours"}
                  </p>
                </div>

                {active && (
                  <p
                    className={`${roboto_300.className} font-light text-base text-white text-center mt-3`}
                  >
                    {formatAmount(x.value)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isSuperAdmin && (
        <>
          <div className="px-10 bg-black3 py-12 pb-9 mt-8">
            <div className="flex sm:flex-row flex-col items-start justify-between gap-x-5 flex-wrap">
              {RP_Overview_2(dashboardTotUsers?.data).map((x, i) => {
                const active = currentId2 === `${i}${x}`;
                return (
                  <div
                    key={i}
                    className="mt-3 flex-1 w-full sm:w-fit cursor-pointer"
                  >
                    <div
                      onClick={() => setCurrentId2(`${i}${x}`)}
                      className={`${active ? "border-t-[5px] border-red_500" : ""
                        } min-w-[250px] h-[100px] bg-black2 flex flex-col items-center justify-center`}
                    >
                      <p
                        className={`${roboto_400.className} font-normal text-sm text-white `}
                      >
                        {x.name}
                      </p>
                      <p
                        className={`${roboto_900.className} font-[900] text-2xl text-white`}
                      >
                        {x.name === "Total Balance"
                          ? formatWithoutDecimals(Number(x.value)).split(".")[0]
                          : abbreviateNumber(Number(x.value))}
                      </p>
                    </div>

                    {active && (
                      <p
                        className={`${roboto_300.className} font-light text-base text-white text-center mt-3`}
                      >
                        {formatAmount(x.value)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative w-full mt-8">
            <div className="custom-scrollbar absolute w-full bg-black3 py-5 pb-6 px-10 overflow-x-auto">
              <table className="w-full table">
                <thead className="">
                  <tr>
                    {TableHeads_Dashboard.map((t, i) => {
                      return (
                        <th
                          key={i}
                          className={`${roboto_300.className} font-light text-base text-white uppercase text-wrap text-left`}
                        >
                          {t}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[].map((t, i) => {
                    //VERTICAL
                    return (
                      <tr key={i}>
                        {RP_Overview3.map((tx, indx) => {
                          //HORIZONTAL
                          return (
                            // <tr>
                            <td
                              className="whitespace-nowrap text-white py-2 pr-4"
                              key={indx}
                            >
                              <div className="flex items-center pl-2 py-1 pr-8 border border-border_dark rounded w-fit min-w-[160px]">
                                <Image
                                  src={`/tablepic/${tx.image}.png`}
                                  width={42}
                                  height={42}
                                  alt="profiles"
                                  className="object-contain rounded-full"
                                />
                                <div className="ml-2">
                                  <p
                                    className={`${roboto_500.className} font-medium text-[#fff] text-[15px]`}
                                  >
                                    {tx.name}
                                  </p>
                                  <div className="flex items-center -mt-[2px]">
                                    <Image
                                      src="/views.svg"
                                      width={12.5}
                                      height={10}
                                      alt="views"
                                    />
                                    <p
                                      className={`${roboto_400.className} font-normal text-[13px] text-grey_800 ml-1.5 `}
                                    >
                                      {formatAmount(tx.views)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            // </tr>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {(isEVENT || isPodcast || isChannel || isTVSHOW) &&

        <div className="px-10 h-[73%] min-h-[370px] overflow-hidden bg-black3 py-12 pb-9 ">
          <div className="h-full max-w-full lg:w-[65.5%] relative overflow-hidden mx-auto">
            <div
              style={{ zIndex: isPlaying ? 20 : 0 }}
              className="absolute w-full h-full"
            >
              <LiveStreamPlayer
                playing={isPlaying}
                muted={mute}
                controls={false}
                url={livesteamDetails?.data[0].previewVideo ?? liveUrl}
                // url={'//vjs.zencdn.net/v/oceans.mp4'}
                // url={'https://www.youtube.com/watch?v=ZVEGWQVb1pE'}
                width="100%"
                height="100%"
                volume={1}
                onEnded={() => setIsPlaying(false)}
                onReady={() => setIsPlayerReady(true)}
              />
            </div>

            {/* {isPlayerReady && ( */}
            <Image
              src={livesteamDetails?.data[0].coverPhoto ?? "/coverphoto.png"}
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
                    src={user.photo_url}
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain rounded-full"
                  />
                  <span
                    className={`${outfit_500.className} font-medium text-[13px] text-white ml-2`}
                  >
                    {user.profile.first_name} {user.profile.last_name}
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
                  <div style={{}} onClick={() => setMute(!mute)} className="relative">
                    {mute && <div className="h-[2px] w-[22px] -rotate-[45deg] bg-white absolute top-2.5" />}
                    <Image
                      src="/unmute.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="object-contain rounded-full"
                    />
                  </div>
                  {isPlaying && <button className="ml-2 flex gap-x-1.5" onClick={handleVideo}>
                    <div className="w-1 h-3.5 bg-white" />
                    <div className="w-1 h-3.5 bg-white" />
                  </button>}
                </div>
              </div>
            )}
          </div>
        </div>}
    </section>
  );
}

export default page;
