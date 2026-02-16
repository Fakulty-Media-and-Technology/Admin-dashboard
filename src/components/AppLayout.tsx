"use client";

import { manrope_400, roboto_400 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "@/config/lottie/loading.json";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";

export const CustomInput = ({
  className,
  ...props
}: ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className={twMerge(
        `${roboto_400.className} font-normal text-base text-input_grey w-full py-[14px] px-5 bg-transparent border border-input_grey rounded outline-none`,
        className
      )}
    />
  );
};

interface InputProps extends ComponentProps<"input"> {
  src: string;
  onPress: () => void;
  width: number;
  height: number;
}

export const InputWithIcon = ({
  className,
  src,
  onPress,
  width,
  height,
  ...props
}: InputProps) => {
  return (
    <div className="flex items-center border border-input_grey rounded w-full py-[14px] px-5 ">
      <input
        {...props}
        className={twMerge(
          `${roboto_400.className} font-normal text-base text-input_grey flex-1  bg-transparent  outline-none`,
          className
        )}
      />
      <button onClick={onPress}>
        <Image src={src} width={width} height={height} alt="" />
      </button>
    </div>
  );
};

interface SelectProps extends ComponentProps<"div"> {
  placeholder: string;
  selectData: string[];
  setType: React.Dispatch<React.SetStateAction<string>>;
  textStyles?: string;
  categoryListing?: JSX.Element
}

export const SelectInput = ({
  className,
  placeholder,
  categoryListing,
  selectData,
  setType,
  textStyles,
  ...props
}: SelectProps) => {
  const [showSelect, setShowSelect] = useToggle();
  return (
    <div className="relative">
      <div className="flex items-center border border-input_grey rounded w-full py-[14px] px-5 ">
        {categoryListing ? categoryListing : <p
          className={`${textStyles ? textStyles : "text-input_grey"} ${roboto_400.className
            } flex-1 font-normal text-base`}
        >
          {placeholder}
        </p>}

        <button onClick={() => setShowSelect(!showSelect)}>
          <Image
            src="/down.png"
            width={17}
            height={12}
            alt=""
            className={showSelect ? "rotate-180" : ""}
          />
        </button>
      </div>

      {showSelect && (
        <ul className="absolute bg-black1 w-full py-2 space-y-2">
          {selectData.map((x, index) => {
            const active = placeholder === x;
            return (
              <li
                onClick={() => [setType(x), setShowSelect(!showSelect)]}
                className={`${roboto_400.className} ${active && "bg-black/50"
                  } hover:bg-gray-800 py-2 px-3 font-normal text-sm text-white cursor-pointer`}
                key={index}
              >
                {x}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const SelectInputForm = ({
  className,
  placeholder,
  selectData,
  textStyles,
  setType,
  categoryListing,
  ...props
}: SelectProps) => {
  const [showSelect, setShowSelect] = useToggle();
  return (
    <div className="relative">
      <div
        className={twMerge(
          `flex items-center border border-input_grey rounded w-full py-[8px] px-5 ${className}`
        )}
      >
        {categoryListing ? categoryListing : <p
          className={`${textStyles ? textStyles : "text-input_grey"} ${roboto_400.className
            } flex-1 font-normal text-base`}
        >
          {placeholder}
        </p>}

        <button onClick={() => setShowSelect(!showSelect)}>
          <Image
            src="/down.png"
            width={10}
            height={7}
            alt=""
            className={showSelect ? "rotate-180" : ""}
          />
        </button>
      </div>

      {showSelect && (
        <ul className="absolute bg-black1 w-full z-[99999] py-2 space-y-2">
          {selectData.map((x, index) => {
            const active = placeholder === x;
            return (
              <li
                onClick={() => [setType(x), setShowSelect(!showSelect)]}
                className={`${roboto_400.className} ${active && "bg-black/50"
                  } hover:bg-gray-800 py-2 px-3 font-normal text-sm text-white cursor-pointer`}
                key={index}
              >
                {x}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

interface AppButtonProps extends ComponentProps<"button"> {
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
  showPercentage?: boolean;
  bgColor?: string;
}


export const AppButton = ({
  className,
  title,
  disabled,
  isLoading,
  bgColor,
  showPercentage,
  ...props
}: AppButtonProps) => {
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading && showPercentage) {
      setSimulatedProgress(0); 
      
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            return 99;
          }
          const increment = prev < 70 ? 5 : 1; 
          return prev + increment;
        });
      }, 150); // Adjust speed here
    } else {
      setSimulatedProgress(0);
    }

    return () => clearInterval(interval);
  }, [isLoading, showPercentage]);

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={twMerge(
        `${disabled || isLoading
          ? "bg-gray-500 cursor-not-allowed"
          : bgColor || "bg-red"
        } flex flex-row items-center justify-center rounded py-[12px] font-normal text-lg text-white min-w-[140px] transition-all ${manrope_400}`,
        className
      )}
    >
      {/* Variant A: Lottie Spinner */}
      {isLoading && !showPercentage && (
        <Lottie
          animationData={LoadingSpinner}
          loop
          style={{ width: 35, height: 35, marginRight: 5 }}
        />
      )}

      {/* Variant B: Simulated Percentage */}
      {isLoading && showPercentage && (
        <span className="mr-3 tabular-nums font-bold text-base animate-pulse">
          {simulatedProgress}%
        </span>
      )}

      <span>{isLoading && showPercentage ? "Processing..." : title}</span>
    </button>
  );
};
