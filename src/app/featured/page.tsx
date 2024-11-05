"use client";

import {
  addFeaturedContent,
  searchFeaturedContent,
  useSearchFeaturedContentMutation,
} from "@/api/featureSlice";
import {
  AppButton,
  CustomInput,
  InputWithIcon,
  SelectInput,
  SelectInputForm,
} from "@/components/AppLayout";
import {
  EmptyFeatured,
  F_Table,
  F_TableHeads,
} from "@/config/data/featured.data";
import { roboto_400, roboto_500 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import Lottie from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/config/lottie/loading.json";
import { IAddFeatured, ILiveContents } from "@/types/api/featured.types";
import { getFutureDateInISO } from "@/utilities/dateUtilities";

export const runtime = "edge";


export default function page() {
  const [stage, setStage] = useState<string>("main");
  const [role, setRole] = useState<string>("user");
  const [userRole, setUserRole] = useState<string>("Regular");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingX, setLoadingX] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expiryHours, setExpiryHours] = useState<number>(0);
  const [addFeatured, setAddFeatured] = useState<IAddFeatured>(EmptyFeatured);
  const [contentImg, setContentImg] = useState({
    potrait: "",
    landscape: "",
  });
  const [searchContent, { isLoading }] = useSearchFeaturedContentMutation();
  const [searchedContentList, setContentList] = useState<ILiveContents[]>([]);
  const [selectedContent, setSelectedContent] = useState<ILiveContents | null>(
    null
  );

  function handleExpiryHours(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setExpiryHours(Number(inputValue));
      const expTime = getFutureDateInISO(Number(inputValue));
      setAddFeatured((prev) => ({
        ...prev,
        expiry: expTime,
      }));
    }
  }

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchTerm(e.target.value);

    if (e.target.value === "") setContentList([]);
    try {
      setLoading(true);
      const res = await searchFeaturedContent(e.target.value);
      console.log(res);
      if ((res.status === 200 || res.status === 201) && res.data) {
        // let nameList: string[] = [];
        // res.data.data.lives_contents.map((x) => nameList.push(x.title));
        setContentList(res.data.data.lives_contents);
      }
    } catch (error) {
      toast("Opps! couldn't search for content!", { type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleAddFeatured() {
    try {
      setLoadingX(true);
      const res = await addFeaturedContent(addFeatured);
      console.log(res);
      if (res.ok && res.data) {
        toast("Featured content added successfully", { type: "success" });
        setAddFeatured(EmptyFeatured);
        setSelectedContent(null);
        setExpiryHours(0);
      }
    } catch (error) {
      toast("Opps! add featured content", { type: "error" });
    } finally {
      setLoadingX(false);
    }
  }

  switch (stage) {
    case "main":
      return (
        <section
          className={`${roboto_400.className} relative h-full overflow-y-auto pl-5`}
        >
          <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">
              Home / Featured Content
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

          {/* <div className="bg-black2 relative z-50">
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
              Home / Featured Content {role === "user" ? "/ Add" : ""}
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between pr-5 relative">
            <div className="relative">
              <div className="w-full sm:w-[326px] lg:w-[556px] flex items-center">
                <button className="rounded-l-[10px] bg-red_500 py-[14px] flex items-center justify-center w-[63px]">
                  {loading ? (
                    <Lottie
                      animationData={LoadingSpinner}
                      loop
                      style={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <Image
                      src="/searchIcon.svg"
                      width={20}
                      height={20}
                      alt="search"
                    />
                  )}
                </button>
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search Content to add"
                  className="font-normal text-[17px] py-[11.5px] pl-6 text-grey_700 flex-1 bg-black3 outline-none placeholder:text-grey_700"
                  onChange={(e) => handleSearch(e)}
                />
              </div>

              {searchedContentList.length > 0 && (
                <div className="absolute top-12 mt-2 w-full border border-grey_1 rounded">
                  {searchedContentList.map((content, i) => {
                    return (
                      <div
                        onClick={() => [
                          setSelectedContent(content),
                          setSearchTerm(""),
                          setContentList([]),
                          setAddFeatured((prev) => ({
                            ...prev,
                            id: content._id,
                            type: content.type === "vod" ? "vod" : "event",
                          })),
                        ]}
                        className="text-white bg-black2 p-3 w-full"
                        key={i}
                      >
                        {content.title}
                      </div>
                    );
                  })}
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

          <div className="mt-20 bg-black3 p-6 px-6 lg:px-12">
            <div className="">
              <label
                htmlFor="firstName"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
              >
                TITLE
              </label>
              <CustomInput
                type="text"
                id="firstName"
                readOnly
                className="font-normal text-grey_500 text-sm py-2 mt-2 mb-5 border border-border_grey rounded-sm"
                value={selectedContent?.title ?? ""}
              />
              <label
                htmlFor="firstName"
                className={`${roboto_500.className} font-medium text-white text-center ml-2.5 pt-4`}
              >
                EXPIRES IN{" "}
                <span
                  className={`${roboto_400.className} text-sm text-grey_800`}
                >
                  (Hours)
                </span>
              </label>
              <CustomInput
                type="text"
                id="firstName"
                value={expiryHours}
                className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                onChange={(e) => handleExpiryHours(e)}
              />
            </div>

            {(contentImg.landscape !== "" || contentImg.potrait !== "") && (
              <div className="mt-8 min-h-[436px] flex">
                <Image
                  src={contentImg.potrait}
                  alt=""
                  width={347}
                  height={436}
                  className="w-[347px] h-[436px] mr-2"
                />
                <Image
                  src={contentImg.landscape}
                  alt=""
                  width={347}
                  height={436}
                  className="max-w-[700px] h-[436px] flex-1 object-cover"
                />
              </div>
            )}

            {/* savebutton */}
            <div className="mt-10">
              <AppButton
                disabled={
                  addFeatured.expiry === "" ||
                  addFeatured.id === "" ||
                  addFeatured.type === ""
                }
                title="SAVE"
                className="py-2 px-14 text-xl"
                isLoading={loadingX}
                onClick={handleAddFeatured}
              />
            </div>
          </div>
        </section>
      );
  }
};

