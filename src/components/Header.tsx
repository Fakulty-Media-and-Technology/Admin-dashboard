"use client";

import { roboto_400 } from "@/config/fonts";
import { useAppDispatch } from "@/hooks/reduxHook";
import useToggle from "@/hooks/useToggle";
import { setShowAcc } from "@/store/slices/usersSlice";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const userOptions = ["account", "reports", "light mode", "log out"];

function Header() {
  const pathname = usePathname();
  const [activeMode, setActiveMode] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useToggle();
  const dispatch = useAppDispatch();

  function handleOption(query: string) {
    if (query === "account") {
      dispatch(setShowAcc(true));
      setShowOptions();
    }
  }

  return (
    <>
      {pathname !== "/" && (
        <header className="relative pt-7 pb-4">
          <div className="flex items-center justify-end gap-x-6 pr-6">
            <button>
              <Image src="/broadcast.svg" alt="" width={20} height={20} />
            </button>
            <button>
              <Image src="/notification.svg" alt="" width={24} height={24} />
            </button>
            <button>
              <Image src="/user.png" alt="" width={27} height={27} />
            </button>

            <div className="flex items-center">
              <span
                className={`${roboto_400.className} font-normal text-lg text-white mr-2`}
              >
                EB
              </span>
              <button onClick={setShowOptions}>
                <Image
                  src="/down.png"
                  width={17}
                  height={12}
                  alt=""
                  className={`transition-all duration-500 ease-in-out ${
                    showOptions ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {showOptions && (
            <div className="w-[215px] h-[230px] bg-white pt-8 pl-4 space-y-4 absolute right-7 mt-2 z-50">
              {userOptions.map((options, index) => {
                return (
                  <div
                    onClick={() => handleOption(options)}
                    key={index}
                    className="flex items-center gap-x-[18px] cursor-pointer"
                  >
                    {options !== "light mode" ? (
                      <Image
                        src={`/${options}.svg`}
                        alt=""
                        width={22}
                        height={22}
                      />
                    ) : (
                      <div
                        onClick={() => setActiveMode(!activeMode)}
                        className="w-[25px] h-[13px] bg-black3 rounded-[24px]"
                      >
                        <div
                          className={`w-[8px] h-[8px] mt-[2.5px] ml-[3px] transition-all duration-500 ease-in-out rounded-full bg-white ${
                            activeMode ? "translate-x-3" : "translate-x-0"
                          }`}
                        />
                      </div>
                    )}
                    <span
                      className={`${roboto_400.className}  capitalize font-normal text-lg text-black3`}
                    >
                      {options}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </header>
      )}
    </>
  );
}

export default Header;
