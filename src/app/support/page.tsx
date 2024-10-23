import { roboto_400 } from "@/config/fonts";
import React from "react";

const page = () => {
  return (
    <section
      className={`${roboto_400.className} h-full flex items-center justify-center pl-5`}
    >
      <p className={`${roboto_400.className} font-normal text-4xl text-white`}>
        3rd party support ticket API HERE
      </p>
    </section>
  );
};

export default page;
