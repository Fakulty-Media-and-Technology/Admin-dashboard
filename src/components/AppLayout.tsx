"use client";

import React, { ComponentProps, useCallback } from "react";
import dynamic from "next/dynamic"; // FIX: use dynamic import for client-only libs
import { manrope_400, roboto_400 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
// import LoadingSpinner JSON normally (safe). Keep it static; the Lottie renderer is dynamic.
import LoadingSpinner from "@/config/lottie/loading.json";

// FIX: dynamically import lottie-react to avoid SSR `document is not defined` errors
const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});

// -----------------------------
// Generic Custom Input
// -----------------------------
export const CustomInput = ({
  className,
  ...props
}: ComponentProps<"input">) => {
  return (
    <input
      {...props}
      // FIX: use roboto className (.className) and keep twMerge for combining classes
      className={twMerge(
        `${roboto_400.className} font-normal text-base text-input_grey w-full py-[14px] px-5 bg-transparent border border-input_grey rounded outline-none`,
        className
      )}
    />
  );
};

// -----------------------------
// Input with Icon (like search)
// -----------------------------
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
        // FIX: ensure input is accessible when using keyboard (tab)
        aria-label={props["aria-label"] ?? "input-with-icon"}
      />
      <button
        onClick={onPress}
        aria-label="input action"
        type="button"
        className="ml-3"
      >
        <Image src={src} width={width} height={height} alt="" />
      </button>
    </div>
  );
};

// -----------------------------
// Select Input (reusable)
// -----------------------------
interface SelectProps extends ComponentProps<"div"> {
  placeholder: string;
  selectData: string[];
  setType: React.Dispatch<React.SetStateAction<string>>;
  textStyles?: string;
  categoryListing?: JSX.Element;
}

/**
 * SelectInput and SelectInputForm share a lot of code.
 * I created keyboard accessible click/keyboard handlers and ensured z-index for overlays.
 */
const renderListItem = (
  x: string,
  index: number,
  placeholder: string,
  setType: React.Dispatch<React.SetStateAction<string>>,
  setShowSelect: (v: boolean) => void
) => {
  const active = placeholder === x;
  // FIX: add keyboard accessibility and prevent array expressions in onClick
  const handleChoose = () => {
    setType(x);
    setShowSelect(false);
  };

  return (
    <li
      tabIndex={0}
      role="option"
      aria-selected={active}
      onClick={handleChoose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleChoose();
        }
      }}
      className={`${roboto_400.className} ${active ? "bg-black/50" : ""} hover:bg-gray-800 py-2 px-3 font-normal text-sm text-white cursor-pointer`}
      key={index}
    >
      {x}
    </li>
  );
};

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
    <div className="relative" {...props}>
      <div className="flex items-center border border-input_grey rounded w-full py-[14px] px-5 ">
        {categoryListing ? (
          categoryListing
        ) : (
          <p
            className={`${textStyles ? textStyles : "text-input_grey"} ${roboto_400.className} flex-1 font-normal text-base`}
          >
            {placeholder}
          </p>
        )}

        <button
          onClick={() => setShowSelect(!showSelect)}
          aria-haspopup="listbox"
          aria-expanded={showSelect}
          type="button"
        >
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
        // FIX: add z-index so dropdown sits above other elements
        <ul className="absolute bg-black1 w-full py-2 space-y-2 z-[99999]" role="listbox">
          {selectData.map((x, index) =>
            renderListItem(x, index, placeholder, setType, setShowSelect)
          )}
        </ul>
      )}
    </div>
  );
};

// -----------------------------
// SelectInputForm - compact variant used in forms
// -----------------------------
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
    <div className="relative" {...props}>
      <div
        className={twMerge(
          `flex items-center border border-input_grey rounded w-full py-[8px] px-5 ${className}`
        )}
      >
        {categoryListing ? (
          categoryListing
        ) : (
          <p
            className={`${textStyles ? textStyles : "text-input_grey"} ${roboto_400.className} flex-1 font-normal text-base`}
          >
            {placeholder}
          </p>
        )}

        <button
          onClick={() => setShowSelect(!showSelect)}
          aria-haspopup="listbox"
          aria-expanded={showSelect}
          type="button"
        >
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
        <ul className="absolute bg-black1 w-full z-[99999] py-2 space-y-2" role="listbox">
          {selectData.map((x, index) =>
            renderListItem(x, index, placeholder, setType, setShowSelect)
          )}
        </ul>
      )}
    </div>
  );
};

// -----------------------------
// AppButton
// -----------------------------
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
  // FIX: ensure manrope font uses .className
  const fontClass = manrope_400.className;

  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        `${disabled || isLoading
          ? "bg-gray-500 cursor-not-allowed"
          : bgColor
          ? bgColor
          : "bg-red"
        } flex flex-row items-center justify-center rounded py-[12px] font-normal text-lg text-white  ${fontClass}`,
        className
      )}
      // FIX: explicit type
      type={props.type ?? "button"}
      aria-disabled={disabled}
    >
      {isLoading && (
        // FIX: Lottie is dynamically imported → safe for SSR
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

export default null; // FIX: keep default export empty to avoid accidental server-side import usage
