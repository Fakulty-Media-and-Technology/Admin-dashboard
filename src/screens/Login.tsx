"use client";

import { manrope_400, manrope_600, roboto_500 } from "@/config/fonts";
import { Manrope } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  AppButton,
  CustomInput,
  InputWithIcon,
  SelectInput,
} from "../components/AppLayout";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/hooks/useWindowSize";
import Size from "@/utilities/useResponsiveSize";
import { useLoginMutation } from "@/api/userSlice.api";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setCredentials } from "@/store/slices/usersSlice";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { getClientProfile, getSuperadminProfile } from "@/api/auth.api";
import { IProfile } from "@/types/api/profile.types";

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const SUCESS_CODES = 201


function Login() {
  const router = useRouter();
  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const submitHandler = async () => {
    if (email === "" || password === "" || !regex.test(email)) {
    } else {
      try {
        setLoading(true);
        const res = await login({
          email,
          password,
        }).unwrap();
        console.log(res, "login");

        if ((res.status === SUCESS_CODES && res.data)) {
          const isSuperAdmin = res.data.role === "superadmin";
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("auth_token", res.data.token);

          setCookie(null, "auth_token", res.data.token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/", // Makes it accessible in all pages
          });

          // Trigger the user profile query after login
          const resProfile = isSuperAdmin
            ? await getSuperadminProfile(res.data.token)
            : await getClientProfile(res.data.token);

          if (resProfile.ok && resProfile.data && resProfile.data !== null) {
            const superAdmin =
              (resProfile.data.data as IProfile[])[0] ||
              (resProfile.data.data as IProfile);
            const superAdminPatch: IProfile = {
              profile: superAdmin as any,
              photo_url: "",
            };
            dispatch(
              setCredentials(isSuperAdmin ? superAdminPatch : superAdmin)
            );
            router.replace("/dashboard");

            toast("Successful login", {
              type: "success",
            });
          } else {
            toast("Opps! couldn't authenticate user", {
              type: "error",
            });
          }
        }
      } catch (error) {
        console.log("Login error:", error);
        toast(`Something went wrong`, {
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  async function handleAuthUser() {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("role");
    const isSuperAdmin = role?.toLowerCase() === "superadmin";

    if (token && role) {
      const resProfile = isSuperAdmin
        ? await getSuperadminProfile(token)
        : await getClientProfile(token);

      if (resProfile.ok && resProfile.data && resProfile.data !== null) {
        const userData =
          (resProfile.data.data as IProfile[])[0] ||
          (resProfile.data.data as IProfile);
        console.log(userData, userData.profile);
        const superAdminPatch: IProfile = {
          profile: userData as any,
          photo_url: "",
        };
        dispatch(setCredentials(isSuperAdmin ? superAdminPatch : userData));

        setCookie(null, "auth_token", token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/", // Makes it accessible in all pages
        });

        toast(
          `Welcome ${
            isSuperAdmin
              ? superAdminPatch.profile.first_name
              : userData.profile.first_name
          }`,
          {
            type: "success",
          }
        );
        router.replace("/dashboard");
      }
    }
  }

  // Optionally, you can use useEffect to automatically fetch user profile after login if the token exists
  useEffect(() => {
    handleAuthUser();
  }, []);

  // TODO: check if token is still valid then neviagte to home

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        className={`${manrope_400.className} w-full sm:w-[390px] pt-6 items-center flex-col flex bg-grey_1 mx-auto`}
      >
        <Image
          src="/Logo.png"
          width={300}
          height={150}
          alt="Logo"
          style={{ marginTop: Size.calcHeight(2) }}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-[#BCC1CA]"
          />

          <InputWithIcon
            // ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <div className="px-5 mt-14 w-full mb-8">
          <AppButton
            isLoading={isLoginLoading || loading}
            disabled={
              email !== "" && password !== "" && regex.test(email)
                ? false
                : true
            }
            title="Login"
            className="w-full"
            onClick={submitHandler}
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
    </div>
  );
}

export default Login;
