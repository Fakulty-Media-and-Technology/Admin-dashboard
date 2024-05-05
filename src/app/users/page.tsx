"use client";

import {
  CustomInput,
  InputWithIcon,
  SelectInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { U_Table, U_TableHeads } from "@/config/data/user.data";
import { roboto_400, roboto_500 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Roles = ["Regular", "Client", "Admin", "Super Admin"];
const ClientRoles = ["Channels", "Events", "Tv Show", "Podcast"];

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
            <p className="font-normal text-lg text-grey_700">Home / Users</p>
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
              Add User
            </div>
          </div>

          <div className="relative w-full md:h-[80%] h-[60%] pb-10 overflow-y-auto mt-8 pr-5">
            <div className="absolute w-full py-5 pb-6 pl-0 -ml-4 sm:ml-0 sm:pl-3 pr-10 overflow-x-auto">
              <table className={`${roboto_400.className} w-full min-w-[810px]`}>
                <thead className="">
                  <tr>
                    {U_TableHeads.map((t, i) => {
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
                  {U_Table.map((tx, indx) => {
                    return (
                      <tr key={indx} className="text-white">
                        <td className="text-white py-2 w-[210px]">
                          <div className="flex items-center justify-center pl-2 py-1 rounded">
                            <Image
                              src={`/tablepic/mum.png`}
                              width={42}
                              height={42}
                              alt="profiles"
                              className="object-contain rounded-full"
                            />
                            <p
                              className={`${roboto_500.className} ml-2 font-medium text-[#fff] text-[15px]`}
                            >
                              {tx.name}
                            </p>
                          </div>
                        </td>
                        <td className="text-center font-normal text-xs underline">
                          {tx.email}
                        </td>
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.subs} months
                        </td>
                        <td className="text-center font-normal text-xs">
                          {tx.joined}
                        </td>
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.sub_status}
                        </td>
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.verified}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-x-4">
                            <button>
                              <Image
                                src="/eyeWH.svg"
                                width={16.97}
                                height={13.5}
                                alt="eyeWH"
                              />
                            </button>
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

          <div className="w-full bg-black2 absolute bottom-6 z-50">
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
              Home / Users {role === "user" ? "/ Add" : ""}
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-start  justify-between pr-5">
            <div className="flex ">
              <div className=" ml-14 relative w-fit">
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
                  {role === "user" && (
                    <div className="w-fit relative">
                      <Image src="/accEdit.svg" alt="" width={20} height={20} />
                      <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        className="absolute top-0 -left-3 opacity-0"
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {role === "regular" && (
                <div className="ml-4 mt-3">
                  <p
                    className={`${roboto_500.className} font-medium text-base text-white`}
                  >
                    WALLET BALANCE
                  </p>
                  <p className="font-normal font-sm text-grey_500">$5.2</p>
                </div>
              )}
            </div>

            {/* add butn */}
            <div
              onClick={() => setStage("main")}
              className={`${roboto_500.className} cursor-pointer ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px]`}
            >
              Back
            </div>
          </div>

          <div className="bg-black3 h-[78%] py-7 px-14 mt-4 ">
            <form
              className={`${roboto_400.className} `}
              onSubmit={(e) => handleAccForm(e)}
            >
              <div className="flex flex-col lg:flex-row items-start pt-5 sm:gap-x-0 gap-x-0 lg:gap-x-28 xl:gap-x-40">
                <div className="space-y-4 flex-1 w-full">
                  <div className="">
                    <label
                      htmlFor="name"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      USER ROLE *
                    </label>
                    {userRole === "Client" ? (
                      <div className="flex items-center gap-x-3 w-full">
                        <SelectInputForm
                          placeholder={userRole}
                          setType={setUserRole}
                          selectData={Roles}
                          className="font-normal text-sm py-2 mt-2 border border-border_grey w-[120px] md:w-[140px] lg:w-[160px] rounded-sm"
                          textStyles="text-grey_500"
                        />
                        <div className="flex-1">
                          <SelectInputForm
                            placeholder={clientRole}
                            setType={setClientRole}
                            selectData={ClientRoles}
                            className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                            textStyles="text-grey_500"
                          />
                        </div>
                      </div>
                    ) : (
                      <SelectInputForm
                        placeholder={userRole}
                        setType={setUserRole}
                        selectData={Roles}
                        className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                        textStyles="text-grey_500"
                      />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      FIRST NAME *
                    </label>
                    <CustomInput
                      type="text"
                      id="firstName"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      LAST NAME *
                    </label>
                    <CustomInput
                      type="text"
                      id="lastName"
                      className="font-normal text-sm py-2 mt-2 border text-grey_500 border-border_grey rounded-sm"
                    />
                  </div>

                  <div className="flex items-center gap-x-5 lg:gap-x-10">
                    <div className="flex-1">
                      <p
                        className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                      >
                        PHONE NUMBER *
                      </p>
                      <div className="flex item-center gap-x-3 mt-2">
                        {role === "user" && (
                          <SelectInputForm
                            placeholder="+234"
                            setType={setPhoneNo}
                            selectData={[]}
                            className="border-border_grey w-[130px] text-grey_500 rounded-sm flex-1"
                          />
                        )}

                        <CustomInput
                          type="tel"
                          placeholder={role !== "user" ? "+2340111222333" : ""}
                          className="font-normal flex-1 text-sm py-2 border placeholder:text-input_grey text-grey_500 border-border_grey rounded-sm"
                        />
                      </div>
                    </div>

                    {role !== "user" && (
                      <div className="flex-1">
                        <label
                          htmlFor="subscription"
                          className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                        >
                          TOTAL SUBSCRIPTION *
                        </label>
                        <CustomInput
                          type="text"
                          id="subscription"
                          placeholder="3 Months"
                          className="font-normal text-sm py-2 mt-2 border text-grey_500 placeholder:text-input_grey border-border_grey rounded-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* right */}
                <div className="space-y-4 flex-1 w-full mt-5 lg:mt-0">
                  <div>
                    <label
                      htmlFor="name"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      DATE OF BIRTH *
                    </label>
                    <CustomInput
                      placeholder="DD/MM/YYYY"
                      type="date"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm placeholder:text-input_grey"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      GENDER *
                    </label>
                    <SelectInputForm
                      placeholder={gender}
                      selectData={["Male", "Female"]}
                      setType={setGender}
                      className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                      textStyles="text-grey_500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <CustomInput
                      type="email"
                      id="email"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    />
                  </div>

                  {role === "user" ? (
                    <div>
                      <p
                        className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                      >
                        PASSWORD *
                      </p>
                      <CustomInput
                        type="password"
                        placeholder="****************"
                        className="font-normal flex-1 text-sm py-2 mt-2 border border-border_grey rounded-sm placeholder:text-input_grey"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-5 lg:gap-x-10">
                      <div className="flex-1">
                        <label
                          htmlFor="membership"
                          className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                        >
                          MEMBER SINCE *
                        </label>
                        <CustomInput
                          type="date"
                          id="membership"
                          placeholder="12 Nov 2020"
                          className="font-normal text-sm py-2 mt-2 border text-grey_500 placeholder:text-input_grey border-border_grey rounded-sm"
                        />
                      </div>

                      <div className="flex-1">
                        <label
                          htmlFor="country"
                          className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                        >
                          COUNTRY *
                        </label>
                        <CustomInput
                          type="text"
                          id="country"
                          placeholder="Nigeria"
                          className="font-normal text-sm py-2 mt-2 border text-grey_500 placeholder:text-input_grey border-border_grey rounded-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 -mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-y-5 sm:gap-y-0">
                <div className="flex-1 flex items-center gap-x-6">
                  <p
                    className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
                  >
                    Verify {role !== "user" ? "Status" : "User"} *
                  </p>
                  <div
                    className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${
                      verifyUser
                        ? `${
                            role !== "user"
                              ? "bg-[#00E3A373]"
                              : "bg-[#FF131373]"
                          }`
                        : "bg-[#BCBDBD73]"
                    }`}
                  >
                    <div
                      onClick={setVerifyUser}
                      className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${
                        verifyUser
                          ? `translate-x-5 ${
                              role !== "user" ? "bg-[#00E3A3]" : "bg-red"
                            }`
                          : "-translate-x-0 bg-[#BCBDBD]"
                      } `}
                    />
                  </div>
                </div>

                {role !== "user" && (
                  <div className="flex-1 lg:ml-36 flex items-center gap-x-6">
                    <p
                      className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
                    >
                      Active Subscription *
                    </p>
                    <div
                      className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${
                        subscriptionStatus
                          ? `${
                              role !== "user"
                                ? "bg-[#00E3A373]"
                                : "bg-[#FF131373]"
                            }`
                          : "bg-[#BCBDBD73]"
                      }`}
                    >
                      <div
                        onClick={setSubscriptionStatus}
                        className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${
                          subscriptionStatus
                            ? `translate-x-5 ${
                                role !== "user" ? "bg-[#00E3A3]" : "bg-red"
                              }`
                            : "-translate-x-0 bg-[#BCBDBD]"
                        } `}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  style={{ alignSelf: "center" }}
                  className={`${roboto_500.className} font-medium text-lg text-white bg-green_400 rounded-[5px] w-[145px] py-2 mt-12`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      );
  }
};

export default page;
