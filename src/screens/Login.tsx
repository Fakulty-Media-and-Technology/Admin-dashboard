"use client";

import { manrope_400 } from "@/config/fonts";
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

const AccType = ["Event", "Channel", "Tv Show", "Admin", "Super Admin"];
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Login() {
  const [accountType, setAccoutType] = useState("Select account type");
  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState("");
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  return (
    <div
      className={`${manrope_400.className} w-full sm:w-[390px] sm:h-[80vh] h-screen pt-6 items-center flex-col flex bg-grey_1 mx-auto`}
    >
      <Image
        src="/Logo.png"
        width={300}
        height={150}
        alt="Logo"
        className="mt-5"
      />

      <div className="-mt-3">
        <h5 className="font-semibold text-xl text-center">Login Account</h5>
        <p className="font-normal text-base text-white">
          Watch your favorite stars.
        </p>
      </div>

      <div className="w-full px-5 mt-10 space-y-6">
        <SelectInput
          placeholder={accountType}
          selectData={AccType}
          setType={setAccoutType}
        />

        <CustomInput
          ref={emailRef}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputWithIcon
          ref={passwordRef}
          type={inputType}
          placeholder="Password"
          onPress={() =>
            setInputType(inputType === "text" ? "password" : "text")
          }
          src="/eye.png"
        />
      </div>

      <div className="px-5 mt-14 w-full">
        <AppButton
          disabled={
            emailRef.current?.value !== "" &&
            passwordRef.current?.value !== "" &&
            accountType !== "Select account type" &&
            regex.test(email)
              ? false
              : true
          }
          title="Login"
          className="w-full"
          onClick={() =>
            emailRef.current?.value !== "" &&
            passwordRef.current?.value !== "" &&
            accountType !== "Select account type" &&
            regex.test(email)
              ? router.push("/dashboard")
              : console.log("first")
          }
        />

        <div className="mt-12 text-center">
          <span className="font-normal text-base text-input_grey">
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
