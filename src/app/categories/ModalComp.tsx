"use client";

import {
  addCategoryEnums,
  geetFetchCast,
  geetFetchCategories,
  geetFetchGenres,
} from "@/api/categorySlice";
import {
  AppButton,
  CustomInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { roboto_400, roboto_500 } from "@/config/fonts";
import { ICastResponse, ICategoryResponse } from "@/types/api/category.types";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  handleClose: () => void;
  tab: string;
  handleReset: (value: ICastResponse | ICategoryResponse | undefined) => void;
}

export const ModalComponent = ({
  handleClose,
  handleReset,
  tab,
}: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(tab === "cast" ? "Select" : "");
  const [names, setNames] = useState<string>("");
  const [location, setLocation] = useState<string>("Select");
  const [position, setPosition] = useState<string>("Select");
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const maxLength = 200;
  const isDisable = link === "" || names === "" || details === "";

  function reset() {
    setPosition("Select");
    setLocation("Select");
    setTitle(tab === "cast" ? "Select" : "");
    setNames("");
    setLink("");
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setDetails(newText);
    }
  };

  async function submitHandler() {
    try {
      setLoading(true);
      const data =
        tab === "cast"
          ? {
              name: names,
              title,
            }
          : {
              name: title,
            };
      const res = await addCategoryEnums(data, tab);
      if (res.ok && res.data) {
        toast(`Successfully added ${tab}`, {
          type: "success",
        });
        reset();
        const resCAT =
          tab === "category"
            ? await geetFetchCategories()
            : tab === "genre"
            ? await geetFetchGenres()
            : await geetFetchCast();
        if (resCAT.ok && resCAT.data) {
          handleReset(resCAT.data);
        }
      } else {
        toast(`Opps! couldn't add ${tab}`, {
          type: "error",
        });
      }
    } catch (error) {
      toast(`Opps! couldn't add ${tab}`, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="z-[9999] w-[calc(100%-20px)] md:w-[calc(100%-40px)] lg:w-[calc(100%-56px)] absolute top-20 overflow-hidden flex justify-center">
      <div
        style={{
          marginTop: tab === "cast" ? 20 : 40,
        }}
        className="w-[90%] sm:w-[60%] lg:w-[40%] p-5 rounded-[10px] overflow-y-auto bg-black4"
      >
        <div className="ml-auto w-fit" onClick={handleClose}>
          <Image
            src="/closeIcon.svg"
            width={20}
            height={20}
            alt="close modal"
          />
        </div>

        <div
          style={{
            marginBottom: tab === "genre" ? 40 : 20,
          }}
          className="flex flex-col items-center"
        >
          <div className="mt-5 space-y-5 w-[70%]">
            <div>
              <label
                htmlFor="title"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                TITLE *
              </label>
              {tab === "cast" ? (
                <SelectInputForm
                  placeholder={title}
                  setType={setTitle}
                  selectData={["Actor", "Procedure", "Director", "EP"]}
                  className="border-border_grey w-full mt-1.5 text-grey_500 rounded-sm flex-1"
                />
              ) : (
                <CustomInput
                  required
                  type="text"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                />
              )}
            </div>

            {tab === "category" && (
              <div className="z-[10px]">
                <label
                  htmlFor="location"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  LOCATION *
                </label>
                <SelectInputForm
                  placeholder={location}
                  setType={setLocation}
                  selectData={[
                    "Homepage",
                    "Live/Channels",
                    "Live/Events",
                    "Live/Tv Shows",
                    "Live/Sports",
                    "Live/Podcast",
                  ]}
                  className="border-border_grey w-full mt-1.5 text-grey_500 rounded-sm z-[99] flex-1"
                />
              </div>
            )}

            {(tab === "category" || tab === "genre") && (
              <div className="">
                <label
                  htmlFor="position"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  POSITION *
                </label>
                <SelectInputForm
                  placeholder={position}
                  setType={setPosition}
                  selectData={[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                  ]}
                  className="border-border_grey w-full mt-1.5 text-grey_500 z-[9] rounded-sm flex-1"
                />
              </div>
            )}

            {tab === "cast" && (
              <>
                <div>
                  <label
                    htmlFor="names"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                  >
                    NAMES *
                  </label>
                  <CustomInput
                    required
                    type="text"
                    placeholder=""
                    id="names"
                    className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="link"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                  >
                    FAN LINK *
                  </label>
                  <CustomInput
                    required
                    type="text"
                    placeholder="https://"
                    id="names"
                    className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                  />
                </div>

                <div className="">
                  <label
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                  >
                    Details*
                  </label>
                  <div className="h-[90px] relative border border-[#D9D9D938] mt-2">
                    <textarea
                      name="details"
                      maxLength={maxLength}
                      onChange={handleTextChange}
                      className={`${roboto_400.className} textarea w-full h-[90px] p-1 pl-2 outline-none bg-transparent text-sm text-white`}
                    />
                    <p
                      className={`${roboto_400.className} absolute bottom-0 right-1 text-sm text-[#C4C4C4]`}
                    >
                      {details.length}/{maxLength}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <AppButton
            isLoading={loading}
            disabled={
              (tab === "cast" && isDisable) ||
              title === "" ||
              ((tab === "genre" || tab === "category") &&
                position === "Select") ||
              (tab === "category" && location === "Select")
            }
            title="SAVE"
            className="w-[70%] mt-10 text-xl py-2.5"
            onClick={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};
