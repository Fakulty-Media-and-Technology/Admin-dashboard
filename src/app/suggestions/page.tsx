"use client";
import React, {useState} from "react";
import Image from "next/image";

const page = () => {
  const [userPic, setUserPic] = useState<File | null>(null);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) setUserPic(files[0]);
  }
  return (
    <div className=" ml-14 relative w-fit">
    {/* Here */}
    {userPic ? (
      <Image
        src={URL.createObjectURL(userPic)}
        width={105}
        height={106}
        alt=""
        className="rounded"
      />
    ) : (
      <Image
        src="/accDummy.svg"
        width={105}
        height={106}
        alt=""
        className="rounded"
      />
    )}


                    <div className="w-fit relative">
                      
                      <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        className="absolute top-0 -left-3"
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
     </div>               
  )

    
}

export default page;