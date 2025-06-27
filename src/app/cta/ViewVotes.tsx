import Image from "next/image";
import { useState, useEffect } from "react";
import { roboto_400, roboto_500 } from "@/config/fonts";
import { motion, useAnimation } from "framer-motion"
import { Contestants_Votes } from "@/config/data/contestants";

type ViewVotesProps = {
    onBack : () => void
};

function ViewVote({onBack}: ViewVotesProps) {
    const [votePercent, setVotePercent] = useState(0); // to handle votes percent count
    const controls = useAnimation();


    useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration: 1.5, ease: 'linear', repeat: Infinity },
    });

    const interval = setInterval(() => {
      setVotePercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15); // fast increment and speed could be adjusted

    return () => clearInterval(interval);
  }, [controls]);

    return (
        <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
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
                    onClick={onBack}
                    className={`${roboto_500.className} flex items-center gap-x-4 md:mr-20 ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-[17px] text-yellow  text-center cursor-pointer`}
                >
                    Back to contestant
                </div>
            </div>

            {/* contestant */}
            <div className="ml-8 my-6">
                <table>
                    <tbody>
                        {Contestants_Votes.slice(0, 7).map((_, index) => (
                        <tr key={index} >
                            <td className="w-[496px]">
                            {Contestants_Votes[index] && (
                                <div className="flex justify-between items-center pr-6">
                                    <div className="flex items-center gap-x-4 py-4">
                                        <Image src={Contestants_Votes[index].image} 
                                        alt={Contestants_Votes[index].name} 
                                        width={51.8}
                                        height={53.2}
                                        className="rounded-full" />
                                        <p className="text-white">{Contestants_Votes[index].name}</p>
                                    </div>
                               
                                    <div className="flex items-center gap-x-4 relative">
                                        <p className={`${roboto_500.className} bg-blue_300 py-4 px-6 rounded-full font-semibold text-sm text-white`}>{Contestants_Votes[index].votes} votes</p>
                                       <div className="w-[42px] h-[42px] bg-grey4 rounded-full text-sm text-center text-white1 font-medium py-3">{votePercent}%</div>
                                    </div>
                                </div>
                            )}
                            </td>
                            <td className="w-[496px]">
                            {Contestants_Votes[index + 7] && (
                                <div className="flex justify-between items-center pl-6">
                                    <div className="flex items-center gap-x-4">
                                        <Image src={Contestants_Votes[index].image} 
                                        alt={Contestants_Votes[index].name} 
                                        width={51.8}
                                        height={53.2}
                                        className="rounded-full" />
                                        <p className="text-white">{Contestants_Votes[index].name}</p>
                                    </div>
                                
                                    <div className="flex items-center gap-4">
                                        <p className={`${roboto_500.className} bg-blue_300 py-4 px-6 rounded-full font-semibold text-sm text-white text-center`}>{Contestants_Votes[index].votes} votes</p>
                                        <div className="w-[42px] h-[42px] bg-grey4 rounded-full text-sm text-center text-white1 font-medium py-3">{votePercent}%</div>
                                    </div>
                                </div>
                            )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </motion.div>
    )
}
export default ViewVote