"use client"

import React, { useEffect, useState } from "react";
import { roboto_400, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { G_Table, G_TableHeads, } from "@/config/data/gift.data";
import { CustomInput } from "@/components/AppLayout";

const page = () => {
  const [stage, setStage] = useState<string>("main");


  switch (stage){
    case "main":
      return(
        <section
        className={`${roboto_400.className} relative h-[92%] overflow-y-auto pl-5`}>
            <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">Home / Giftcards</p>
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
                placeholder="Search Giftcards"
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
                    {G_TableHeads.map((t, i) => {
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
                  {G_Table.map((tx, indx) => {
                    return (

                      <tr key={indx} className="text-white ">
                        <td
                          className="whitespace-nowrap text-white py-2 pr-4  w-[30px]"
                          key={indx}
                        >
                         {tx.code}
                        </td>

                        <td className="text-center font-normal py-7 text-xs capitalize">
                          {tx.amount}
                        </td>
  
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.created}
                        </td>
                        
                        
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.serialnumber}
                        </td>

                        <td className="text-center font-normal text-xs capitalize">
                          {tx.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          
          <div className="w-100 bg-black2 absolute bottom-18 z-50">
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
        return(
          <section className={`${roboto_400.className} relative h-[92%] overflow-y-auto pl-5`}>
            <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">Home / Giftcards</p>
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
                placeholder="Search Giftcards"
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

          <div className="relative w-full md:h-[80%] h-[678px] pb-10 mt-8 pr-5">
            <div className="absolute w-full py-5 pb-6 pl-0 -ml-4 sm:ml-0 sm:pl-3 pr-10 overflow-x-auto">
              <table className={`${roboto_400.className} w-full min-w-[810px]`}>
                <thead className="">
                  <tr>
                    {G_TableHeads.map((t, i) => {
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
                {G_Table.map((tx, indx) => {
                    return (

                      <tr key={indx} className="text-white ">
                        <td
                          className="whitespace-nowrap text-white py-2 pr-4  w-[30px]"
                          key={indx}
                        >
                         {tx.code}
                        </td>

                        <td className="text-center font-normal py-7 text-xs capitalize">
                          {tx.amount}
                        </td>
  
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.created}
                        </td>
                        
                        
                        <td className="text-center font-normal text-xs capitalize">
                          {tx.serialnumber}
                        </td>

                        <td className="text-center font-normal text-xs capitalize">
                          {tx.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>  
            </div>
            
          </div>  

        <div className="h-[500px] w-[550px] bg-[#3A3A39] relative bottom-[550px] left-[150px] rounded-md">
          <div className="Input-container">
                <div className="h-[68px] w-[330px] mt-6 mx-auto ">
                <label
                      htmlFor="Amount"
                      className={`${roboto_500.className} font-medium text-white text-base mt-8 ml-2.5 pt-8`}
                    >
                      AMOUNT*
                    </label>
                    <CustomInput
                      type="text"
                      id="Amount"
                      className="font-normal block w-[330px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    />
                </div>
                  
                  <div className="h-[322px] w-[330px] block mt-8 mx-auto">
                  <label
                      htmlFor="Amount"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5 pt-8`}
                    >
                      GIFT CODE*
                    </label>
                    <CustomInput
                      type="text"
                      id="Amount"
                      className="font-normal block w-[330px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    />

                  <div className="h-[68px] w-[330px] mt-4">
                      <label
                      htmlFor="Amount"
                      className={`${roboto_500.className} font-medium text-white text-end mt-2 ml-2.5 pt-8`}
                    >
                      SERIAL CODE*
                    </label>
                    <CustomInput
                      type="text"
                      id="Amount"
                      className="font-normal block w-[330px] text-grey_500 text-sm py-2 mt-4 border border-border_grey rounded-sm"
                    />
                     <div className="h-[68px] w-[330px] mt-4">
                  <CustomInput
                      type="text"
                      id="Amount"
                      placeholder="ENTER AUTHORIZED PIN TO CONTINUE"
                      className="font-normal block w-[330px] text-grey_500 text-sm py-2  border border-border_grey rounded-sm"
                    />
                  </div>
                    <button type="submit" className="py-2 w-[330px] bg-[#747474] text-white font-bold">GENERATE</button>
                    <button type="submit" className="py-2 w-[330px] bg-[#EE2726] text-white font-bold mt-2">SAVE</button>
                  </div>  
                  </div>
          {/* last div */}
         </div>
         </div>
          </section>
        )
  }
};

export default page;
