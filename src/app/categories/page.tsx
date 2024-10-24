"use client";


import { addCategoryEnums, deleteCategoryEnums, geetFetchCast, geetFetchCategories, geetFetchGenres, useGetCastQuery, useGetCategoryQuery, useGetGenreQuery } from "@/api/categorySlice";
import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import { CAST_TH, CATEGORY_TH, GENRE_TH } from "@/config/data/category";
import { roboto_400, roboto_400_italic, roboto_500 } from "@/config/fonts";
import { ICast, ICastResponse, ICategory, ICategoryResponse } from "@/types/api/category.types";
import { link } from "fs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TABS = ['Category', 'Genre', 'Cast']

interface Table {
  _id: string;
  title: string;
  position?: string;
  names?: string;
  location?: string;
}

function page() {
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('category');
  const [categoryTable, setTable] = useState<Table[]>([])
  const [categoryTableFiltered, setFilteredTable] = useState<Table[]>([])
  const {
    data: categories,
    refetch,
    error,
    isSuccess,
    isLoading,
  } = useGetCategoryQuery(undefined, {});
  const {
    data: genries,
  } = useGetGenreQuery(undefined, {});
  const {
    data: casts,
  } = useGetCastQuery(undefined, {});



  const transformEventData = (data: ICategory[] | ICast[]) => {
    const sortedData = [...(data as (ICategory | ICast)[])].sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(); // Sort in descending order
    });

    return sortedData.map((CAT) => {
      if (tab === 'cast') {
        return {
          ...CAT,
          title: "title" in CAT ? CAT.title : CAT.name,
          names: CAT.name,
        };
      } else if (tab === 'genre') {
        return {
          ...CAT,
          title: CAT.name,
          position: '0',
        };
      } else {
        return {
          ...CAT,
          title: CAT.name,
          position: '0',
          location: 'Not set',
        };
      }
    });
  };

  async function handleDelete(id: string) {
    setTable(prev => prev.filter((cat) => cat._id !== id));
    const res = await deleteCategoryEnums(id, tab);
    if (
      res.ok &&
      res.data &&
      res.data.message.includes("deleted")
    ) {
      toast("Enums deleted successfully", { type: "info" });
      const resCAT = tab === 'category' ? await geetFetchCategories() : tab === 'genre' ? await geetFetchGenres() : await geetFetchCast();
      if (resCAT.ok && resCAT.data) {
        handleCategoryList(resCAT.data)
      }
    } else {
      toast("Opps! couldn't delete user", { type: "info" });
      const resCAT = tab === 'category' ? await geetFetchCategories() : tab === 'genre' ? await geetFetchGenres() : await geetFetchCast();
      if (resCAT.ok && resCAT.data) {
        handleCategoryList(resCAT.data);
      }
    }
  }

  function handleCategoryList(data: ICastResponse | ICategoryResponse | undefined) {
    if (!data) return;
    const categoryList = transformEventData(data.data);
    setTable(categoryList);
    setFilteredTable(categoryList);
  }

  useEffect(() => {
    if (tab === 'cast') handleCategoryList(casts)
    if (tab === 'genre') handleCategoryList(genries)
    if (tab === 'category') handleCategoryList(categories)

  }, [tab, isSuccess])



  return <section
    className={`${roboto_400.className} relative h-full overflow-y-auto pl-5`}
  >
    <div className="bg-black3 py-3 px-10">
      <p className="font-normal text-lg text-grey_700">Home / Categories</p>
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
        // value={searchParams}
        // onChange={(e) => handleSearchfilter(e)}
        />
      </div>

      {/* add butn */}
      <div
        onClick={() => setIsAdd(!isAdd)}
        className={`${roboto_500.className} ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px] cursor-pointer`}
      >
        Add
      </div>
    </div>

    <div className="mt-12 flex flex-row w-fit h-[43px]">
      {TABS.map((x, i) => {
        const active = x.toLowerCase() === tab
        return (
          <div onClick={() => setTab(x.toLowerCase())} className={`${roboto_500.className} text-[17px] hover:text-white hover:text-[18.5px] hover:h-[47.5px] transition-all duration-300 ${active ? 'text-white' : 'text-grey_800'} w-[88px] text-center py-2.5 cursor-pointer h-[46px] ${active ? 'bg-[#0096D6C9]' : 'bg-black3'}`}>
            {x}
          </div>
        )
      })}
    </div>


    <div className="bg-black3 min-h-[calc(80%-43px)] pt-12 px-5 md:px-10 lg:px-14 relative">
      {isAdd && <ModalComponent handleClose={() => setIsAdd(!isAdd)} tab={tab} handleReset={(value) => handleCategoryList(value)} />}
      <div className="relative w-full md:h-[80%] h-[100%] pb-10 pr-5">
        <div className="absolute w-full py-5 pb-6 pl-0 sm:ml-0 sm:pl-3 overflow-x-auto">
          <table className={`${roboto_400.className} w-full min-w-[810px]`}>
            <thead className="">
              <tr>
                {(tab === 'category' ? CATEGORY_TH : tab === 'genre' ? GENRE_TH : CAST_TH).map((t, i) => {
                  return (
                    <th
                      key={i}
                      className={`${roboto_500.className} ${t.toLowerCase() === 'options' && 'text-right'} font-medium text-lg text-white uppercase`}
                    >
                      {t}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {categoryTableFiltered.map((tx, indx) => {
                return (
                  <tr key={indx} className="text-white h-[100px]">


                    <td className="text-center font-normal text-[15px] capitalize">
                      {tx.title}
                    </td>

                    {tx.location && <td className="text-center font-normal text-xs capitalize">
                      {tx.location}
                    </td>}
                    {tx.position && <td className="text-center font-normal text-xs capitalize">
                      {tx.position}
                    </td>}

                    {tx.names && <td className="text-center font-normal text-xs capitalize">
                      {tx.names}
                    </td>}


                    <td className="w-[50%]">
                      <div className="flex items-center justify-end gap-x-10">
                        <button>
                          <Image
                            src="/edit.svg"
                            width={14}
                            height={14}
                            alt="edit"
                          />
                        </button>
                        <button onClick={() => handleDelete(tx._id)}>
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
    </div>


  </section>
}

export default page;


interface ModalProps {
  handleClose: () => void;
  tab: string;
  handleReset: (value: ICastResponse | ICategoryResponse | undefined) => void
}


export const ModalComponent = ({ handleClose, handleReset, tab }: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(tab === 'cast' ? 'Select' : '');
  const [names, setNames] = useState<string>('');
  const [location, setLocation] = useState<string>('Select');
  const [position, setPosition] = useState<string>('Select');
  const [link, setLink] = useState('')
  const [details, setDetails] = useState("");
  const maxLength = 200;
  const isDisable = link === '' || names === '' || details === ''

  function reset() {
    setPosition('Select');
    setLocation('Select');
    setTitle(tab === 'cast' ? 'Select' : '');
    setNames('');
    setLink('')
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
      const data = tab === 'cast' ? {
        name: names,
        title
      } : {
        name: title
      }
      const res = await addCategoryEnums(data, tab);
      if (res.ok && res.data) {
        toast(`Successfully added ${tab}`, {
          type: "success"
        });
        reset();
        const resCAT = tab === 'category' ? await geetFetchCategories() : tab === 'genre' ? await geetFetchGenres() : await geetFetchCast();
        if (resCAT.ok && resCAT.data) {
          handleReset(resCAT.data)
        }
      } else {
        toast(`Opps! couldn't add ${tab}`, {
          type: "error"
        })
      }

    } catch (error) {
      toast(`Opps! couldn't add ${tab}`, {
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="z-[9999] w-[calc(100%-20px)] md:w-[calc(100%-40px)] lg:w-[calc(100%-56px)] absolute overflow-hidden flex justify-center">
      <div style={{
        marginTop: tab === 'cast' ? 20 : 40
      }} className="w-[90%] sm:w-[60%] lg:w-[40%] p-5 rounded-[10px] overflow-y-auto bg-black4">
        <div className="ml-auto w-fit" onClick={handleClose}>
          <Image
            src="/closeIcon.svg"
            width={20}
            height={20}
            alt="close modal"
          />
        </div>

        <div style={{
          marginBottom: tab === 'genre' ? 40 : 20
        }} className="flex flex-col items-center">


          <div className="mt-5 space-y-5 w-[70%]">
            <div>
              <label
                htmlFor="title"
                className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
              >
                TITLE *
              </label>
              {tab === 'cast' ?
                <SelectInputForm
                  placeholder={title}
                  setType={setTitle}
                  selectData={["Actor", "Procedure", "Director", "EP"]}
                  className="border-border_grey w-full mt-1.5 text-grey_500 rounded-sm flex-1"
                />

                : <CustomInput
                  required
                  type="text"
                  placeholder=""
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  id="title"
                  className="font-normal text-sm py-2 mt-2 border border-border_grey rounded-sm"
                />}
            </div>

            {tab === 'category' &&
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
                  selectData={['Homepage', 'Live/Channels', 'Live/Events', 'Live/Tv Shows', 'Live/Sports', 'Live/Podcast']}
                  className="border-border_grey w-full mt-1.5 text-grey_500 rounded-sm z-[99] flex-1"
                />
              </div>

            }

            {(tab === 'category' || tab === 'genre') &&
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
                  selectData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                  className="border-border_grey w-full mt-1.5 text-grey_500 z-[9] rounded-sm flex-1"
                />
              </div>

            }

            {tab === 'cast' && <>
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

            </>}

          </div>
          <AppButton
            isLoading={loading}
            disabled={tab === 'cast' && isDisable || title === '' || (tab === 'genre' || tab === 'category') && position === 'Select' || tab === 'category' && location === 'Select'}
            title="SAVE"
            className="w-[70%] mt-10 text-xl py-2.5"
            onClick={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};
