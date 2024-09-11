"use client";

import {
  CustomInput,
  InputWithIcon,
  SelectInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { F_Table, F_TableHeads } from "@/config/data/featured.data";
import { roboto_400, roboto_500 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import React, { useEffect, useState } from "react";


const page = () => {
  const [stage, setStage] = useState<string>("main");
  const [role, setRole] = useState<string>("user");
  const [clientRole, setClientRole] = useState<string>("Select Client type");
  const [userPic, setUserPic] = useState<File | null>(null);
  const [userRole, setUserRole] = useState<string>("Regular");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [gender, setGender] = useState<string>("Select your gender");
  const [verifyUser, setVerifyUser] = useToggle();
  const [subscriptionStatus, setSubscriptionStatus] = useToggle();

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) setUserPic(files[0]);
  }

  const handleAccForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (userRole === "Client") {
      setRole("client");
    } else {
      setRole("user");
    }
  }, [userRole]);

  switch (stage) {
    case "main":
      return (
        <section
          className={`${roboto_400.className} relative h-[92%] overflow-y-auto pl-5`}
        >
          <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">Home / Featured Content</p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between pr-5">
            <div className="w-full sm:w-[326px] lg:w-[556px] flex items-center">
              <button className="rounded-l-[10px] bg-red_500 py-[14.5px] flex items-center justify-center w-[63px]">
                <Image
                  src="/searchIcon.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </button>
              <input
                type="text"
                placeholder="Search User"
                className="font-normal text-[17px] py-3 pl-6 text-grey_700 flex-1 bg-black3 outline-none placeholder:text-grey_700"
              />
            </div>

            {/* add butn */}
            <div
              onClick={() => setStage("add")}
              className={`${roboto_500.className} ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px] cursor-pointer`}
            >
              Add Feature
            </div>
          </div>

          <div className="relative w-full md:h-[80%] h-[100%] pb-10 mt-8 pr-5">
            <div className="absolute w-full py-5 pb-6 pl-0 -ml-4 sm:ml-0 sm:pl-3 pr-10 overflow-x-auto">
              <table className={`${roboto_400.className} w-full min-w-[810px]`}>
                <thead className="">
                  <tr>
                    {F_TableHeads.map((t, i) => {
                      return (
                        <th
                          key={i}
                          className={`${roboto_500.className} font-medium text-lg text-white uppercase`}
                        >
                          {t}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {F_Table.map((tx, indx) => {
                    return (
                      <tr key={indx} className="text-white">
                        <td
                          className="whitespace-nowrap text-white py-2 pr-4  w-[30px]"
                          key={indx}
                        >
                          <div className="flex items-center pl-2 py-1 pr-1  border-none rounded w-fit  min-w-[160px]">
                            <Image
                              src={`/tablepic/mum.png`}
                              width={42}
                              height={42}
                              alt="profiles"
                              className="object-contain rounded-full"
                            />
                            <div className="ml-2">
                              <p
                                className={`${roboto_500.className} font-medium text-[#fff] text-[15px]`}
                              >
                                {tx.title}
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
                                  {tx.views}
                                </p>
                              </div>
                            </div>
                          </div>

                        </td>
                        <td className="text-center font-normal text-xs">
                          {tx.rating}
                        </td>
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.class}
                        </td>
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.type}
                        </td>
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.expired}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-x-4">
                            <button>
                              <Image
                                src="/edit.svg"
                                width={14}
                                height={14}
                                alt="edit"
                              />
                            </button>
                            <button>
                              <Image
                                src="/delete.svg"
                                width={15}
                                height={18}
                                alt="delete"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-100 bg-black2 relative top- z-50">
            <div
              className={`${roboto_500.className} py-2 px-7 ml-16 flex w-fit items-center border border-[#C4C4C438]`}
            >
              <button
                className={`${roboto_400.className} font-normal mr-3 text-[17px] text-grey_500`}
              >
                <span className="text-white mr-2">{`<<`}</span>
                Previous
              </button>
              <div className="text-grey_500 text-[17px] font-medium space-x-1.5">
                <span className="text-red">1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span className="ml-2 -mr-2">.....</span>
              </div>
              <button
                className={`${roboto_400.className} font-normal ml-2 text-[17px] text-grey_500`}
              >
                Next <span className="text-white mr-2">{`>>`}</span>
              </button>
            </div>
          </div>
        </section>
      );

    case "add":
      return (
        <section
          className={`${roboto_400.className} relative h-[92%] overflow-y-auto pl-5`}
        >
        <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">
              Home / Featured Content {role === "user" ? "/ Add" : ""}
            </p>
          </div>


          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between pr-5">
            <div className="w-full sm:w-[326px] lg:w-[556px] flex items-center">
              <button className="rounded-l-[10px] bg-red_500 py-[14.5px] flex items-center justify-center w-[63px]">
                <Image
                  src="/searchIcon.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </button>
              <input
                type="text"
                placeholder="Search Content to add"
                className="font-normal text-[17px] py-3 pl-6 text-grey_700 flex-1 bg-black3 outline-none placeholder:text-grey_700"
              />
            </div>
             {/* add butn */}
             <div
              onClick={() => setStage("main")}
              className={`${roboto_500.className} cursor-pointer ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px]`}
            >
              Back
            </div>
            </div>

            <div className="feature">
            <div className="Two-feature">
            <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
                    >
                      TITLE
                    </label>
                    <CustomInput
                      type="text"
                      id="firstName"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    />
            <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} font-medium text-white text-center ml-2.5 pt-4`}
                    >
                      EXPIRES IN
                    </label>
                    <CustomInput
                      type="text"
                      id="firstName"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    />
            </div>

            <div className="mt-4 flex">
            <img src="/tablepic/swallowtwo.png" alt="" className="swallowone"/>
            <img src="/tablepic/swallowone.png" alt="" className="swallowtwo" />
            </div>


          {/* savebutton */}
          <button><h1
          className="save">
            save</h1></button>
            </div>
          </section>
      );
  }
};

export default page;

