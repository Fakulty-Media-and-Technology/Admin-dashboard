"use client";

import {
  AppButton,
  CustomInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { searchFetchCast, useGetCategoryQuery, useGetGenreQuery } from "@/api/categorySlice";
import { ICast, ICategory } from "@/types/api/category.types";
import { formatAmount } from "@/utilities/formatAmount";
import ReactPlayer from "react-player";
import { truncateText } from "@/utilities/textUtils";
import {
  isValidUrl,
  normalizeUrl,
  transformResponse,
} from "@/utilities/linkUtils";
import { getPreview } from "@/app/server";
import { LinkViewProps } from "@/types/packages";
import SeasonComponent from "../SeasonComponent";
import { ImageProps } from "@/app/plans/ClientComponent";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { roboto_400, roboto_400_italic, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { ContentFormData, ISeasonData } from "@/types/api/content.type";
import { addSeason, addSubtitle, createContent, editContent, getSeasons, seriesButtonValidity } from "@/api/contentSlice";
import { IMediaData } from "@/types/api/media.types";
import { formatDateToDDMMYYYY } from "@/utilities/dateUtilities";
import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";

interface ModalProps {
  handleClose: () => void;
  // handleReset: () => void;
  slug: string;
  selectedMedia: IMediaData | null
}

export interface ISeason {
  index: number;
  episodes: [];
}

export interface ISubtitle {
  language: string;
  srtFile: ImageProps;
}

export interface IFile extends ImageProps {
  file?: File
}

export const AddComponent = ({ slug, selectedMedia, handleClose }: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loading_C, setLoading_C] = useState<boolean>(false);
  const [isGenre, setIsGenre] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(selectedMedia ? ((slug.includes('videos') && selectedMedia.artistName) ? selectedMedia.artistName : selectedMedia.title) : "");
  const [subtitle, setSubTitle] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>(selectedMedia ? formatDateToDDMMYYYY(new Date(selectedMedia.releaseDate).toISOString()) : "");
  const [expiryDate, setExpiryDate] = useState<string>(selectedMedia ? new Date(selectedMedia.expiryDate).toISOString() : "");
  const [class_, setClass] = useState<string>(selectedMedia ? selectedMedia.vidClass.toUpperCase() : "Select");
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [PG, setPG] = useState<string>(selectedMedia ? selectedMedia.pg === '0' ? 'G' : `${selectedMedia.pg}+` : "Select");
  const [portrait, setPortrait] = useState<IFile | null>(selectedMedia ? { name: '', url: selectedMedia.portraitPhoto } : null);
  const [portrait_L, setPortrait_L] = useState<IFile | null>(selectedMedia ? { name: '', url: selectedMedia.landscapePhoto } : null);
  const [subtitleFile, setSubtitleFile] = useState<IFile | null>(null);
  const [videoTrailer, setVideoTrailer] = useState<IFile | null>(null);
  const [videoTrailer_2, setVideoTrailer_2] = useState<IFile | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailUrl_2, setThumbnailUrl_2] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlaying_2, setIsPlaying_2] = useState<boolean>(false);
  const [urlLink, setUrlLink] = useState<string>("");
  const [urlLink_2, setUrlLink_2] = useState<string>("");
  const [time, setTime] = useState<string>(selectedMedia ? selectedMedia.runtime : "");
  const [rating, setRating] = useState<string>(selectedMedia ? selectedMedia.averageRating.toString() : "Select");
  const [views, setViews] = useState<string>("Select");
  const [options, setOptions] = useState<string>("Select");
  const [subtitle_, setSUBTITLE] = useState<string>("Select Language");

  const [genriesList, setGenriesList] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(selectedMedia ? selectedMedia.category.map(x => x.name) : []);
  const [selectedGenries, setSelectedGenries] = useState<string[]>(selectedMedia ? selectedMedia.genre.map(x => x.name) : []);
  const [selectedCasts, setSelectedCasts] = useState<ICast[]>(selectedMedia ? selectedMedia.cast : []);
  const [castTxt, setCastTxt] = useState<string>("");
  const [genriesPlaceholder, setGenriesPlaceholder] = useState<string>("");
  const [cat_List, setCat_List] = useState<ICategory[]>([]);
  const [cat_Placeholder, setCat_Placeholder] = useState<string>("");
  const [links, setLinks] = useState<LinkViewProps | null>(selectedMedia ? { url: selectedMedia.trailer } : null);
  const [links_2, setLinks_2] = useState<LinkViewProps | null>(selectedMedia ? { url: selectedMedia.video } : null);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isPreview_2, setIsPreview_2] = useState<boolean>(false);
  const [details, setDetails] = useState(selectedMedia ? selectedMedia.description ?? '' : "");
  const [srtLoading, setSrtLoading] = useState<boolean>(false);
  const [seasonLoading, setSeasonLoading] = useState<boolean>(false);
  const maxLength = 200;
  const [seasons, setSeasons] = useState<ISeasonData[]>([]);
  const [srtArray, setSRTArray] = useState<ISubtitle[]>([]);
  const [isDisabled_Seasons, setDisabled] = useState<boolean>(true);
  const [showPicker, setColorPicker] = useState<boolean>(false);
  const [castContentList, setCastContentList] = useState<ICast[]>([]);
  const [color, setColor] = useState<string>(selectedMedia ? selectedMedia.primaryColor : '');
  const { data: genries, isSuccess } = useGetGenreQuery(undefined, {});
  const { data: categories, isSuccess: isSuccess_C } = useGetCategoryQuery(
    undefined,
    {}
  );

  const isDisabled =
    title === "" ||
    class_ === "" ||
    PG === "" ||
    releaseDate === "" ||
    expiryDate === "" ||
    selectedGenries.length !== 3 ||
    selectedCategories.length === 0 ||
    (links || videoTrailer) === null ||
    details === "" ||
    time === "" ||
    rating === "" ||
    portrait === null ||
    portrait_L === null;


  function handleValidInput(query: string) {
    const inputValue = query;
    if (/^\d*$/.test(inputValue)) {
      setAmount(inputValue);
    }
  }

  const handleInputFormatForTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");

    if (inputValue.length > 7) {
      return;
    }

    let seconds = "00";
    let minutes = "00";
    let hours = "00";

    if (inputValue.length > 0) {
      seconds = inputValue.slice(-2).padStart(2, "0");
    }

    if (inputValue.length > 2) {
      minutes = inputValue.slice(-4, -2).padStart(2, "0");
    }

    if (inputValue.length > 4) {
      hours = inputValue.slice(0, -4).padStart(2, "0");
    }

    const sec = Math.min(parseInt(seconds, 10), 59);
    const min = Math.min(parseInt(minutes, 10), 59);
    const hr = Math.min(Math.max(parseInt(hours, 10), 0), 99); // Limit hours, e.g., 0 to 99

    if (hr === 59 && min === 59 && sec === 59) {
      return;
    }

    const formattedTime = `${String(hr).padStart(2, "0")}:${String(
      min
    ).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

    setTime(formattedTime);
  };

  const handleTextChange = (newText: string) => {
    if (newText.length <= maxLength) {
      setDetails(newText);
    }
  };

  function handleVideo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type?: string) {
    e.preventDefault();
    if (type === '2') {
      setIsPlaying_2(true);
    } else {
      setIsPlaying(true);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, type?: string) {
    const files = e.target.files;
    if (files) {
      if (type === "cover") {
        // setCoverImage({
        //   name: files[0].name,
        //   url: URL.createObjectURL(files[0]),
        // });
      } else if (type === "video" || type === "trailer") {
        const videoObjectUrl = URL.createObjectURL(files[0]);
        if (type === 'trailer') {
          setVideoTrailer({
            name: files[0].name,
            url: videoObjectUrl,
            file: files[0]
          });
        } else {
          setVideoTrailer_2({
            name: files[0].name,
            url: videoObjectUrl,
            file: files[0]
          });
        }
        const video = document.createElement("video");
        video.src = videoObjectUrl;
        video.currentTime = 2;
        video.onloadeddata = () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth / 2;
          canvas.height = video.videoHeight / 2;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            if (type === 'trailer') {
              setThumbnailUrl(canvas.toDataURL("image/jpeg"));
            } else {
              setThumbnailUrl_2(canvas.toDataURL("image/jpeg"));
            }
          }
        };
      } else if (type === "subtitle") {
        setSubtitleFile({
          name: files[0].name,
          url: URL.createObjectURL(files[0]),
          file: files[0]
        });
      } else if (type === "portrait") {
        setPortrait({
          name: files[0].name,
          url: URL.createObjectURL(files[0]),
          file: files[0]
        });
      } else if (type === "landscape") {
        setPortrait_L({
          name: files[0].name,
          url: URL.createObjectURL(files[0]),
          file: files[0]
        });
      } else {
        // setImage({
        //   name: files[0].name,
        //   url: URL.createObjectURL(files[0]),
        // });
      }
    }
  }

  async function handleSearchCast(value:string){
    setCastTxt(value);
        if (value === "") setCastContentList([]);
        try {
          setLoading_C(true);
          const res = await searchFetchCast(value);
          if (res.ok && res.data) {
            setCastContentList(res.data.data);
          }
        } catch (error) {
          toast("Opps! couldn't search for content!", { type: "error" });
        } finally {
          setLoading_C(false);
        }
  }

  const handleInputChange = (value: string, type?: string) => {
    if (value === "") return;
    // if (type === "cast") 
    if (value.includes(",")) {
    } else if (!selectedGenries.includes(value)) {
      if (type === "cast") {
        return;
      } else if (type === "categories") {
        setSelectedCategories([value, ...selectedCategories]);
      } else {
        setSelectedGenries([value, ...selectedGenries]);
      }
    }
  };

  const getData = async (url: string, type?: string) => {
    if (!url.trim() || !isValidUrl(url)) {
      toast("Please enter a valid URL.", { type: "error" });
      return;
    }
    try {
      const normalizedUrl = normalizeUrl(url);
      const res = await getPreview(normalizedUrl);
      if (typeof res === "string") {
        if (type === "2") {
          setLinks_2(transformResponse(res, normalizedUrl));
        } else {
          setLinks(transformResponse(res, normalizedUrl));
        }
        setUrlLink("");
        return;
      }
      if (type === "2") {
        const linkPreview = transformResponse(res, normalizedUrl);
        setLinks_2(linkPreview);
      } else {
        const linkPreview = transformResponse(res, normalizedUrl);
        setLinks(linkPreview);
      }
      setUrlLink("");
      setUrlLink_2("");
    } catch (error) {
      toast("Please enter a valid URL.", { type: "error" });
    }
  };

  async function handleDisableButton() {
    if (!selectedMedia) return
    try {
      setSeasonLoading(true);
      const res = await seriesButtonValidity(selectedMedia._id, 'seasons');
      if (res.ok && res.data) setDisabled(false)
    } catch (error) {
      toast(`${error}`, { type: 'error' })
    } finally {
      setSeasonLoading(false)
    }
  }

  async function handleAddSubtitle() {
    if (!selectedMedia || !subtitleFile || !subtitleFile.file) return
    try {
      setSrtLoading(true);
      const formdata = new FormData();
      formdata.append("parentId", selectedMedia._id);
      formdata.append("parentType", slug.includes('series') ? "episode" : "vod");
      formdata.append("language", subtitle_);
      formdata.append("subtitle", subtitleFile.file);
      const res = await addSubtitle(formdata)

      if (res.ok && res.data) {
        toast(res.data.message, { type: "success" });

        setSRTArray((prev) => [
          { language: subtitle_, srtFile: { name: subtitleFile?.name ?? '', url: subtitleFile?.url ?? '' } },
          ...prev,
        ])

      } else {
        toast(res.data?.message, { type: "error" });
      }
    } catch (error) {
      toast(`${error}`, { type: "error" });
    } finally {
      setSrtLoading(false);
    }
  }

  async function handleFetchSeasons() {
    if (!selectedMedia) return;
    const res = await getSeasons({ id: selectedMedia._id });
    if (res.ok && res.data) {
      setSeasons(res.data.data);
    }
  }

  async function handleCreateSeason() {
    if (!selectedMedia || !slug.includes('series')) return
    try {
      setSeasonLoading(true);
      const res = await addSeason(selectedMedia._id);
      if (res.ok && res.data) {
        toast(res.data.message, { type: "success" });
        setSeasons((prev) => [
          ...prev,
          {
            _id: '',
            admin: '',
            episodes: [],
            landscapePhoto: null,
            portraitPhoto: null,
            serial_number: prev[prev.length - 1].serial_number + 1,
            trailer: '',
            video: '',
            viewsCount: 0
          },
        ])
      } else {
        toast(res.data?.message, { type: "error" });
      }

    } catch (error) {
      toast(`${error}`, { type: "error" });
    } finally {
      setSeasonLoading(false);
    }
  }

  async function handleCreateContent() {
    if (!portrait_L || !portrait) return;
    try {
      setLoading(true);
      const formdata = new FormData();
      const category = selectedCategories.map(name => {
        const foundCategory = cat_List.find(cat => cat.name === name);
        return foundCategory ? foundCategory._id : '';
      }).filter(id => id !== '');

      const genre = selectedGenries.map(name => {
        const foundGenre = genriesList.find(g => g.name === name);
        return foundGenre ? foundGenre._id : '';
      }).filter(id => id !== '');

      const content: ContentFormData = {
        landscapePoster: portrait_L,
        portraitPoster: portrait,
        trailer: videoTrailer,
        video: videoTrailer_2,
        data: {
          cast: selectedCasts.map(x => x._id),
          category,
          defaultRating: rating,
          expiryDate: new Date(expiryDate).toISOString(),
          genre,
          description: details,
          pg: PG === 'G' ? '0' : PG.replace('+', ''),
          releasedDate: new Date(releaseDate).toISOString(),
          runtime: time,
          title: slug.includes('videos') ? subtitle : title,
          vidClass: class_.toLowerCase(),
          primaryColor: color,
          ...(class_.toLowerCase() === 'exclusive' && {amount: Number(amount), currency}),
          ...(slug.includes('videos') && {artistName: title})
        },
      };

      if (slug.includes('videos')) content.data.artistName = title

      if (videoTrailer && videoTrailer.file) {
        formdata.append("trailer", videoTrailer.file)
      } else {
        content.data.trailerLink = links?.url ?? urlLink;
      };
      if (videoTrailer_2 && videoTrailer_2.file && !slug.includes('series')) {
        formdata.append("video", videoTrailer_2.file)
      } else {
        if (!slug.includes('series')) content.data.videoLink = links_2?.url ?? urlLink_2
      }

      formdata.append("data", JSON.stringify(content.data));
      if (portrait.file) formdata.append("landscapePoster", portrait.file);
      if (portrait_L.file) formdata.append("portraitPoster", portrait_L.file);

      const res = selectedMedia ? await editContent(formdata, selectedMedia._id) : await createContent(formdata, slug.includes('movies') ? 'movie' : slug.includes('skits') ? 'skit' : slug.includes('music') ? 'music-video' : slug);
      if (res.ok && res.data) {
        toast(res.data.message, { type: "success" });
        handleClose();
      } else {
        toast(res.data?.message, { type: "error" });
      }
    } catch (error) {
      toast(`${error}`, { type: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleInputChange(genriesPlaceholder);
    handleInputChange(cat_Placeholder, "categories");
  }, [genriesPlaceholder, cat_Placeholder]);

  useEffect(() => {
    if (genries) setGenriesList(genries.data);
    if (categories) setCat_List(categories.data);
  }, [genries, categories, isSuccess_C, isSuccess]);

  useEffect(() => {
    if (slug.includes('series')) {
      handleFetchSeasons();
      handleDisableButton();
    };
  }, [slug, selectedMedia])

  return (
    <div className="mt-5 h-full flex flex-col">
      {/* {slug === "movies" && (
        <div className="flex-1 mt-10 ml-16 flex items-center gap-x-6">
          <p
            className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
          >
            Show on Genre
          </p>
          <div
            className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${isGenre ? `bg-[#FF131373]` : "bg-[#BCBDBD73]"
              }`}
          >
            <div
              onClick={() => setIsGenre(!isGenre)}
              className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${isGenre ? `translate-x-5 bg-red` : "-translate-x-0 bg-[#BCBDBD]"
                } `}
            />
          </div>
        </div>
      )} */}
      <div className="mt-6 bg-black3 py-10 flex-1">
        <div className="space-y-6">
          {/* First level */}
          <div className="px-10 lg:px-16 flex flex-col lg:flex-row lg:items-start gap-x-10 lg:gap-x-[10%] xl:gap-x-[20%]">
            <div className="flex-1 space-y-6">
              {/* TITLE */}
              <div>
                <label
                  htmlFor="title"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  {slug.includes("videos") ? "ARTISTE NAME" : "TITLE"} *
                </label>
                <CustomInput
                  type="text"
                  id="title"
                  className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* CLASS & PG */}
              <div className="flex items-start gap-x-5 lg:gap-x-16">
                <div className="flex-1">
                  <p
                    className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                  >
                    CLASS *
                  </p>
                  <SelectInputForm
                    placeholder={class_}
                    setType={setClass}
                    selectData={[
                      "Free",
                      "Premium",
                      "Exclusive",
                      // `${slug === "movies" ? "AD" : ""}`,
                    ].filter((x) => x !== "")}
                    className="border-border_grey text-grey_500 rounded-sm flex-1"
                  />
                </div>

                <div className="flex-1">
                  <p
                    className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                  >
                    PG *
                  </p>
                  <SelectInputForm
                    placeholder={PG}
                    setType={setPG}
                    selectData={["G", "16+", `18+`]}
                    className="border-border_grey text-grey_500 rounded-sm flex-1"
                  />
                </div>
              </div>

              {/* AMOUNT */}
              {class_ === "Exclusive" && (
                <div className="flex-row gap-x-10">
                <div className="flex flex-col">
                  <label
                    htmlFor="amount"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                  >
                    AMOUNT *
                  </label>
                  <CustomInput
                    type="text"
                    id="amount"
                    className="font-normal w-[140px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    value={formatAmount(amount)}
                    onChange={(e) =>
                      handleValidInput(e.target.value.replaceAll(",", ""))
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="currency"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                  >
                    CURRENCY *
                  </label>
                  <SelectInputForm
                    placeholder={currency}
                    setType={setCurrency}
                    selectData={["NGN", "USD"]}
                    className="font-normal w-[160x] h-[32px] text-[10px] py-2 border border-border_grey rounded-sm mt-2"
                    textStyles="text-grey_500 text-center"
                  />
                </div>
                </div>
              )}

              {/* GENRE */}
              {class_ !== "AD" && (
                <div className="flex-1">
                  <p
                    className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                  >
                    GENRE{" "}
                    <span className="text-grey_800 text-sm">
                      (Only 3 selections)
                    </span>
                    *
                  </p>
                  <SelectInputForm
                    placeholder=""
                    categoryListing={
                      <div className="flex flex-1 flex-row flex-wrap gap-x-3 gap-y-1.5">
                        {selectedGenries.slice(0, 3).map((item, i) => {
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
                                  setSelectedGenries((prev) =>
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
                    setType={setGenriesPlaceholder}
                    selectData={genriesList.map((x) => x.name)}
                    className="border-border_grey h-[42px] text-grey_500 rounded-sm flex-1"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 md:mt-0 flex-1 space-y-6">
              {/* SUB TITLE */}
              <div>
                <label
                  htmlFor="subtitle"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  {slug.includes("videos") ? "MUSIC" : "SUB"} TITLE *
                </label>
                <CustomInput
                  type="text"
                  id="subtitle"
                  className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                  value={subtitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>

              {/* RELEASE & EXPIRY DATE */}
              <div className="flex flex-wrap gap-y-5 items-start gap-x-5 lg:gap-x-10">
                {class_ === "AD" ? (
                  <div className="flex-1" />
                ) : (
                  <div className="flex-1">
                    <p
                      className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                    >
                      RELEASE DATE *
                    </p>
                    <CustomInput
                      placeholder="DD/MM/YYYY"
                      type="date"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm placeholder:text-input_grey"
                      value={releaseDate.replaceAll("/", "-")}
                      onChange={(e) => [setReleaseDate(e.target.value), console.log(e.target.value)]}
                    />
                  </div>
                )}

                <div className="flex-1">
                  <p
                    className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                  >
                    EXPIRY DATE *
                  </p>
                  <CustomInput
                    placeholder="DD/MM/YYYY"
                    type="date"
                    className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm placeholder:text-input_grey"
                    value={selectedMedia ? formatDateToDDMMYYYY(expiryDate) : expiryDate.replaceAll("/", "-")}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>

              {/* CAST */}
              {class_ !== "AD" && !decodeURI(slug).includes("videos") && (
                <div className="relative">
                <div className="flex-1">
                  <p
                    className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                  >
                    CAST{" "}
                    <span className="text-grey_800 text-sm">
                      (Max 10 selections)
                    </span>
                    *
                  </p>
                  <div className="min-h-[40px] border border-[#D9D9D938] p-1 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Start typing..."
                      className={`${roboto_500.className} pl-2 w-full outline-none bg-transparent text-sm text-white placeholder:text-grey_600/50`}
                      value={castTxt}
                      onChange={(e) =>
                        handleSearchCast(e.target.value)
                      }
                    />

                    <div className="flex flex-row flex-wrap gap-x-3 gap-y-1.5 mt-2">
                      {selectedCasts.map((item, i) => {
                        return (
                          <div
                            key={item._id}
                            className="flex flex-row items-center gap-x-[2px]"
                          >
                            <span
                              className={`${roboto_500.className} text-sm text-white`}
                            >
                              {item.name}
                            </span>
                            <button
                              onClick={() =>
                                setSelectedCasts((prev) =>
                                  prev.filter((x) => x != item)
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
                  </div>
                </div>

                {castContentList.length > 0 && (
                <div className="absolute top-14 mt-2 w-full border border-grey_1 rounded">
                  {castContentList.map((content, i) => {
                    return (
                      <div
                        onClick={() => [
                          setSelectedCasts(prev => ([content,...prev])),
                          setCastTxt(""),
                          setCastContentList([])
                        ]}
                        className="text-white cursor-pointer bg-black2 p-3 w-full"
                        key={i}
                      >
                        {content.name}
                      </div>
                    );
                  })}
                </div>
              )}
                </div>
              )}
            </div>
          </div>

          {/* second level */}
          <div className="px-10 lg:px-16 flex-1">
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
              className="border-border_grey min-h-[75px] items-start text-grey_500 rounded-sm flex-1"
            />
          </div>

          {/* third level */}
          <div className="px-10 lg:px-16 flex flex-col flex-wrap lg:flex-row lg:items-start gap-x-10 gap-y-6 lg:gap-x-[10%] xl:gap-x-[20%]">
            {/* right */}
            <div className="flex flex-col flex-1">
              <label
                htmlFor="trailer"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                TRAILER{" "}
                <span className="text-grey_800 text-sm">(90 sec max)</span> *
              </label>
              <CustomInput
                type="text"
                id="trailer"
                placeholder="Paste Deep link Url ex. Youtube"
                className="font-normal w-full sm:min-w-[364px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                value={urlLink}
                onChange={(e) => [
                  setUrlLink(e.target.value),
                  getData(e.target.value),
                ]}
                readOnly={videoTrailer ? true : false}
              />

              {links && (
                <>
                  <div className="flex flex-row items-center mt-5 justify-center gap-x-3">
                    <>
                      <div className="rounded-[10px] flex items-start gap-x-16 flex-wrap relative overflow-hidden">
                        <div className="flex items-center pl-2 py-1 pr-1  border-none rounded w-fit  min-w-[140px]">
                          <Image
                            src={links.image ? links.image : selectedMedia ? selectedMedia.portraitPhoto : ""}
                            width={42}
                            height={42}
                            alt="profiles"
                            className="w-[42px] h-[42px] border border-grey_800/40 rounded-full"
                          />
                          <div className="ml-2.5">
                            <p
                              className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}
                            >
                              {truncateText(20, links.title ?? "")}{" "}
                            </p>
                            <div className="flex items-center -mt-[2px]">
                              <Image
                                src="/views.svg"
                                width={12.5}
                                height={10}
                                alt="views"
                              />
                              <button
                                onClick={() => setIsPreview(!isPreview)}
                                className={`${roboto_400.className} font-normal text-[13px] text-grey_800 ml-1.5 `}
                              >
                                Click to preview
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-[13px] text-white font-normal max-w-[200px] mt-2.5">
                          {truncateText(80, links?.url ?? "")}
                        </div>
                      </div>

                      <button
                        className="hover:scale-110 transition-all duration-200"
                        onClick={() => setLinks(null)}
                      >
                        <Image
                          src="/delete.svg"
                          width={16}
                          height={16}
                          alt="delete icon"
                        />
                      </button>
                    </>
                  </div>

                  {/* preview */}
                  {isPreview && links && (
                    <div className="rounded-[10px] mt-10 w-[292px] h-[159px] relative overflow-hidden">
                      <div
                        className="flex items-center justify-center absolute w-[292px] h-[159px] bg-black/50 z-[9999px]">
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
                      {links.url && (
                        <div
                          style={{ zIndex: isPlaying ? 20 : 0 }}
                          className="absolute w-full h-full"
                        >
                          <ReactPlayer
                            playing={isPlaying}
                            muted={false}
                            controls={isPlaying}
                            // onProgress={e => }
                            url={links.url}
                            width="100%" // Set to 100%
                            height="100%"
                            volume={1}
                            onEnded={() => setIsPlaying(false)}
                          // onReady={() => setIsPlayerReady(true)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* left */}
            <div className="flex-1">
              <div className="w-full md:w-[350px] md:ml-auto">
                <p
                  className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
                >
                  Upload Trailer *
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
                      {videoTrailer
                        ? truncateText(20, videoTrailer.name)
                        : "No File selected"}
                    </span>
                    <input
                      type="file"
                      id="file"
                      accept="video/*"
                      onChange={(e) => handleInput(e, "trailer")}
                      className="absolute z-20 opacity-0"
                      disabled={links ? true : false}
                    />
                  </div>
                  <div
                    className={`${roboto_500.className
                      } cursor-pointer text-white text-[15px] ${links ? "bg-grey_800" : "bg-[#EE2726]"
                      } h-[42px] px-4 flex items-center justify-center`}
                  >
                    UPLOAD
                  </div>
                </div>

                <>
                  <div className="flex flex-row items-end mt-5 justify-center gap-x-3">
                    {videoTrailer && (
                      <>
                        <div className="rounded-[10px] relative overflow-hidden">
                          <div className="flex items-center pl-2 py-1 pr-1  border-none rounded w-fit  min-w-[140px]">
                            <Image
                              src={thumbnailUrl ?? ""}
                              width={42}
                              height={42}
                              alt="profiles"
                              className="w-[42px] h-[42px] rounded-full"
                            />
                            <div className="ml-2.5">
                              <p
                                className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}
                              >
                                {truncateText(20, videoTrailer.name)}{" "}
                              </p>
                              <div className="flex items-center -mt-[2px]">
                                <Image
                                  src="/views.svg"
                                  width={12.5}
                                  height={10}
                                  alt="views"
                                />
                                <button
                                  onClick={() => setIsPreview(!isPreview)}
                                  className={`${roboto_400.className} font-normal text-[13px] text-grey_800 ml-1.5 `}
                                >
                                  Click to preview
                                </button>
                              </div>
                            </div>
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

                  {/* preview */}
                  {isPreview && videoTrailer && (
                    <div className="rounded-[10px] mt-10 w-[292px] h-[159px] relative overflow-hidden">
                      <div className="flex items-center justify-center absolute w-[292px] h-[159px] bg-black/50 z-[9999px]">
                        <button
                          style={{
                            display: isPlaying ? "none" : "inline",
                            zIndex: 20,
                          }}
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
                      {videoTrailer && (
                        <div
                          style={{ zIndex: isPlaying ? 20 : 0 }}
                          className="absolute w-full h-full"
                        >
                          <ReactPlayer
                            playing={isPlaying}
                            muted={false}
                            controls={isPlaying}
                            // onProgress={e => }
                            url={videoTrailer.url}
                            width="100%" // Set to 100%
                            height="100%"
                            volume={1}
                            onEnded={() => setIsPlaying(false)}
                          // onReady={() => setIsPlayerReady(true)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>

          {/* fourth level */}
          <>
            <div className="px-10 lg:px-16">
              <p
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
              >
                VIDEO UPLOAD *
              </p>

              {slug !== "series" && (
                <div className="">
                  <p
                    className={`${roboto_400.className} text-grey_500 font-normal text-base ml-3`}
                  >
                    Details
                  </p>
                  <div className="h-[90px] relative border border-[#D9D9D938] mt-2">
                    <textarea
                      name="details"
                      maxLength={maxLength}
                      value={details}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className={`${roboto_400.className} textarea w-full h-[80px] p-1 pl-2 outline-none bg-transparent text-sm text-white`}
                    />
                    <p
                      className={`${roboto_400.className} absolute bottom-0 right-1 text-sm text-[#C4C4C4]`}
                    >
                      {details.length}/{maxLength}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* time and ratings */}
            <div className="flex flex-col px-10 lg:px-16 lg:flex-row lg:items-start gap-x-10 gap-y-6 lg:gap-x-[10%] xl:gap-x-[20%]">
              <div className="flex-1">
                <label
                  htmlFor="time"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  RUNTIME{" "}
                  <span className="text-grey_800 text-sm">(HH:MM:SS)</span> *
                </label>
                <CustomInput
                  type="text"
                  id="time"
                  className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                  value={time}
                  onChange={handleInputFormatForTime}
                />
              </div>

              <div className="flex-1">
                <p
                  className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                >
                  DEFAULT RATINGS *
                </p>
                <SelectInputForm
                  placeholder={rating}
                  setType={setRating}
                  selectData={["3.0", "3.5", `4.0`]}
                  className="border-border_grey text-grey_500 rounded-sm flex-1"
                />
              </div>
            </div>

            {/* movie file */}
            {class_ !== "AD" && slug !== "series" && (
              <div className="px-10 lg:px-16 flex flex-col flex-wrap lg:flex-row lg:items-start gap-x-10 gap-y-6 lg:gap-x-[10%] xl:gap-x-[20%]">
                {/* right */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="movie"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                  >
                    {slug === "skits"
                      ? "SKIT"
                      : slug.includes("videos")
                        ? "VIDEO"
                        : "MOVIE"}{" "}
                    FILE *
                  </label>
                  <CustomInput
                    type="text"
                    id="movie"
                    placeholder="Paste Deep link Url ex. Youtube"
                    className="font-normal w-full sm:min-w-[364px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    value={urlLink_2}
                    onChange={(e) => [
                      setUrlLink_2(e.target.value),
                      getData(e.target.value, "2"),
                    ]}
                    readOnly={videoTrailer_2 ? true : false}
                  />

                  {links_2 && (
                    <>
                      <div className="flex flex-row items-center mt-5 justify-center gap-x-3">
                        <>
                          <div className="rounded-[10px] flex items-start gap-x-16 flex-wrap relative overflow-hidden">
                            <div className="flex items-center pl-2 py-1 pr-1  border-none rounded w-fit  min-w-[140px]">
                              <Image
                                src={links_2.image ? links_2.image : selectedMedia ? selectedMedia.portraitPhoto : ""}
                                width={42}
                                height={42}
                                alt="profiles"
                                className="w-[42px] h-[42px] border border-grey_800/40 rounded-full"
                              />
                              <div className="ml-2.5">
                                <p
                                  className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}
                                >
                                  {truncateText(20, links_2.title ?? "")}{" "}
                                </p>
                                <div className="flex items-center -mt-[2px]">
                                  <Image
                                    src="/views.svg"
                                    width={12.5}
                                    height={10}
                                    alt="views"
                                  />
                                  <button
                                    onClick={() => setIsPreview_2(!isPreview_2)}
                                    className={`${roboto_400.className} font-normal text-[13px] text-grey_800 ml-1.5 `}
                                  >
                                    Click to preview
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="text-[13px] text-white font-normal max-w-[200px] mt-2.5">
                              {truncateText(80, links_2?.url ?? "")}
                            </div>
                          </div>

                          <button
                            className="hover:scale-110 transition-all duration-200"
                            onClick={() => setLinks_2(null)}
                          >
                            <Image
                              src="/delete.svg"
                              width={16}
                              height={16}
                              alt="delete icon"
                            />
                          </button>
                        </>
                      </div>

                      {/* preview */}
                      {isPreview_2 && links_2 && (
                        <div className="rounded-[10px] mt-10 w-[292px] h-[159px] relative overflow-hidden">
                          <div className="flex items-center justify-center absolute w-[292px] h-[159px] bg-black/50 z-[9999px]">
                            <button
                              style={{ display: isPlaying_2 ? "none" : "inline" }}
                              onClick={(e) => handleVideo(e, '2')}
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
                          {links_2.url && (
                            <div
                              style={{ zIndex: isPlaying_2 ? 20 : 0 }}
                              className="absolute w-full h-full"
                            >
                              <ReactPlayer
                                playing={isPlaying_2}
                                muted={false}
                                controls={isPlaying_2}
                                // onProgress={e => }
                                url={links_2.url}
                                width="100%" // Set to 100%
                                height="100%"
                                volume={1}
                                onEnded={() => setIsPlaying_2(false)}
                              // onReady={() => setIsPlayerReady(true)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* left */}
                <div className="flex-1">
                  <div className="ml-auto w-full md:w-[350px] md:ml-auto">
                    <p
                      className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
                    >
                      Upload{" "}
                      {slug === "skits"
                        ? "Skit"
                        : slug.includes("videos")
                          ? "Video"
                          : "Movie"}{" "}
                      *
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
                          {videoTrailer_2
                            ? truncateText(20, videoTrailer_2.name)
                            : "No File selected"}
                        </span>
                        <input
                          type="file"
                          id="file"
                          accept="video/*"
                          onChange={(e) => handleInput(e, "video")}
                          className="absolute z-20 opacity-0"
                          disabled={links_2 ? true : false}
                        />
                      </div>
                      <div
                        className={`${roboto_500.className
                          } cursor-pointer text-white text-[15px] ${links_2 ? "bg-grey_800" : "bg-[#EE2726]"
                          } h-[42px] px-4 flex items-center justify-center`}
                      >
                        UPLOAD
                      </div>
                    </div>

                    <>
                      <div className="flex flex-row items-end mt-5 justify-center gap-x-3">
                        {videoTrailer_2 && (
                          <>
                            <div className="rounded-[10px] relative overflow-hidden">
                              <div className="flex items-center pl-2 py-1 pr-1  border-none rounded w-fit  min-w-[140px]">
                                <Image
                                  src={thumbnailUrl_2 ?? ""}
                                  width={42}
                                  height={42}
                                  alt="profiles"
                                  className="w-[42px] h-[42px] rounded-full"
                                />
                                <div className="ml-2.5">
                                  <p
                                    className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}
                                  >
                                    {truncateText(20, videoTrailer_2.name)}{" "}
                                  </p>
                                  <div className="flex items-center -mt-[2px]">
                                    <Image
                                      src="/views.svg"
                                      width={12.5}
                                      height={10}
                                      alt="views"
                                    />
                                    <button
                                      onClick={() =>
                                        setIsPreview_2(!isPreview_2)
                                      }
                                      className={`${roboto_400.className} font-normal text-[13px] text-grey_800 ml-1.5 `}
                                    >
                                      Click to preview
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              className="hover:scale-110 transition-all duration-200"
                              onClick={() => setVideoTrailer_2(null)}
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

                      {/* preview */}
                      {isPreview_2 && videoTrailer_2 && (
                        <div className="rounded-[10px] mt-10 w-[292px] h-[159px] relative overflow-hidden">
                          <div
                            onClick={() => setIsPlaying_2(false)}
                            className="flex items-center justify-center absolute w-[292px] h-[159px] bg-black/50 z-[9999px]">
                            <button
                              style={{
                                display: isPlaying_2 ? "none" : "inline",
                                zIndex: 20,
                              }}
                              onClick={(e) => handleVideo(e, '2')}
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
                          {videoTrailer_2 && (
                            <div
                              style={{ zIndex: isPlaying_2 ? 20 : 0 }}
                              className="absolute w-full h-full"

                            >
                              <ReactPlayer
                                playing={isPlaying_2}
                                muted={false}
                                controls={isPlaying_2}
                                // onProgress={e => }
                                url={videoTrailer_2.url}
                                width="100%" // Set to 100%
                                height="100%"
                                volume={1}
                                onEnded={() => setIsPlaying_2(false)}
                              // onReady={() => setIsPlayerReady(true)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            )}

            {slug === "series" && (
              <div className="px-10 lg:px-16">
                <p
                  className={`${roboto_400.className} text-grey_500 font-normal text-base ml-3`}
                >
                  Season Details *
                </p>
                <div className="h-[90px] relative border border-[#D9D9D938] mt-2">
                  <textarea
                    name="details"
                    maxLength={maxLength}
                    value={details}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className={`${roboto_400.className} textarea w-full h-[80px] p-1 pl-2 outline-none bg-transparent text-sm text-white`}
                  />
                  <p
                    className={`${roboto_400.className} absolute bottom-0 right-1 text-sm text-[#C4C4C4]`}
                  >
                    {details.length}/{maxLength}
                  </p>
                </div>
              </div>
            )}

            {/* subtitle */}
            {(class_ !== "AD" && !slug.includes('series')) && (
              <div className="px-10 lg:px-16 flex flex-col lg:flex-row lg:items-start gap-x-10 gap-y-6 lg:gap-x-[10%] xl:gap-x-[20%]">
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="trailer"
                    className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                  >
                    SUBTITLE *
                  </label>
                  <SelectInputForm
                    placeholder={subtitle_}
                    setType={setSUBTITLE}
                    selectData={[
                      "English",
                      "Igbo",
                      "Yoruba",
                      "Hausa",
                      "French",
                      "Spanish",
                    ]}
                    className="border-border_grey mt-2 text-grey_500 rounded-sm flex-1"
                  />
                </div>

                <div className="flex-1">
                  <div className="w-full md:w-[350px] md:ml-auto">
                    <p
                      className={`${roboto_500.className} font-medium text-sm text-[#909090] mb-2`}
                    >
                      Upload Subtitle{" "}
                      <span className={`${roboto_400_italic.className}`}>
                        (SRT)
                      </span>{" "}
                      *
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
                          {subtitleFile
                            ? truncateText(20, subtitleFile.name)
                            : "No File selected"}
                        </span>
                        <input
                          type="file"
                          id="file"
                          accept="srt/*"
                          onChange={(e) => handleInput(e, "subtitle")}
                          className="absolute z-20 opacity-0"
                        />
                      </div>
                      <div
                        className={`${roboto_500.className
                          } cursor-pointer text-white text-[15px] ${"bg-[#EE2726]"
                          } h-[42px] px-4 flex items-center justify-center`}
                      >
                        UPLOAD
                      </div>
                    </div>
                  </div>

                  <AppButton
                    title="Add Subtitle"
                    bgColor={selectedMedia ? "bg-green_400" : "bg-grey_500"}
                    disabled={!selectedMedia}
                    isLoading={srtLoading}
                    className="ml-auto mt-6 px-6 py-3"
                    onClick={() =>
                      (subtitleFile && !subtitle_.toLowerCase().includes("select"))
                        ? handleAddSubtitle()
                        : toast("select srt file", { type: "info" })
                    }
                  />
                </div>
              </div>
            )}

            {/* list of subtitle */}
            {(class_ !== "AD" && slug.includes('series')) && (
              <div className="px-10 lg:px-16 flex flex-wrap gap-x-12 pl-10 gap-y-14 items-start py-6">
                {srtArray.map((x, i) => {
                  return (
                    <div key={i} className="flex items-center gap-x-12">
                      <div className="ml-4">
                        <p
                          className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}
                        >
                          {truncateText(20, x.srtFile.name)}{" "}
                        </p>
                        <div
                          className={`${roboto_400.className} font-normal text-[13px] text-grey_500 `}
                        >
                          {x.language}
                        </div>
                      </div>

                      <button
                        className="hover:scale-110 transition-all duration-200"
                      // onClick={() => setVideoTrailer_2(null)}
                      >
                        <Image
                          src="/delete.svg"
                          width={16}
                          height={16}
                          alt="delete icon"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* options and views */}
            {/* <div style={slug === 'series' ? { marginTop: -30 } : {}} className="px-10 lg:px-16 flex flex-col lg:flex-row lg:items-end gap-x-10 gap-y-6 lg:gap-x-[10%] xl:gap-x-[20%]">
              <div className="flex-1">
                <label
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5 mb-1`}
                >
                  OPTIONS *
                  <p
                    className={`${roboto_400.className} text-grey_500 font-normal text-base ml-3`}
                  >
                    Status
                  </p>
                </label>
                <SelectInputForm
                  placeholder={options}
                  setType={setOptions}
                  selectData={["Active", "Inactive"]}
                  className="border-border_grey mt-2 text-grey_500 rounded-sm flex-1"
                />
              </div>

              <div className="flex-1">
                <p
                  className={`${roboto_500.className} mb-2 font-medium text-white text-base ml-2.5`}
                >
                  Show Views *
                </p>
                <SelectInputForm
                  placeholder={views}
                  setType={setViews}
                  selectData={["Yes", "No"]}
                  className="border-border_grey text-grey_500 rounded-sm flex-1"
                />
              </div>
            </div> */}

            {/* Adding seasons */}
            {(slug === "series" && selectedMedia) && (
              <div className="-pt-10">
                <div className="px-10 lg:px-16">
                  <AppButton
                    title="Add Season"
                    bgColor="bg-[#EE2726]"
                    className="px-6 py-3 mb-5 hover:scale-105 transition-all duration-300"
                    onClick={handleCreateSeason}
                    isLoading={seasonLoading}
                    disabled={!selectedMedia || seasonLoading || isDisabled_Seasons}
                  />
                </div>

                <div className="mt-8">
                  {seasons.map((season, i) => {
                    return <SeasonComponent season={season} key={i} handleFunc={() => handleFetchSeasons()} />;
                  })}
                </div>
              </div>
            )}
          </>

          {/* fifth level */}
          <>
            <div className="px-10 lg:px-16 flex items-start gap-x-3 gap-y-10 flex-wrap">
              <div className="flex-1">
                <div className="w-full md:w-[350px] md:mr-auto mt-10">
                  <p
                    className={`${roboto_500.className} font-medium text-sm text-white mb-2`}
                  >
                    PORTRAIT POSTER{" "}
                    <span className="text-grey_800 text-sm">
                      (390 x 454 jpeg, jpg)
                    </span>
                  </p>
                  <div className="flex justify-between w-full border overflow-hidden border-[#D9D9D938] rounded-tr-[5px] rounded-br-[5px]">
                    <div className="flex items-center ml-5 py-2 relative">
                      <div
                        className={`${roboto_500.className} min-w-fit mr-3 bg-grey_500 rounded-[4px] border border-white py-[3px] px-2 text-xs text-black`}
                      >
                        Choose File
                      </div>
                      <span
                        className={`${roboto_400.className} flex-1 truncate text-xs text-grey_500`}
                      >
                        {portrait
                          ? truncateText(20, portrait.name)
                          : "No File selected"}
                      </span>
                      <input
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => handleInput(e, "portrait")}
                        className="absolute z-20 opacity-0"
                      />
                    </div>
                    <div
                      className={`${roboto_500.className} cursor-pointer text-white text-[15px] bg-[#EE2726] h-[42px] px-4 flex items-center justify-center`}
                    >
                      UPLOAD
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  {portrait && (
                    <>
                      <Image
                        id="upload"
                        src={portrait.url}
                        width={347}
                        height={436}
                        alt="uploaded"
                        className="rounded-[10px] w-[347px] h-[436px]"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="w-full md:w-[350px] xl:ml-auto mt-10">
                  <p
                    className={`${roboto_500.className} font-medium text-sm text-white mb-2`}
                  >
                    LANDSCAPE POSTER{" "}
                    <span className="text-grey_800 text-sm">
                      (1080 x 1290 jpeg, jpg)
                    </span>
                  </p>
                  <div className="flex justify-between w-full border overflow-hidden border-[#D9D9D938] rounded-tr-[5px] rounded-br-[5px]">
                    <div className="flex items-center ml-5 py-2 relative">
                      <div
                        className={`${roboto_500.className} min-w-fit mr-3 bg-grey_500 rounded-[4px] border border-white py-[3px] px-2 text-xs text-black`}
                      >
                        Choose File
                      </div>
                      <span
                        className={`${roboto_400.className} flex-1 truncate text-xs text-grey_500`}
                      >
                        {portrait_L
                          ? truncateText(20, portrait_L.name)
                          : "No File selected"}
                      </span>
                      <input
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => handleInput(e, "landscape")}
                        className="absolute z-20 opacity-0"
                      />
                    </div>
                    <div
                      className={`${roboto_500.className} cursor-pointer text-white text-[15px] bg-[#EE2726] h-[42px] px-4 flex items-center justify-center`}
                    >
                      UPLOAD
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  {portrait_L && (
                    <>
                      <Image
                        id="upload"
                        src={portrait_L.url}
                        width={687}
                        height={436}
                        alt="uploaded"
                        className="rounded-[10px] w-[687px] h-[436px]"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </>

        </div>

        <div className="px-10 lg:px-16 my-10 cursor-pointer">
          <p onClick={() => setColorPicker(!showPicker)} className={`${roboto_500.className} text-xl text-white`}>COVER COLOR SPLASH</p>
          <p className={`${roboto_400_italic.className} max-w-[220px] leading-5 mt-1 italic text-base text-[#c4c4c4]`}>Select a prominent color from{"\n"}the cover poster above</p>

          {showPicker &&
            <div className="mt-5 color">

              <HexAlphaColorPicker color={color} onChange={setColor} />

              <div className="w-[380px] pl-7 pb-5 bg-[#33333a] pr-[30px] flex-row flex items-center">
                <div className={`${roboto_500.className} text-lg px-2 pr-4 text-[#c4c4c4] w-fit p-1 rounded-lg border-2 border-[#686666]`}>Hex</div>
                <div className={`${roboto_500.className} h-[38px] ml-2.5 text-lg px-2 pr-4 text-[#c4c4c4] flex-1 p-1 rounded-lg border-2 border-[#686666]`}>{color}</div>
              </div>
            </div>
          }
        </div>

        <div className="px-10 lg:px-16 mt-4">
          <AppButton
            title="UPLOAD"
            disabled={isDisabled && !slug.includes('series') && (links_2 || videoTrailer_2) === null || color === ''}
            isLoading={loading}
            bgColor="bg-[#EE2726]"
            className="px-6 py-3 mb-5 hover:scale-105 transition-all duration-300"
            onClick={handleCreateContent}
          />
        </div>
      </div>
    </div>
  );
};
