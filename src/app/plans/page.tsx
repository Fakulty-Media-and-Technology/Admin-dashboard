"use client";

import { useEventEstimateMutation } from "@/api/extra.api";
import {
  AppButton,
  CustomInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { roboto_400, roboto_500, roboto_700 } from "@/config/fonts";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectUserProfile } from "@/store/slices/usersSlice";
import { getDates } from "@/utilities/dateUtilities";
import { formatAmount } from "@/utilities/formatAmount";
import Image from "next/image";
import React, { useState } from "react";
import LoadingSpinner from "@/config/lottie/loading.json";
import Lottie from "lottie-react";
import ReactPlayer from "react-player";
import SuperAdminComp from "./SuperAdminComp";

const page = () => {
  const user = useAppSelector(selectUserProfile);
  const isSuperAdmin = user?.profile?.role === "superadmin";
  const isClient = user?.profile?.role === "channel" || user?.profile?.role === "tvshow" || user?.profile?.role === "event" || user?.profile?.role === "podcast";

  return (
    <section className={`${roboto_400.className} h-full overflow-y-auto pl-5`}>
      <div className="bg-black3 py-3 px-10">
        <p className="font-normal text-lg text-grey_700">
          Home / {isSuperAdmin ? "Sub" : "create"}
        </p>
      </div>

      {isSuperAdmin && <SuperAdminComp />}
      {isClient && <ClientsComponent />}
    </section>
  );
};

export default page;

export interface ImageProps {
  name: string;
  url: string;
}

const paymentMethods = ["Visa/mastercard", "Paypal", "Crypto", "Bank Transfer"];

