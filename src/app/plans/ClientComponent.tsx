'use client'

import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import { ModalComponent } from "./ModalComponent";
import Image from "next/image";
import ReactPlayer from "react-player";
import { roboto_400, roboto_500 } from "@/config/fonts";
import Lottie from "lottie-react";
import { formatAmount } from "@/utilities/formatAmount";
import { getDates } from "@/utilities/dateUtilities";
import { useEventEstimateMutation } from "@/api/extra.api";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectUserProfile } from "@/store/slices/usersSlice";
import LoadingSpinner from "@/config/lottie/loading.json";
import { useGetCategoryQuery } from "@/api/categorySlice";
import { ICategory } from "@/types/api/category.types";
import MediaComp from "./components/MediaComp";
import getSymbolFromCurrency from 'currency-symbol-map';


const paymentMethods = ["Visa/mastercard", "Paypal", "Crypto", "Bank Transfer"];


export interface ImageProps {
    name: string;
    url: string;
}

export const ClientsComponent = () => {
    const user = useAppSelector(selectUserProfile);
    const [_class, setClass] = useState<string>("Select");
    const [currency, setCurrency] = useState<string>("Select");
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
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [cat_Placeholder, setCat_Placeholder] = useState<string>("");
    const [cat_List, setCat_List] = useState<ICategory[]>([]);
    const maxLength = 200;
    const isEVENT = user?.profile?.role === "event";
    const isTVSHOW = user?.profile?.role === "tvshow";
    const isChannel = user?.profile?.role === "channel";
    const { data: categories, isSuccess: isSuccess_C } = useGetCategoryQuery(
        undefined,
        {}
    );

    const [handleEstimate, { isLoading: isEstimatedLoading }] =
        useEventEstimateMutation();

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length <= maxLength) {
            setDetails(newText);
        }
    };


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

    useEffect(()=>{
        console.log(categories)
        if(categories && isSuccess_C) setCat_List(categories.data)
    }, [isSuccess_C])

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
                        <div className="flex flex-1 justify-between flex-col-reverse xl:flex-row flex-wrap-reverse">
                            <div className={`${isChannel ? 'mt-10' :''} flex-1 space-y-5 xl:max-w-[400px]`}>
                        {isChannel ? (
                            <div className={"w-[100%]"}>
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
                            <div className={"w-[75%]"}>
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
                                        className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                    />
                                </div>

                            <div className={"w-[75%]"}>
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
                                        className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                                    />
                                </div>
                            </>
                        )}

                        <div className={`flex flex-row items-start ${isChannel ? 'w-[100%]' : 'w-[75%]'} gap-x-5 lg:gap-x-14`}>
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
                                    selectData={["Free", "Exclusive"]}
                                    className="font-normal h-[34px] mt-1 text-sm py-2 lg:pl-3 border border-border_grey rounded-sm"
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
                                    className="font-normal h-[34px] mt-1 text-sm py-2 lg:pl-3 border border-border_grey rounded-sm"
                                    textStyles="text-grey_500 text-sm"
                                />
                            </div>
                        </div>
                        </div>

                         {!isChannel && <MediaComp 
                   coverImage={coverImage}
                   handleInput={handleInput}
                   setCoverImage={setCoverImage}
                   image={image}
                   setImage={setImage}
                   videoTrailer={videoTrailer}
                   isPlaying={isPlaying}
                   setIsPlaying={setIsPlaying}
                   setVideoTrailer={setVideoTrailer}
                   handleVideo={handleVideo}
                   />}
                        </div>


                         <div className="">
                                    <p
                                      className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                                    >
                                      CATEGORY *
                                    </p>
                                    <SelectInputForm
                                      placeholder=""
                                      categoryListing={
                                        <div className="flex flex-1 flex-row flex-wrap gap-x-3 gap-y-1.5">
                                          {selectedCategories.slice(0, 3).map((item, i) => {
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
                                                <button
                                                  onClick={() =>
                                                    setSelectedCategories((prev) =>
                                                      prev.filter((x) => x !== item)
                                                    )
                                                  }
                                                >
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
                                      }
                                      setType={setCat_Placeholder}
                                      selectData={cat_List.map((x) => x.name)}
                                      className="border-border_grey min-h-[90px] items-start text-grey_500 rounded-sm flex-1"
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
                                    className={`${roboto_400.className} textarea w-full h-[80px] p-1 pl-2 outline-none bg-transparent text-sm text-white`}
                                />
                                <p
                                    className={`${roboto_400.className} absolute bottom-0 right-1 text-sm text-[#C4C4C4]`}
                                >
                                    {details.length}/{maxLength}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row flex-wrap items-start">
                             <div className="mr-10 w-[160px]">
                                <label
                                    htmlFor="name"
                                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                                >
                                    BILL CURRENCY*
                                </label>
                                <SelectInputForm
                                    placeholder={currency}
                                    setType={setCurrency}
                                    selectData={["NGN", "USD"]}
                                    className="font-normal h-[30px] mt-1 text-sm py-2 lg:pl-3 mt-2.5 border border-border_grey rounded-sm"
                                    textStyles="text-grey_500 text-sm"
                                />
                                 <div
                                    className={`${roboto_500.className} flex flex-row items-center gap-x-2 text-[#909090] text-[32px] mt-2.5`}
                                >
                                    {getSymbolFromCurrency(currency === 'Select' ?'NGN' : currency)}{formatAmount(eventEstimatedPrice.toString())}.00
                                    {isEstimatedLoading && (
                                        <Lottie
                                            animationData={LoadingSpinner}
                                            loop
                                            style={{ width: 35, height: 35, marginRight: 5 }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-1 items-start flex-wrap flex-col md:flex-row  md:gap-x-16 lg:gap-x-20">
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
                            </div>

                            <div className="flex flex-row items-center gap-x-2 mt-10">
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
                    </div>
                    {/* LEFT END */}

                    {/* RIGHT START */}
                   {isChannel && <MediaComp 
                   coverImage={coverImage}
                   handleInput={handleInput}
                   setCoverImage={setCoverImage}
                   image={image}
                   setImage={setImage}
                   videoTrailer={videoTrailer}
                   isPlaying={isPlaying}
                   setIsPlaying={setIsPlaying}
                   setVideoTrailer={setVideoTrailer}
                   handleVideo={handleVideo}
                   />}
                    {/* RIGHT END */}
                </div>

                <div className="w-[30%] min-w-[240px] mt-10">
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