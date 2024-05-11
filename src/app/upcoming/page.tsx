"use client";

import {
  CustomInput,
  InputWithIcon,
  SelectInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { UP_Table, UP_TableHeads } from "@/config/data/upcoming.data";
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
            <p className="font-normal text-lg text-grey_700">Home / Upcoming</p>
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
                placeholder="Search Upcoming"
                className="font-normal text-[17px] py-3 pl-6 text-grey_700 flex-1 bg-black3 outline-none placeholder:text-grey_700"
              />
            </div>

            {/* add butn */}
            <div
              onClick={() => setStage("add")}
              className={`${roboto_500.className} ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px] cursor-pointer`}
            >
              Add
            </div>
          </div>

          <div className="relative w-full md:h-[80%] h-[100%] pb-10 mt-8 pr-5">
            <div className="absolute w-full py-5 pb-6 pl-0 -ml-4 sm:ml-0 sm:pl-3 pr-10 overflow-x-auto">
              <table className={`${roboto_400.className} w-full min-w-[810px]`}>
                <thead className="">
                  <tr>
                    {UP_TableHeads.map((t, i) => {
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
                  {UP_Table.map((tx, indx) => {
                    return (

                      <tr key={indx} className="text-white ">
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

                        <td className="text-center font-normal text-xs capitalize">
                          {tx.reminder}
                        </td>
  
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.type}
                        </td>
                        
                        
                        <td className="w-[400px]">
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


          <div className="w-100 bg-black2 relative top-18 z-50">
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
              Home / Upcoming {role === "user" ? "/ Add" : ""}
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

            {/* Implementing inside element */}
            <div className="h-[800px] bg-black3 mt-[40px]">
              <div className="total">
                <div className="h-[68px] w-[364px] mt-10 items-center">
                <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
                    >
                      Upcoming Title*
                    </label>
                    <CustomInput
                      type="text"
                      id="firstName"
                      className="font-normal block w-[364px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    />
                </div>

                <div className="h-[69.3px] w-[321px] mt-10">
                <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} text-[14px] text-[#909090] text-base ml-2.5 pt-8 w-[179px] h-[21px]`}
                    >
                      Upload landscape image*
                    </label>
                    <div className="w-[321px] h-[38px] mt-[5px]">
                <input type="file" name="" id=""  className="text-grey_1" accept=".png, .jpeg, .jpg" onChange={(e) => handleInput(e)}/>
                <button type="submit" className="bg-red_500 w-[93px] h-[38px] text-[15px relative left-[210px] rounded-r-md bottom-[32px] text-white">Upload</button>
                <div className=" mt-[20px] w-[232px] h-[133px]">
                {userPic ? (
      <Image
        src={URL.createObjectURL(userPic)}
        width={232}
        height={133}
        alt=""
        className="rounded"
      />
    ) : (
      <Image
        src="/accDummy.svg"
        width={105}
        height={106}
        alt=""
        className="rounded opacity-0"
        
      />
    )}
                </div>
                    </div> 

                </div>
                </div>

                {/* implementing details */}
                <div className="total-2">
                <div className="h-[139px] w-[364px] mt-10">
                <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} text-[14px] text-[#909090] text-base ml-2.5 pt-8 w-[179px] h-[21px]`}
                    >
                      Details*
                    </label>
                    <CustomInput
                      type = "text"
                      id="details"
                      className="h-[111px]"
                      />
                </div>
                 <div className="flex gap-[60px]">
                <img src="/tablepic/channels box.jpg" alt=""
                className="h-[133.04px] w-[232.74px] mt-12 opacity-0"
                />
                
                <Image
                                src="/delete.svg"
                                width={15}
                                height={18}
                                alt="delete"
                                className="mt-[160px]"
                              />
                </div>               
            </div>

                {/* implementing release date */}
                <div className="total">
                <div className="h-[68px] w-[364px] mt-10 items-center">
                <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
                    >
                      Release Date*
                    </label>
                    <div className="border border-[#3D3C41] rounded py-1 px-3 flex items-center gap-x-4 w-[150px] mt-[8px]">
            <span
              className={`${roboto_500.className} font-medium text-sm text-[#909090]`}
            >
              12/05/2023
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

                <div className="h-[69.3px] w-[321px] mt-10">
                <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} text-[14px] text-[#909090] text-base ml-2.5 pt-8 w-[179px] h-[21px]`}
                    >
                      Upload potrait image*
                    </label>
                    <div className="w-[321px] h-[38px] mt-[5px]">
                    <input type="file" name="" id=""  className="text-grey_1" accept=".png, .jpeg, .jpg" onChange={(e) => handleInput(e)}/>
                <button type="submit" className="bg-red_500 w-[93px] h-[38px] text-[15px relative left-[210px] rounded-r-md bottom-[32px] text-white">Upload</button>
                <div className=" mt-[20px] w-[232px] h-[133px]">
                {userPic ? (
      <Image
        src={URL.createObjectURL(userPic)}
        width={232}
        height={133}
        alt=""
        className="rounded"
      />
    ) : (
      <Image
        src="/accDummy.svg"
        width={105}
        height={106}
        alt=""
        className="rounded opacity-0"
        
      />
    )}
                </div>
                </div>
                </div>
                </div>

                  {/* implementing the last save and  */}
                  <div className="total-2">
                <div className="h-[200px] w-[364px]">
                <button
                  type="submit"
                  style={{ alignSelf: "center" }}
                  className={`${roboto_500.className} font-medium text-lg text-white rounded-[5px] w-[145px] py-2 mt-20 bg-red_500`}
                >
                  Save
                </button>
                </div>
                 <div className="flex gap-[60px]">
                <img src="/tablepic/channels box.jpg" alt=""
                className="h-[133.04px] w-[232.74px] mt-12 opacity-0"
                />
                
                <Image
                                src="/delete.svg"
                                width={15}
                                height={18}
                                alt="delete"
                                className="mt-[160px]"
                              />
                </div>               
            </div>
            {/* last div for the body */}
            </div>
            

          </section>
      );
  }
};

export default page;

