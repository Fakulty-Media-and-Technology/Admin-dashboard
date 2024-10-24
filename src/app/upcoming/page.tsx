"use client";

import { useGetUpcomingQuery } from "@/api/upcomingSlice";
import {
  CustomInput,
  InputWithIcon,
  SelectInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { UP_Table, UP_TableHeads } from "@/config/data/upcoming.data";
import { roboto_400, roboto_500 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import {
  IUpcomingData,
  IUpcomingEventFormated,
  IUpcomingResponse,
} from "@/types/api/upcoming.types";
import { formatAmount } from "@/utilities/formatAmount";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ImageProps } from "../plans/page";

const page = () => {
  const [stage, setStage] = useState<string>("main");
  const [role, setRole] = useState<string>("user");
  const [userPic, setUserPic] = useState<File | null>(null);
  const [folderpic, setFolderPic] = useState<File | null>(null);
  const [userRole, setUserRole] = useState<string>("Regular");
  const [searchParams, setSearchParams] = useState<string>("");
  const [image, setImage] = useState<ImageProps | null>(null);
  const [coverImage, setCoverImage] = useState<ImageProps | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<
    IUpcomingEventFormated[]
  >([]);
  const [upcomingEventsFiltered, setUpcomingEventsFiltered] = useState<
    IUpcomingEventFormated[]
  >([]);

  const {
    data: upcomingData,
    refetch,
    error,
    isSuccess,
    isLoading,
  } = useGetUpcomingQuery({ limit: 10, page: 1 }, {});

  const transformEventData = (data: IUpcomingData[]) => {
    // if(usersRP.len) return [];
    return data.map((UP) => ({
      ...UP,
      title: UP.title,
      reminder: formatAmount(UP.reminder.length.toString()),
      type: UP.type,
      option: "",
      views: "0",
    }));
  };

  function handleUpcomingList(data: IUpcomingResponse | undefined) {
    if (!data) return;
    const upcomingList = transformEventData(data.data);
    setUpcomingEvents(upcomingList);
    setUpcomingEventsFiltered(upcomingList);
  }

  function handleSearchfilter(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(e.target.value);

    setUpcomingEventsFiltered(
      upcomingEvents.filter((x) => x.title.includes(searchParams))
    );
    if (e.target.value === "") {
      setUpcomingEventsFiltered(upcomingEvents);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, type?: string) {
    const files = e.target.files;
    if (files) {
      if (type === "cover") {
        setCoverImage({
          name: files[0].name,
          url: URL.createObjectURL(files[0]),
        });
      } else {
        setImage({
          name: files[0].name,
          url: URL.createObjectURL(files[0]),
        });
      }
    }
  }
  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) setFolderPic(files[0]);
  }

  const handleAccForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    handleUpcomingList(upcomingData);
  }, [isSuccess]);

  switch (stage) {
    case "main":
      return (
        <section
          className={`${roboto_400.className} relative h-full overflow-y-auto pl-5`}
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
                value={searchParams}
                onChange={(e) => handleSearchfilter(e)}
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
            <div className="absolute w-full py-5 pb-6 pl-0  sm:ml-0 sm:pl-3 md:pl-10 overflow-x-auto">
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
                  {upcomingEventsFiltered.map((tx, indx) => {
                    return (
                      <tr key={indx} className="text-white ">
                        <td
                          className="whitespace-nowrap text-white py-2 pr-4  w-[30px]"
                          key={indx}
                        >
                          <div className="flex items-center pl-2 py-1 pr-1  border-none rounded w-fit  min-w-[140px]">
                            <Image
                              src={`/tablepic/mum.png`}
                              width={42}
                              height={42}
                              alt="profiles"
                              className="object-contain rounded-full"
                            />
                            <div className="ml-2.5">
                              <p
                                className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}
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
                          <div className="flex items-center justify-center gap-x-10">
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

          {/* <div className="w-100 bg-black2 relative top-18 z-50">
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
          </div> */}
        </section>
      );

    case "add":
      return (
        <section
          className={`${roboto_400.className} relative h-full overflow-y-auto pl-5`}
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
          <div className="bg-black3 mt-[40px] px-5 md:px-10 lg:px-14 flex flex-col  md:flex-row items-start  md:gap-x-10 lg:gap-x-16 ">
            <div className="flex-1 ">
              <div className="flex-1">
                <div className="h-[68px] w-full md:w-[364px] mt-10 items-center">
                  <label
                    htmlFor="title"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
                  >
                    Upcoming Title*
                  </label>
                  <CustomInput
                    type="text"
                    id="title"
                    className="font-normal block w-full text-grey_500 text-sm py-2 mt-2.5 border border-[#D9D9D938] rounded-sm"
                  />
                </div>
              </div>

              {/* implementing details */}
              <div className="">
                <div className="h-[139px] w-full md:w-[364px] mt-10">
                  <label
                    htmlFor="title"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
                  >
                    Details *
                  </label>
                  <CustomInput
                    type="text"
                    id="details"
                    className="h-[111px] mt-3 border-[#D9D9D938]"
                  />
                </div>
              </div>

              {/* implementing release date */}
              <div className="h-[68px] w-full md:w-[364px] mt-10 items-center">
                <label
                  htmlFor="date"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
                >
                  RELEASE DATE *
                </label>
                <CustomInput
                  type="text"
                  id="date"
                  readOnly
                  className="font-normal block w-[157px] text-grey_500 text-sm py-2 mt-2.5 border border-[#D9D9D938] rounded-sm"
                />
              </div>

              {/* implementing the last save and  */}
              <div className="">
                <div className="h-[200px] w-full md:w-[364px]">
                  <button
                    type="submit"
                    style={{ alignSelf: "center" }}
                    className={`${roboto_500.className} font-medium text-lg text-white rounded-[5px] w-[145px] py-2 mt-20 bg-red_500`}
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* last div for the body */}
            </div>

            <div className="flex-1">
              <div className="flex-1 lg:mr-2">
                <div className="w-full md:w-[350px] md:ml-auto mt-10">
                  <p
                    className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
                  >
                    Upload Landscape Image *
                  </p>
                  <div className="flex justify-between w-full border overflow-hidden border-[#D9D9D938] rounded-tr-[5px] rounded-br-[5px]">
                    <div className="flex items-center ml-5 py-2 relative">
                      <div
                        className={`${roboto_500.className} min-w-fit mr-3 bg-grey_500 rounded-[4px] border border-white py-[3px] px-2 text-xs text-black`}
                      >
                        Choose File
                      </div>
                      <span
                        className={`${roboto_400.className} truncate text-xs text-grey_500`}
                      >
                        {coverImage ? coverImage.name : "No File selected"}
                      </span>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => handleInput(e, "cover")}
                        className="absolute z-20 opacity-0"
                      />
                    </div>
                    <div
                      className={`${roboto_500.className} text-white text-[15px] bg-[#EE2726] h-[42px] px-4 flex items-center justify-center`}
                    >
                      UPLOAD
                    </div>
                  </div>

                  <div className="h-[150px] flex flex-row items-end mt-10 justify-center gap-x-3">
                    {coverImage && (
                      <>
                        <Image
                          id="upload"
                          src={coverImage.url}
                          width={298}
                          height={159}
                          alt="uploaded"
                          className="rounded-[10px]"
                        />
                        <button
                          className="hover:scale-110 transition-all duration-200"
                          onClick={() => setCoverImage(null)}
                        >
                          <Image
                            src="/delete.svg"
                            width={16}
                            height={16}
                            alt="delete icon"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-[350px] md:ml-auto mt-16">
                  <p
                    className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
                  >
                    Upload Portait Image *
                  </p>
                  <div className="flex justify-between w-full border overflow-hidden border-[#D9D9D938] rounded-tr-[5px] rounded-br-[5px]">
                    <div className="flex items-center ml-5 py-2 relative">
                      <div
                        className={`${roboto_500.className} min-w-fit mr-3 bg-grey_500 rounded-[4px] border border-white py-[3px] px-2 text-xs text-black`}
                      >
                        Choose File
                      </div>
                      <span
                        className={`${roboto_400.className} truncate text-xs text-grey_500`}
                      >
                        {image ? image.name : "No File selected"}
                      </span>
                      <input
                        type="file"
                        id="file"
                        onChange={handleInput}
                        className="absolute z-20 opacity-0"
                      />
                    </div>
                    <div
                      className={`${roboto_500.className} text-white text-[15px] bg-[#EE2726] h-[42px] px-4 flex items-center justify-center`}
                    >
                      UPLOAD
                    </div>
                  </div>

                  <div className="h-[163px] flex flex-row items-end mt-1 justify-center gap-x-3">
                    {image && (
                      <>
                        <Image
                          // id="upload"
                          src={image.url}
                          width={110}
                          height={153}
                          alt="uploaded"
                          className="h-[120px] rounded-[10px]"
                        />
                        <button
                          className="hover:scale-110 transition-all duration-200"
                          onClick={() => setImage(null)}
                        >
                          <Image
                            src="/delete.svg"
                            width={16}
                            height={16}
                            alt="delete icon"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
};

export default page;
