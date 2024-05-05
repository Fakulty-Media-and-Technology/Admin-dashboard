"use client";

import { manrope_400, manrope_600, roboto_500 } from "@/config/fonts";
import { Manrope } from "next/font/google";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  AppButton,
  CustomInput,
  InputWithIcon,
  SelectInput,
} from "../components/AppLayout";
import { useRouter } from "next/navigation";

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Login() {
  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState("");
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  return (
    <div
      className={`${manrope_400.className} w-full sm:w-[390px] sm:h-[93vh] h-screen pt-6 items-center flex-col flex bg-grey_1 mx-auto`}
    >
      <Image
        src="/Logo.png"
        width={300}
        height={150}
        alt="Logo"
        className="mt-20"
      />

      <div className="mt-3">
        <h5
          className={`${manrope_600.className} font-semibold text-xl text-center text-white`}
        >
          Admin Login
        </h5>
        <p className="font-normal text-base text-white">
          Access your control dashboard
        </p>
      </div>

      <div className="w-full px-5 mt-10 space-y-6">
        <CustomInput
          ref={emailRef}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="text-[#BCC1CA]"
        />

        <InputWithIcon
          ref={passwordRef}
          type={inputType}
          width={17}
          height={12}
          placeholder="Password"
          onPress={() =>
            setInputType(inputType === "text" ? "password" : "text")
          }
          className="text-[#BCC1CA]"
          src="/eye.png"
        />
      </div>

      <div className="px-5 mt-14 w-full">
        <AppButton
          disabled={
            emailRef.current?.value !== "" &&
            passwordRef.current?.value !== "" &&
            regex.test(email)
              ? false
              : true
          }
          title="Login"
          className="w-full"
          onClick={() =>
            emailRef.current?.value !== "" &&
            passwordRef.current?.value !== "" &&
            regex.test(email)
              ? router.push("/dashboard")
              : console.log("first")
          }
        />

        <div className="mt-12 text-center">
          <span className="font-normal text-base text-[#BCC1CA]">
            Forgot your password?
          </span>{" "}
          <span
            onClick={() => console.log("route to contact screen")}
            className="font-normal text-base text-blue_200"
          >
            Contact us
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
