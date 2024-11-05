"use client";

import {
  AppButton,
  CustomInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { roboto_400, roboto_500, roboto_700 } from "@/config/fonts";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectUserProfile } from "@/store/slices/usersSlice";
import Image from "next/image";
import React, { useState } from "react";
import { ClientsComponent } from "./ClientComponent";

export const runtime = "edge";


export default function page() {
  const user = useAppSelector(selectUserProfile);
  const isSuperAdmin = user?.profile.role === "superadmin";

  return (
    <section className={`${roboto_400.className} overflow-y-auto pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">Home / Withdrawal</p>
      </div>

      {!isSuperAdmin && <ClientsComponent />}
    </section>
  );
};