export const ClientsComponent = () => {
  const user = useAppSelector(selectUserProfile);
  const [_class, setClass] = useState<string>("Select");
  const [pg, setPG] = useState<string>("Select");
  const [isActive, setActive] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<ImageProps | null>(null);
  const [videoTrailer, setVideoTrailer] = useState<ImageProps | null>(null);
  const [image, setImage] = useState<ImageProps | null>(null);
  const [selectPaymentMethod, setPaymentMethod] = useState<string>(
    "Select payment method"
  );
  const [catText, setCatText] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [isPaymentActive, setIsPaymentActive] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [eventEstimatedPrice, setEventEstimatedPrice] = useState<number>(0);
  const [eventHours, setEventHours] = useState<string>("0");
  const [details, setDetails] = useState(""); // State to store the textarea content
  const maxLength = 200;
  const isEVENT = user?.profile?.role === "event";
  const isTVSHOW = user?.profile?.role === "tvshow";
  const isChannel = user?.profile?.role === "channel";

  const [handleEstimate, { isLoading: isEstimatedLoading }] =
    useEventEstimateMutation();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setDetails(newText);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newItem = value.split(",")[0].trim();

      setItems([newItem, ...items]);

      setCatText("");
    } else {
      setCatText(value);
    }
  };

  function handleDelete(value: string) {
    setItems((prev) => prev.filter((item) => item !== value));
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, type?: string) {
    const files = e.target.files;
    if (files) {
      if (type === "cover") {
        setCoverImage({
          name: files[0].name,
          url: URL.createObjectURL(files[0]),
        });
      } else if (type === "video") {
        setVideoTrailer({
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

  const handleGetEstimatedPrice = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { end, start } = getDates(Number(e.target.value));
    setEventHours(e.target.value);

    const res = await handleEstimate({ end, start }).unwrap();
    console.log(res);
    if (res.data) {
      setEventEstimatedPrice(res.data.estimated_cost);
    }
  };

  function handleVideo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsPlaying(true);
  }

  return (
    <div className="relative">
      <AppButton
        title="Back"
        className="px-12 py-2 my-10 ml-auto mr-10 rounded-none rounded-tr-[10px] rounded-br-[10px]"
      />

      <div className="min-w-fit w-full h-full bg-black3 mt-12 p-5 lg:p-10 lg:pl-16 lg:pt-16">
        <div className="flex md:flex-row items-start  md:gap-x-10 lg:gap-x-16">
          {/* LEFT START */}
          <div className="flex-1 space-y-5">
            {isChannel ? (
              <div className="w-[75%]">
                <label
                  htmlFor="name"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                >
                  CHANNEL NAME *
                </label>
                <CustomInput
                  required
                  type="text"
                  placeholder=""
                  id="name"
                  className="font-normal text-sm py-1 mt-2 border border-border_grey rounded-sm"
                />
              </div>
            ) : (
              <>
                <div className="w-[75%]">
                  <label
                    htmlFor="name"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                  >
                    {isEVENT ? "EVENT" : isTVSHOW ? "SHOW" : ""} TITLE*
                  </label>
                  <CustomInput
                    required
                    type="text"
                    placeholder=""
                    id="name"
                    className="font-normal text-sm py-1 mt-2 border border-border_grey rounded-sm"
                  />
                </div>

                <div className="w-[75%]">
                  <label
                    htmlFor="subtitle"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                  >
                    SUB TITLE*
                  </label>
                  <CustomInput
                    required
                    type="text"
                    placeholder=""
                    id="name"
                    className="font-normal text-sm py-1 mt-2 border border-border_grey rounded-sm"
                  />
                </div>
              </>
            )}

            <div className="flex flex-row items-start w-[75%] gap-x-5 lg:gap-x-14">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                >
                  CLASS*
                </label>
                <SelectInputForm
                  placeholder={_class}
                  setType={setClass}
                  selectData={["Free", "Premium", "Exclusive"]}
                  className="font-normal h-[30px] mt-1 text-sm py-2 lg:pl-3 border border-border_grey rounded-sm"
                  textStyles="text-grey_500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  PG*
                </label>
                <SelectInputForm
                  placeholder={pg}
                  setType={setPG}
                  selectData={["13+", "18+"]}
                  className="font-normal h-[30px] mt-1 text-sm py-2 lg:pl-3 border border-border_grey rounded-sm"
                  textStyles="text-grey_500 text-sm"
                />
              </div>
            </div>

            <div className="">
              <label
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
              >
                CATEGORY{" "}
                <span
                  className={`${roboto_500.className} font-medium text-[15px] text-[#909090]`}
                >
                  (separate with a comma)
                </span>
                *
              </label>
              <div className="h-[140px] border border-[#D9D9D938] mt-2 p-1 overflow-y-auto">
                <input
                  type="text"
                  placeholder="Start typing..."
                  className={`${roboto_500.className} w-full outline-none bg-transparent text-sm text-white placeholder:text-grey_600/50`}
                  value={catText}
                  onChange={handleInputChange}
                />

                <div className="flex flex-row flex-wrap gap-x-3 gap-y-1.5 mt-2">
                  {items.map((item, i) => {
                    return (
                      <div
                        key={i + item}
                        className="flex flex-row items-center gap-x-[2px]"
                      >
                        <span
                          className={`${roboto_500.className} text-sm text-white`}
                        >
                          {item}
                        </span>
                        <button onClick={() => handleDelete(item)}>
                          <Image
                            src="/small_close_btn.svg"
                            width={9}
                            height={9}
                            alt=""
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                  className={`${roboto_400.className} textarea w-full h-[80px] p-1 pl-2 outline-none bg-transparent text-sm text-white`}
                />
                <p
                  className={`${roboto_400.className} absolute bottom-0 right-1 text-sm text-[#C4C4C4]`}
                >
                  {details.length}/{maxLength}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-start justify-between">
              <div className="min-w-fit">
                <label
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                >
                  EXPIRES{" "}
                  <span
                    className={`${roboto_500.className} font-medium text-[15px] text-[#909090]`}
                  >
                    (in Hours)
                  </span>
                  *
                </label>
                <div className="flex flex-row gap-x-2 items-center mt-2.5">
                  <CustomInput
                    required
                    type="text"
                    placeholder="0"
                    id="name"
                    className="w-[83px] font-normal text-sm text-center py-1 border border-border_grey rounded-sm"
                    onChange={(e) => handleGetEstimatedPrice(e)}
                  />

                  <button
                    className={`${roboto_400.className} min-w-fit py-1 px-2 text-[#747474] text-sm bg-[#333333]`}
                  >
                    Extend Hours
                  </button>
                </div>
                <div
                  className={`${roboto_500.className} flex flex-row items-center gap-x-2 text-[#909090] text-[32px] mt-2.5`}
                >
                  ₦{formatAmount(eventEstimatedPrice.toString())}.00
                  {isEstimatedLoading && (
                    <Lottie
                      animationData={LoadingSpinner}
                      loop
                      style={{ width: 35, height: 35, marginRight: 5 }}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-row items-center gap-x-2 mr-20 mt-2">
                <span
                  className={`${roboto_500.className} text-white ml-1 text-base`}
                >
                  Active
                </span>
                <div
                  className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${isActive ? "bg-[#00E3A373]" : "bg-[#BCBDBD73]"
                    }`}
                >
                  <div
                    onClick={() => setActive(!isActive)}
                    className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${isActive
                      ? "translate-x-5 bg-green_400"
                      : "-translate-x-0 bg-[#BCBDBD]"
                      } `}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* LEFT END */}

          {/* RIGHT START */}
          <div className="flex-1 lg:mr-2">
            <div className="w-full md:w-[350px] md:ml-auto mt-10">
              <p
                className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
              >
                Upload Cover Image *
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

              <div className="h-[150px] flex flex-row items-end mt-3 justify-center gap-x-3">
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

            {!isChannel ? (
              <div className="w-full md:w-[350px] md:ml-auto mt-16">
                <p
                  className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
                >
                  Upload Channel logo *
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

                <div className="h-[133px] flex flex-row items-end mt-1 justify-center gap-x-3">
                  {image && (
                    <>
                      <Image
                        // id="upload"
                        src={image.url}
                        width={110}
                        height={153}
                        alt="uploaded"
                        className="h-[80px] rounded-[10px]"
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
            ) : (
              <div className="w-full md:w-[350px] md:ml-auto mt-10">
                <p
                  className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
                >
                  Upload Video Trailer *
                </p>
                <div className="flex justify-between w-full border overflow-hidden border-[#D9D9D938] rounded-tr-[5px] rounded-br-[5px]">
                  <div className="flex items-center ml-5 py-2 relative">
                    <div
                      className={`${roboto_500.className} mr-3 min-w-fit bg-grey_500 rounded-[4px] border border-white py-[3px] px-2 text-xs text-black`}
                    >
                      Choose File
                    </div>
                    <span
                      className={`${roboto_400.className} text-xs truncate text-grey_500`}
                    >
                      {videoTrailer ? videoTrailer.name : "No File selected"}
                    </span>
                    <input
                      type="file"
                      id="file"
                      accept="video/*"
                      onChange={(e) => handleInput(e, "video")}
                      className="absolute z-20 opacity-0"
                    />
                  </div>
                  <div
                    className={`${roboto_500.className} text-white text-[15px] bg-[#EE2726] h-[42px] px-4 flex items-center justify-center`}
                  >
                    UPLOAD
                  </div>
                </div>

                <div className="h-[165px] flex flex-row items-end mt-3 justify-center gap-x-3">
                  {videoTrailer && (
                    <>
                      <div className="rounded-[10px] w-[292px] h-[159px] relative overflow-hidden">
                        <div
                          style={{ zIndex: isPlaying ? 20 : 0 }}
                          className="absolute w-full h-full"
                        >
                          <ReactPlayer
                            playing={isPlaying}
                            muted={false}
                            controls={false}
                            // onProgress={e => }
                            url={videoTrailer.url}
                            width="100%" // Set to 100%
                            height="100%"
                            volume={1}
                            onEnded={() => setIsPlaying(false)}
                          // onReady={() => setIsPlayerReady(true)}
                          />
                        </div>

                        <div className="flex items-center justify-center absolute w-[292px] h-[159px] bg-black/50 z-[9999px]">
                          <button
                            style={{ display: isPlaying ? "none" : "inline" }}
                            onClick={(e) => handleVideo(e)}
                          >
                            <Image
                              src="/playBtn.svg"
                              alt=""
                              width={30}
                              height={30}
                              className=" object-contain"
                            />
                          </button>
                        </div>
                      </div>

                      <button
                        className="hover:scale-110 transition-all duration-200"
                        onClick={() => setVideoTrailer(null)}
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
            )}
          </div>
          {/* RIGHT END */}
        </div>

        <div className="w-[30%] mt-10">
          <AppButton
            onClick={() => setIsPaymentActive(true)}
            title="CONTINUE TO PAYMENT"
            className="w-full"
          />
        </div>
      </div>

      {isPaymentActive && (
        <ModalComponent
          eventHours={eventHours}
          handleClose={() => setIsPaymentActive(false)}
          price={eventEstimatedPrice}
        />
      )}
    </div>
  );
};

interface ModalProps {
  handleClose: () => void;
  price: number;
  eventHours: string;
}

export const ModalComponent = ({
  handleClose,
  eventHours,
  price,
}: ModalProps) => {
  const [selectedPaymentMethod, setPaymentMethod] = useState<string>(
    "Select payment method"
  );

  return (
    <div className="z-[9999px] w-full absolute overflow-hidden flex justify-center inset-0">
      <div className="h-[365px] md:h-[565px] lg:h-[665px] w-[80%] md:w-[519px] lg:w-[619px] mt-32 p-5 bg-[#3a3a39]">
        <div className="ml-auto w-fit" onClick={handleClose}>
          <Image
            src="/closeIcon.svg"
            width={20}
            height={20}
            alt="close modal"
          />
        </div>

        <div className="flex flex-col items-center mt-10">
          <p
            className={`${roboto_500.className} text-[50px] text-[#747474] text-center`}
          >
            CREATE
          </p>

          <div className="mt-12 sm:max-w-[400px]">
            <p
              className={`${roboto_700.className} text-[50px] text-white text-center`}
            >
              ₦{formatAmount(price.toString())}.00
            </p>

            <div className="flex items-center mt-8 gap-x-2 w-full mb-3">
              <div className="flex-1">
                <CustomInput
                  required
                  type="text"
                  id="name"
                  readOnly
                  value={eventHours}
                  className="font-normal text-center h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                />
              </div>
              <div className="flex-1">
                <CustomInput
                  required
                  type="text"
                  placeholder="Hours"
                  id="name"
                  className="font-normal text-center h-[40px] outline-none bg-transparent text-sm py-2 flex-1 border border-border_grey rounded-sm"
                />
              </div>
            </div>

            <div className="flex-1 mt-5">
              <SelectInputForm
                placeholder={selectedPaymentMethod}
                setType={setPaymentMethod}
                selectData={["Month", "Year"]}
                className="font-normal h-[40px] text-sm py-2 border border-border_grey rounded-sm"
                textStyles="text-grey_500"
              />
            </div>

            <div className=" mt-8">
              <AppButton title="PAY" className="w-full text-[28px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
