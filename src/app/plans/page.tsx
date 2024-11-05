"use client";

import { useEventEstimateMutation } from "@/api/extra.api";
import { roboto_400, roboto_500, roboto_700 } from "@/config/fonts";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectUserProfile } from "@/store/slices/usersSlice";
import React, { useState } from "react";
import SuperAdminComp from "./SuperAdminComp";
import { ClientsComponent } from "./ClientComponent";

export const runtime = "edge";


export default function page() {
  const user = useAppSelector(selectUserProfile);
  const isSuperAdmin = user?.profile?.role === "superadmin";
  const isClient = user?.profile?.role === "channel" || user?.profile?.role === "tvshow" || user?.profile?.role === "event" || user?.profile?.role === "podcast";

  return (
    <section className={`${roboto_400.className} h-full overflow-y-auto pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">
          Home / {isSuperAdmin ? "Sub" : "create"}
        </p>
      </div>

      {isSuperAdmin && <SuperAdminComp />}
      {isClient && <ClientsComponent />}
    </section>
  );
};






