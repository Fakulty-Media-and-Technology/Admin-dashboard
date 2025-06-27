'use client';

import { CTA_Table, CTA_TableHeads } from "@/config/data/featured.data";
import { roboto_400, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { useState } from "react";
import { ModalProps } from "./ModalComp";
import ViewVote from "./ViewVotes";
import { AnimatePresence, motion } from "framer-motion";




export const ClientsComponent = ({ handleClose }: ModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectCountry, setCountry] = useState<string>("Select currency");
    const [mode, setMode] = useState ("default")


    return (
        <>
        <AnimatePresence mode="wait">
        { mode === "default" && (
            <motion.div 
            key="default"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="px-10 bg-black3 py-5 pb-6 mt-12">
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
                    onClick={() => setMode("ViewVote")}
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
                                            className={`${roboto_500.className} ${isCN ? "max-w-[80px] text-wrap" : "max-w-[120px]"
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
        </motion.div>
        )}
        
        {mode === "ViewVote" && (
            <ViewVote onBack={() => setMode("default")}/>
        )}
        </AnimatePresence>
        </>
    );
};