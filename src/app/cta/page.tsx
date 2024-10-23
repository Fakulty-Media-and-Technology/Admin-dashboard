"use client";

import {
  AppButton,
  CustomInput,
  SelectInputForm,
} from "@/components/AppLayout";
import {
  CTA_Table,
  CTA_TableHeads,
  F_Table,
  F_TableHeads,
} from "@/config/data/featured.data";
import {
  roboto_400,
  roboto_400_italic,
  roboto_500,
  roboto_700,
} from "@/config/fonts";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectUserProfile } from "@/store/slices/usersSlice";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const user = useAppSelector(selectUserProfile);
  const isSuperAdmin = user?.profile.role === "superadmin";
  const [cta, setCTA] = useState<string>("Vote");
  const [isActive, setActive] = useState<boolean>(false);
  const [isShowModal, setShowModal] = useState<boolean>(false);

  return (
    <section className={`${roboto_400.className} relative pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">
          Home / Call To Action
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-y-4 sm:gap-y-0 justify-around">
        <div className="w-[200px]">
          <span
            className={`${roboto_500.className} text-white ml-1 text-base mb-2`}
          >
            CTA
          </span>
          <SelectInputForm
            placeholder={cta}
            setType={setCTA}
            selectData={["Vote"]}
            className="font-normal text-sm mt-2 py-1 pb-1.5 border border-border_grey rounded-md"
            textStyles="text-grey_500 text-sm"
          />
        </div>

        <div className="w-[200px]">
          <span
            className={`${roboto_500.className} text-white ml-1 text-base mb-2`}
          >
            Amount per CTA
          </span>
          <CustomInput
            type="text"
            placeholder="500"
            className="font-normal outline-none bg-transparent text-left mt-2 text-sm py-1 flex-1 border border-border_grey rounded-md"
          />
        </div>

        <div className="">
          <span
            className={`${roboto_500.className} text-white ml-1 text-base mb-2`}
          >
            CTA Status
          </span>
          <div
            className={`w-[45px] h-[18px] mt-2 flex items-center rounded-[15px] ${
              isActive ? "bg-[#FF131373]" : "bg-[#BCBDBD73]"
            }`}
          >
            <div
              onClick={() => setActive(!isActive)}
              className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${
                isActive
                  ? "translate-x-5 bg-red"
                  : "-translate-x-0 bg-[#BCBDBD]"
              } `}
            />
          </div>
        </div>

        <div className="w-[200px]">
          <button
            onClick={() => setShowModal(true)}
            className={`${roboto_500.className} ${
              isShowModal
                ? "bg-input_grey text-grey_2"
                : "bg-red_500 text-white"
            } rounded-md mt-5 px-6 py-2 ml-auto flex items-end text-[18px] text-center hover:scale-[1.1] transition-all duration-100 ease-in`}
          >
            Add Contestants
          </button>
        </div>
      </div>

      {!isSuperAdmin && (
        <ClientsComponent handleClose={() => console.log("first")} />
      )}

      {isShowModal && (
        <ModalComponent handleClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default page;

interface ModalProps {
  handleClose: () => void;
}

export const ModalComponent = ({ handleClose }: ModalProps) => {
  const [userPic, setUserPic] = useState<File | null>(null);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) setUserPic(files[0]);
  }
  return (
    <div className="z-[9999] w-full absolute overflow-hidden flex justify-center inset-0">
      <div className="w-[90%] h-[70%] md:h-[80%] sm:w-[70%] lg:w-[50%] mt-32 p-5 rounded-[10px] bg-black4">
        <div className="ml-auto w-fit" onClick={handleClose}>
          <Image
            src="/closeIcon.svg"
            width={20}
            height={20}
            alt="close modal"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 mt-1 relative">
            {/* Here */}
            {userPic ? (
              <Image
                src={URL.createObjectURL(userPic)}
                width={111}
                height={108}
                alt=""
                className="w-[111px] h-[108px] rounded-full"
              />
            ) : (
              <Image
                src="/accDummy.svg"
                width={111}
                height={108}
                alt=""
                className="w-[111px] h-[108px] rounded-full"
              />
            )}

            <div className="absolute bottom-2 right-0 z-10">
              <div className="w-fit relative">
                <Image src="/editProfile.svg" alt="" width={20} height={20} />
                <input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  className="absolute top-0 -left-3 opacity-0"
                  onChange={(e) => handleInput(e)}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 sm:max-w-[400px]">
            <div>
              <label
                htmlFor="name"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                FIRST AND LAST NAMES *
              </label>
              <CustomInput
                required
                type="text"
                placeholder=""
                id="name"
                className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
              />
            </div>

            <div className="flex items-end gap-x-3 mt-5">
              <div>
                <label
                  htmlFor="occupation"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  OCCUPATION *
                </label>
                <CustomInput
                  required
                  type="text"
                  placeholder=""
                  id="occupation"
                  className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                />
              </div>
              <div className="max-w-[110px]">
                <div className="text-center">
                  <label
                    htmlFor="contestant_number"
                    className={`${roboto_500.className}  text-white align-baseline text-center`}
                  >
                    CONTESTANT NUMBER *
                  </label>
                </div>
                <CustomInput
                  required
                  type="text"
                  placeholder=""
                  id="contestant_number"
                  className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="name"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                BIO *{" "}
                <span
                  className={`${roboto_400_italic.className} text-[15px] text-input_grey`}
                >
                  (Only 25 words alowed)
                </span>
              </label>

              <div>
                <textarea
                  name="bio"
                  id="bio"
                  className="h-[150px] text-grey_800 resize-none w-full outline-none bg-transparent text-sm p-2 pl-4 mt-2 border border-border_grey rounded-sm"
                />
              </div>
            </div>

            <AppButton
              // isLoading={isLoading}
              // disabled={}
              title="SAVE"
              className="w-full mt-2 text-xl py-2.5"
              // onClick={submitHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClientsComponent = ({ handleClose }: ModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectCountry, setCountry] = useState<string>("Select currency");

  return (
    <div className="px-10 bg-black3 py-5 pb-6 mt-12">
      <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between pr-5">
        <div className="w-full sm:w-[326px] lg:w-[606px] md:pl-10 flex items-center">
          <button className="rounded-l-[10px] bg-red_500 py-[14.5px] flex items-center justify-center w-[73px]">
            <Image src="/searchIcon.svg" width={20} height={20} alt="search" />
          </button>
          <input
            type="text"
            placeholder="Search Contestants"
            className="font-normal text-[17px] py-3 pl-6 text-grey_700 flex-1 bg-black2 outline-none placeholder:text-grey_700"
          />
        </div>

        {/* add butn */}
        <div
          // onClick={handleClose}
          className={`${roboto_500.className} flex items-center gap-x-4 md:mr-20 ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-[17px] text-yellow  text-center cursor-pointer`}
        >
          View votes
          <Image src="/votesIcon.svg" width={20} height={20} alt="votes" />
        </div>
      </div>

      <div className="relative w-full md:h-[80%] h-[100%] pb-10 mt-8 pr-5">
        <div className="w-full py-5 pb-6 pl-0 -ml-4 sm:ml-0 sm:pl-3 pr-10 overflow-x-auto">
          <table className={`${roboto_400.className} w-full min-w-[810px]`}>
            <thead className="">
              <tr className="align-text-top">
                {CTA_TableHeads.map((t, i) => {
                  const isCN = t === "contestant number";
                  return (
                    <th
                      key={i}
                      className={`${roboto_500.className} ${
                        isCN ? "max-w-[80px] text-wrap" : "max-w-[120px]"
                      } max-w-[120px] font-medium text-lg  text-white uppercase`}
                    >
                      {t}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {CTA_Table.map((tx, indx) => {
                return (
                  <tr key={indx} className="text-white h-[85px]">
                    <td
                      className="whitespace-nowrap text-white py-2 pr-4 w-[30px]"
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
                        <p
                          className={`${roboto_500.className} ml-2 font-medium text-[#fff] text-[15px]`}
                        >
                          {tx.name}
                        </p>
                      </div>
                    </td>
                    <td className="text-center font-normal text-xs">
                      {tx.occupation}
                    </td>
                    <td className="text-center font-normal text-xs capitalize">
                      {tx.contestant_number}
                    </td>
                    <td className="truncate max-w-[100px] text-center font-normal text-xs capitalize">
                      {tx.bio}
                    </td>
                    <td className="text-center font-normal text-xs capitalize">
                      {tx.votes}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-x-6">
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

      <div className=" relative z-50">
        <div
          className={`${roboto_500.className}  py-2 px-7 flex w-fit items-center border border-[#C4C4C438]`}
        >
          <button
            className={`${roboto_400.className} mr-3 text-[17px] text-grey_500`}
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
            <span className="ml-2 -mr-2">.....</span>
          </div>
          <button
            className={`${roboto_400.className} font-normal ml-2 text-[17px] text-grey_500`}
          >
            Next <span className="text-white mr-2">{`>>`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
