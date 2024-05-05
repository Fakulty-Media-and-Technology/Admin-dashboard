"use client";

import { CustomInput } from "@/components/AppLayout";
import { roboto_400, roboto_500 } from "@/config/fonts";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setShowAcc } from "@/store/slices/usersSlice";
import Image from "next/image";
import React, { useState } from "react";

const AccScreen = () => {
  const dispatch = useAppDispatch();
  const [userPic, setUserPic] = useState<File | null>(null);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) setUserPic(files[0]);
  }

  const handleAccForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <section className={`${roboto_400.className} overflow-y-hidden pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">
          <span
            onClick={() => dispatch(setShowAcc(false))}
            className="cursor-pointer"
          >
            Home
          </span>{" "}
          / Account
        </p>
      </div>

      <div className="my-6 ml-14 relative w-fit">
        {/* Here */}
        {userPic ? (
          <Image
            src={URL.createObjectURL(userPic)}
            width={105}
            height={106}
            alt=""
            className="rounded"
          />
        ) : (
          <Image
            src="/accDummy.svg"
            width={105}
            height={106}
            alt=""
            className="rounded"
          />
        )}

        <div className="absolute -bottom-[3px] -right-[4px] z-10">
          <div className="w-fit relative">
            <Image src="/accEdit.svg" alt="" width={20} height={20} />
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              className="absolute top-0 -left-3 opacity-0"
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
      </div>

      <div className="bg-black3 py-7 px-14 box">
        <form
          className={`${roboto_400.className} `}
          onSubmit={(e) => handleAccForm(e)}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                NAMES *
              </label>
              <CustomInput
                required
                type="text"
                placeholder="Eddels Bette"
                id="name"
                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                EMAIL *
              </label>
              <CustomInput
                required
                type="email"
                placeholder="Eddels@gmail.com"
                id="email"
                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                PASSWORD *
              </label>
              <CustomInput
                required
                type="password"
                placeholder="****************"
                id="password"
                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
              />
            </div>
            <div>
              <p
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                ROLE *
              </p>
              <CustomInput
                contentEditable
                type="text"
                value="Super Admin"
                id="role"
                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              style={{ alignSelf: "center" }}
              className={`${roboto_500.className} font-medium text-lg text-white bg-green_400 rounded-[5px] w-[268px] py-2 mt-12`}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccScreen;
