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
import { ClientsComponent } from "./ClientComp";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const runtime = "edge";


export default function page() {
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


