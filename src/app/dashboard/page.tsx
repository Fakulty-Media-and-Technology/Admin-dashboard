"use client";

import { CustomInput } from "@/components/AppLayout";
import {
  RP_Overview,
  RP_Overview3,
  RP_Overview_2,
  TableHeads_Dashboard,
} from "@/config/data/dashboard";
import { roboto_300, roboto_400, roboto_500, roboto_900 } from "@/config/fonts";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { selectShowAcc, setShowAcc } from "@/store/slices/usersSlice";
import { abbreviateNumber } from "@/utilities/abbrebiate";
import { formatAmount, formatWithoutDecimals } from "@/utilities/formatAmount";
import Image from "next/image";
import React, { Fragment, useState } from "react";

function page() {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentId2, setCurrentId2] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<File | null>(null);
  const step = useAppSelector(selectShowAcc);
  const dispatch = useAppDispatch();

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) setUserPic(files[0]);
  }

  const handleAccForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  switch (step) {
    case false:
      return (
        <section
          className={`${roboto_400.className} h-[92%] overflow-y-auto pl-5`}
        >
          <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">
              Home / Dashboard
            </p>
          </div>

          <div className="px-10 bg-black3 py-5 pb-6 mt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p
                className={`${roboto_300.className} font-light text-base text-white mb-2 sm:mb-0`}
              >
                REEPLAY OVERVIEW
              </p>
              <div className="border border-[#3D3C41] rounded py-1 px-3 flex items-center gap-x-2">
                <span
                  className={`${roboto_500.className} font-medium text-sm text-white`}
                >
                  One week
                </span>
                <button
                // onClick={setShowOptions}
                >
                  <Image
                    src="/down.png"
                    width={13}
                    height={8}
                    alt=""
                    className={`transition-all duration-500 ease-in-out ${
                      // showOptions ? "rotate-180" : ""
                      ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col items-start justify-between gap-x-5 flex-wrap">
              {RP_Overview.map((x, i) => {
                const active = currentId === `${i}${x}`;
                return (
                  <div
                    key={i}
                    className="mt-3 flex-1 w-full sm:w-fit cursor-pointer"
                  >
                    <div
                      onClick={() => setCurrentId(`${i}${x}`)}
                      className={`${
                        active ? "border-t-[5px] border-red_500" : ""
                      } min-w-[170px] h-[100px] bg-black2 flex flex-col items-center justify-center`}
                    >
                      <p
                        className={`${roboto_400.className} font-normal text-sm text-white `}
                      >
                        {x.name}
                      </p>
                      <p
                        className={`${roboto_900.className} font-[900] text-2xl text-white`}
                      >
                        {abbreviateNumber(Number(x.value))}
                      </p>
                    </div>

                    {active && (
                      <p
                        className={`${roboto_300.className} font-light text-base text-white text-center mt-3`}
                      >
                        {formatAmount(x.value)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-10 bg-black3 py-12 pb-9 mt-8">
            <div className="flex sm:flex-row flex-col items-start justify-between gap-x-5 flex-wrap">
              {RP_Overview_2.map((x, i) => {
                const active = currentId2 === `${i}${x}`;
                return (
                  <div
                    key={i}
                    className="mt-3 flex-1 w-full sm:w-fit cursor-pointer"
                  >
                    <div
                      onClick={() => setCurrentId2(`${i}${x}`)}
                      className={`${
                        active ? "border-t-[5px] border-red_500" : ""
                      } min-w-[250px] h-[100px] bg-black2 flex flex-col items-center justify-center`}
                    >
                      <p
                        className={`${roboto_400.className} font-normal text-sm text-white `}
                      >
                        {x.name}
                      </p>
                      <p
                        className={`${roboto_900.className} font-[900] text-2xl text-white`}
                      >
                        {x.name === "Total Balance"
                          ? formatWithoutDecimals(Number(x.value)).split(".")[0]
                          : abbreviateNumber(Number(x.value))}
                      </p>
                    </div>

                    {active && (
                      <p
                        className={`${roboto_300.className} font-light text-base text-white text-center mt-3`}
                      >
                        {formatAmount(x.value)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative w-full mt-8">
            <div className="absolute w-full bg-black3 py-5 pb-6 px-10 overflow-x-auto">
              <table className="w-full table">
                <thead className="">
                  <tr>
                    {TableHeads_Dashboard.map((t, i) => {
                      return (
                        <th
                          key={i}
                          className={`${roboto_300.className} font-light text-base text-white uppercase text-wrap text-left`}
                        >
                          {t}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {TableHeads_Dashboard.map((t, i) => {
                    return (
                      <tr key={i}>
                        {RP_Overview3.map((tx, indx) => {
                          return (
                            // <tr>
                            <td
                              className="whitespace-nowrap text-white py-2 px-4"
                              key={indx}
                            >
                              <div className="flex items-center pl-2 py-1 pr-8 border border-border_dark rounded w-fit min-w-[160px]">
                                <Image
                                  src={`/tablepic/${tx.image}.png`}
                                  width={42}
                                  height={42}
                                  alt="profiles"
                                  className="object-contain rounded-full"
                                />
                                <div className="ml-2">
                                  <p
                                    className={`${roboto_500.className} font-medium text-[#fff] text-[15px]`}
                                  >
                                    {tx.name}
                                  </p>
                                  <div className="flex items-center -mt-[2px]">
                                    <Image
                                      src="/views.svg"
                                      width={12.5}
                                      height={10}
                                      alt="views"
                                    />
                                    <p
                                      className={`${roboto_400.className} font-normal text-[13px] text-grey_800 ml-1.5 `}
                                    >
                                      {formatAmount(tx.views)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            // </tr>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );

    case true:
      return (
        <section
          className={`${roboto_400.className} h-[92%] overflow-y-auto pl-5`}
        >
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

          <div className="bg-black3 py-7 px-14 h-screen">
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
  }
}

export default page;
