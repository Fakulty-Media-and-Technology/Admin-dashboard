import Image from "next/image";
import { roboto_400, roboto_500 } from "@/config/fonts";
import { motion } from "framer-motion"

type ViewVotesProps = {
    onBack : () => void
}

function ViewVote({onBack}: ViewVotesProps) {
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
        </motion.div>
    )
}
export default ViewVote