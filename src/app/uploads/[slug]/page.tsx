

import { roboto_400, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import React, { useState } from "react";
import MainComponent from "./mainComponent";

export const runtime = "edge";


const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug

  return <MainComponent slug={slug} />;
};

export default page;
