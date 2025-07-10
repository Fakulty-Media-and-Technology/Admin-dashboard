import { roboto_400, roboto_500 } from "@/config/fonts";
import Image from "next/image";
import { CustomInput } from "./AppLayout";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type BackProps = {
    onBack : () => void
}

export default function ModalNotificationBox ({onBack} : BackProps) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

    return (
        <>
        <AnimatePresence>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-black4 p-6 z-[9999] rounded shadow-lg w-full max-w-[600px]">
                <button
                onClick={onBack}
                className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 ml-auto flex"
                >
                <Image src={'/closeicon.svg'} alt="close" width={25} height={25}/> 
                </button>

                <div className="mx-auto w-[372px] max-w-[500px]">
                <label className={`${roboto_500.className} text-white text-base ml-2.5`}>
                    TITLE *
                </label>
                <CustomInput
                    required
                    type="text"
                    placeholder=""
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    id="title"
                    className="w-full text-sm py-2 mt-2 border border-border_grey rounded-sm"
                />

                <div className="mt-4 w-[318px]">
                    <label className="text-grey_800 pl-2">Upload Landscape Image</label>
                    <div className="flex items-center border border-border_grey px-2 py-2 mt-2 gap-2">
                        <span className="text-sm bg-grey_3 font-[500] px-3 py-1 rounded-sm whitespace-nowrap">
                            Choose file
                        </span>
                        <label className="cursor-pointer text-sm px-2 py-1 text-black">
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border-none outline-none cursor-pointer w-[101px]"
                            />
                        </label>
                        <button className="bg-red text-white px-3 py-2 font-semibold text-sm rounded hover:bg-red-600">
                            UPLOAD
                        </button>
                    </div>
                </div>

                {imagePreview && (
                    <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-full max-w-[256px] h-auto rounded shadow"
                    />
                )}

                <div className="mt-4">
                    <label className="text-white pl-2">
                    Message <span className="text-grey_800">(300 characters only) *</span>
                    </label>
                    <textarea 
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-[134px] bg-transparent border border-border_grey outline-none p-3 mt-2"
                    ></textarea>
                </div>

                <div className="bg-red w-full h-[52px] mt-4 flex justify-center items-center text-white text-lg font-medium cursor-pointer">
                    Send
                </div>
                </div>
            </motion.div>
        </div>
        </AnimatePresence>
        </>
    )
}