"use client";

import { useGetUserProfileQuery } from "@/api/userSlice.api";
import { roboto_400, roboto_500 } from "@/config/fonts";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import useToggle from "@/hooks/useToggle";
import { selectUserProfile, setCredentials } from "@/store/slices/usersSlice";
import Size from "@/utilities/useResponsiveSize";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
  "dashboard",
  "featured",
  "users",
  "uploads",
  "live",
  "upcoming",
  "categories",
];

const clientsLinks = ["dashboard", "live", "plans", "currency", "support"];

const otherNavs = [
  "ad",
  "plans",
  "giftcards",
  "clients",
  "suggestions",
  "settings",
];

const optionsNav = ["movies", "series", "skits", "music videos"];

interface NavOptions {
  nav: string;
  className?: string;
}

const NavLink = ({ nav, className }: NavOptions) => {
  const user = useAppSelector(selectUserProfile);
  const [options, setOptions] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const active = pathname.split("/")[1] === encodeURI(nav);
  const isChannel = user?.profile.role === "channel";

  useEffect(() => {
    if (pathname.split("/")[1] !== "uploads") setOptions(false);
  }, [pathname]);

  return (
    <div className="relative">
      {nav !== "uploads" ? (
        <Link
          href={`/${nav}`}
          className={`flex items-center w-full min-w-[150px] py-3 ${className} ${active
            ? "border-l-[5px] border-red_500 md:pl-[27px] pl-[13px]"
            : "md:pl-8 pl-[18px]"
            }`}
        >
          <div className="w-10 items-center flex flex-col">
            <Image
              src={active ? `/${nav}WH.svg` : `/${nav}.svg`}
              alt=""
              width={
                nav === "dashboard"
                  ? 34
                  : nav === "featured"
                    ? 22
                    : nav === "users"
                      ? 15.53
                      : nav === "uploads"
                        ? 24
                        : nav === "upcoming"
                          ? 17
                          : nav === "live"
                            ? 19
                            : nav === "ad"
                              ? 22
                              : nav === "plans"
                                ? 20
                                : nav === "giftcards"
                                  ? 20
                                  : nav === "suggestions"
                                    ? 20
                                    : nav === "clients"
                                      ? 15.53
                                      : 24
              }
              height={
                nav === "dashboard"
                  ? 20
                  : nav === "featured"
                    ? 22
                    : nav === "users"
                      ? 23.29
                      : nav === "uploads"
                        ? 24
                        : nav === "upcoming"
                          ? 17
                          : nav === "live"
                            ? 13
                            : nav === "ad"
                              ? 13.62
                              : nav === "plans"
                                ? 20
                                : nav === "giftcards"
                                  ? 12.5
                                  : nav === "suggestion"
                                    ? 20
                                    : nav === "clients"
                                      ? 23.29
                                      : 24
              }
            />
          </div>
          <li
            className={`${roboto_400.className
              } md:block hidden w-[180px] pl-5 capitalize font-normal text-base transition-all duration-150 hover:scale-110 ${active ? "text-white" : "text-grey_800"
              }`}
          >
            {nav === "plans"
              ? `${isChannel ? "Create Live" : "plans / subs"}`
              : nav === "ad"
                ? "ad manager"
                : nav === "support"
                  ? "support tickets"
                  : nav}
          </li>
          {nav === "uploads" && (
            <Image src="/dropDwn.svg" width={12} height={7} alt="" />
          )}
        </Link>
      ) : (
        <div className="group">
          <button
            onClick={() => [
              setOptions(!options),
              !options && router.push(`/uploads/${optionsNav[0]}`),
            ]}
            className={`flex items-center w-full min-w-[150px] pt-3 pb-2 ${active
              ? "border-l-[5px] border-red_500 md:pl-[27px] pl-[13px]"
              : "md:pl-8 pl-[18px]"
              }`}
          >
            <div className="w-10 items-center flex flex-col">
              <Image
                src={active ? `/${nav}WH.svg` : `/${nav}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </div>
            <li
              className={`${roboto_400.className
                } md:block hidden w-[180px] text-left pl-5 capitalize font-normal text-base ${active ? "text-white" : "text-grey_800"
                }`}
            >
              {nav}
            </li>
            {nav === "uploads" && (
              <Image
                src="/dropDwn.svg"
                width={12}
                height={7}
                alt=""
                className={` ${!options ? "rotate-180" : ""}`}
              />
            )}
          </button>

          {options && nav === "uploads" && (
            <div className="mb-5 absolute z-10 md:relative left-14 md:left-0 top-7 md:top-0 bg-black3 md:bg-transparent">
              {optionsNav.map((x, i) => {
                const actve = encodeURI(x) === pathname.split("/")[2];
                return (
                  <Link
                    href={`/uploads/${x}`}
                    className="flex items-center w-full min-w-[150px] py-1.5 md:pl-8 pl-[18px]"
                    key={i}
                  >
                    <div
                      style={{ alignSelf: "center" }}
                      className={`w-[7px] h-[7px] rounded-full mx-4 ${actve ? "bg-white" : "bg-grey_800"
                        }`}
                    />
                    <p
                      className={`${roboto_400.className
                        } w-[140px] md:w-[180px] text-left pl-5 capitalize font-normal text-base ${actve ? "text-white" : "text-grey_800"
                        }`}
                    >
                      {x}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

function Siderbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const user = useAppSelector(selectUserProfile);
  const { data, isSuccess } = useGetUserProfileQuery(undefined, {});
  // const isChannel = user?.profile.role === "channel";
  const isEVENT = user?.profile.role.toLowerCase() === "events";
  const isTVSHOW = user?.profile.role.toLowerCase() === "tvshows";
  const isChannel = user?.profile.role.toLowerCase() === "channels";
  const isPodcast = user?.profile.role.toLowerCase() === "podcast";
  const FullSideLinks = [...clientsLinks];
  const WIDTH = Size.getWidth();
  const isActive = pathname === "/cta";

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data.data));
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <>
      {pathname !== "/" && (
        <nav className="bg-black3 h-full flex flex-col md:w-[283px] w-[70px] transition-[width] duration-500 ease-in-out">
          <div className="flex flex-1 min-h-screen flex-col items-center">
            <Image src={"/logoSM.png"} width={186} height={157} alt="" />

            <div className="relative w-[50px] h-[50px] md:-mt-10 transition-all duration-500 ease-in-out">
              <Image
                src="/user.png"
                width={50}
                height={50}
                alt=""
              //   className="mr-2"
              />

              {/* <button className="absolute right-0 bottom-2">
                <Image
                  src="/editIcon.svg"
                  alt="editIcon"
                  width={11}
                  height={11}
                />
              </button> */}
            </div>
            {/* UserDetails */}
            <div
              className={`${roboto_400.className} mt-4 hidden opacity-0 md:block md:opacity-100 transition-all delay-200 duration-500 ease-in-out`}
            >
              <h4 className="font-normal text-base text-white uppercase">
                {user?.profile.first_name} {user?.profile.last_name}
              </h4>
              <p className="text-grey_600 text-sm text-center uppercase mt-1">
                ADMIN PANEL
              </p>
            </div>


            {/* navigation */}
            <div className="w-full overflow-y-auto overflow-x-visible mt-6">
              <ul className="w-full mt-6 ">
                {(user?.profile.role !== "superadmin"
                  ? user?.profile.role !== "channel"
                    ? FullSideLinks.splice(4, 0, "withdrawal")
                    : clientsLinks
                  : navLinks
                ).map((link, index) => {
                  return <NavLink key={index} nav={link} />;
                })}
              </ul>

              {user?.profile.role === "superadmin" && (
                <ul className="w-full mt-2 border-t border-grey_dark">
                  {otherNavs.map((link, index) => {
                    return <NavLink key={index} nav={link} className="" />;
                  })}
                </ul>
              )}
            </div>


            {(isEVENT || isChannel || isPodcast || isTVSHOW) && <div>
              <button
                onClick={() => router.push("/cta")}
                className={`${roboto_500.className} ${isActive
                  ? "bg-input_grey text-grey_2"
                  : "bg-red_500 text-white"
                  } hidden sm:inline rounded-md mt-5 px-3 py-1.5 mx-auto text-[18px] text-center`}
              >
                Call To Action
              </button>
              <button
                onClick={() => router.push("/cta")}
                className={`${roboto_500.className} ${isActive
                  ? "bg-input_grey text-grey_2"
                  : "bg-red_500 text-white"
                  } sm:hidden rounded-md mt-5 px-3 py-1.5 mx-auto text-[18px] text-center`}
              >
                CTA
              </button>
            </div>}
          </div>
        </nav>
      )}
    </>
  );
}

export default Siderbar;
