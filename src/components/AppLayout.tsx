"use client";

import { manrope_400, roboto_400 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "@/config/lottie/loading.json";
import Lottie from "lottie-react";

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
}

export const SelectInput = ({
  className,
  placeholder,
  selectData,
  setType,
  textStyles,
  ...props
}: SelectProps) => {
  const [showSelect, setShowSelect] = useToggle();
  return (
    <div className="relative">
      <div className="flex items-center border border-input_grey rounded w-full py-[14px] px-5 ">
        <p
          className={`${textStyles ? textStyles : "text-input_grey"} ${
            roboto_400.className
          } flex-1 font-normal text-base`}
        >
          {placeholder}
        </p>

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
                className={`${roboto_400.className} ${
                  active && "bg-black/50"
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
        <p
          className={twMerge(
            `${roboto_400.className} flex-1 font-normal text-base text-input_grey`,
            textStyles
          )}
        >
          {placeholder}
        </p>

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
        <ul className="absolute bg-black1 w-full py-2 space-y-2">
          {selectData.map((x, index) => {
            const active = placeholder === x;
            return (
              <li
                onClick={() => [setType(x), setShowSelect(!showSelect)]}
                className={`${roboto_400.className} ${
                  active && "bg-black/50"
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
  bgColor?: string;
}

export const AppButton = ({
  className,
  title,
  disabled,
  isLoading,
  bgColor,
  ...props
}: AppButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        `${
          disabled || isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : bgColor
            ? bgColor
            : "bg-red"
        } flex flex-row items-center justify-center rounded py-[12px] font-normal text-lg text-white  ${manrope_400}`,
        className
      )}
    >
      {isLoading && (
        <Lottie
          animationData={LoadingSpinner}
          loop
          style={{ width: 35, height: 35, marginRight: 5 }}
        />
      )}
      {title}
    </button>
  );
};
