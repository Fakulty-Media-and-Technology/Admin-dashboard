"use client";

import { manrope_400, manrope_600 } from "@/config/fonts";
import Image from "next/image";
import React, { useEffect, useState, Suspense } from "react";
import {
  AppButton,
  CustomInput,
  InputWithIcon,
} from "../components/AppLayout";
import { useRouter, useSearchParams } from "next/navigation";
import Size from "@/utilities/useResponsiveSize";
import { useLoginMutation, useSuperadminClientRedirectMutation } from "@/api/userSlice.api";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setCredentials } from "@/store/slices/usersSlice";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { getClientProfile, getSuperadminProfile } from "@/api/auth.api";
import { IProfile } from "@/types/api/profile.types";

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const SUCESS_CODES = [201, 200];

// --- DASHBOARD SKELETON BASED ON SCREENSHOTS ---
const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen w-full bg-[#181818] overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="w-[250px] bg-[#1F1F1F] p-6 flex flex-col border-r border-[#2A2A2A] animate-pulse">
        {/* Logo Area */}
        <div className="h-8 w-32 bg-[#333333] rounded mb-12 mx-auto" />
        {/* User Profile Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-20 w-20 bg-[#333333] rounded-full mb-4" />
          <div className="h-4 w-28 bg-[#333333] rounded mb-2" />
          <div className="h-3 w-20 bg-[#333333] rounded" />
        </div>
        {/* Menu Items */}
        <div className="flex flex-col gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-full bg-[#333333] rounded-md" />
          ))}
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="h-[70px] bg-[#1F1F1F] flex items-center justify-between px-8 animate-pulse">
          <div className="h-5 w-48 bg-[#333333] rounded" />
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-[#333333] rounded-sm" />
            <div className="h-8 w-8 bg-[#333333] rounded-sm" />
            <div className="h-10 w-10 bg-[#333333] rounded-full" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 animate-pulse">
          <div className="h-5 w-24 bg-[#333333] rounded mb-6" />
          {/* 3 Overview Cards */}
          <div className="flex gap-6 mb-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[120px] flex-1 bg-[#1F1F1F] rounded-md flex flex-col items-center justify-center gap-3"
              >
                <div className="h-4 w-24 bg-[#333333] rounded" />
                <div className="h-8 w-12 bg-[#333333] rounded" />
              </div>
            ))}
          </div>
          {/* Main Video/Table Area */}
          <div className="w-full h-[400px] bg-[#0A0A0A] rounded-md border border-[#2A2A2A]" />
        </div>
      </div>
    </div>
  );
};

// Extracted inner component so we can wrap useSearchParams in Suspense
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email"); // 🟩 Grab email from route

  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const mTop = Size.calcHeight(2);
  
  // Initial loading state to show skeleton
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true); 
  
  const dispatch = useAppDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [superadminClientRedirect, { isLoading: isSuperadminClientRedirectLoading }] = useSuperadminClientRedirectMutation();

  const submitHandler = async () => {
    // 🟩 Bypass strict validation if we are in the redirect flow
    if (!queryEmail && (email === "" || password === "" || !regex.test(email))) {
      return;
    } 
    console.log(queryEmail, 'here...')
    try {
      setLoading(true);
      let res;

      // 🟩 FIXED COMMENT LOGIC
      if (queryEmail) {
        // Superadmin is trying to access a client dashboard
        const c = await superadminClientRedirect({ email: queryEmail }).unwrap();
        console.log(c, queryEmail)
        res = c
      } else {
        // Standard login
        res = await login({
          email,
          password,
        }).unwrap();
      }

      if (SUCESS_CODES.includes(res.status) && res.data) {
        const isSuperAdmin = res.data.role === "superadmin";
        if(queryEmail){
          const r = localStorage.getItem("role");
          localStorage.setItem("role", `${r}_${res.data.role}`);
        }else{
          localStorage.setItem("role", res.data.role);
        }
        localStorage.setItem(isSuperAdmin ? "superadmin_token" : "auth_token", res.data.token);

        setCookie(null, isSuperAdmin ? "superadmin_token" : "auth_token", res.data.token, {
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
  };

  async function handleAuthUser() {
    // 🟩 If the URL has ?email=..., automatically trigger the superadmin redirect flow
    if (queryEmail) {
      await submitHandler();
      return;
    }

    const r = localStorage.getItem("role");
     const role = r?.split("_") || [];
    const isSuperAdmin = role.includes("superadmin");
    const token = localStorage.getItem(isSuperAdmin ? "superadmin_token" : "auth_token");
    if(isSuperAdmin && role.length >1) localStorage.setItem("role", "superadmin"); // Clean up role if we had a superadmin-client redirect before

    if (token && role.length > 0) {
      try {
        const resProfile = isSuperAdmin
          ? await getSuperadminProfile(token)
          : await getClientProfile(token);

        if (resProfile.ok && resProfile.data && resProfile.data !== null) {
          const userData =
            (resProfile.data.data as IProfile[])[0] ||
            (resProfile.data.data as IProfile);
          
          const superAdminPatch: IProfile = {
            profile: userData as any,
            photo_url: "",
          };
          dispatch(setCredentials(isSuperAdmin ? superAdminPatch : userData));

          setCookie(null, isSuperAdmin ? "superadmin_token" : "auth_token", token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
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
          return; 
        }
      } catch (error) {
        console.log("Auto-login failed:", error);
      }
    }
    
    setIsCheckingAuth(false);
  }

  useEffect(() => {
    handleAuthUser();
  }, [queryEmail]);

  // IF CHECKING AUTH, RENDER THE SKELETON
  if (isCheckingAuth) {
    return <DashboardSkeleton />;
  }

  // OTHERWISE, RENDER THE LOGIN FORM
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
          style={{ marginTop: mTop }}
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
            // 🟩 Ensure button reflects superadmin loading state too if they somehow click it
            isLoading={isLoginLoading || loading || isSuperadminClientRedirectLoading}
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
              className="font-normal text-base text-blue_200 cursor-pointer"
            >
              Contact us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🟩 Wrap everything in Suspense so useSearchParams doesn't break Next.js build
export default function Login() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}