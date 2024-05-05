import { useAppSelector } from "@/hooks/reduxHook";
import { AccScreen } from "@/screens";
import { selectShowAcc } from "@/store/slices/usersSlice";
import React from "react";
import Siderbar from "./Siderbar";
import { Header } from ".";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  const step = useAppSelector(selectShowAcc);

  return (
    <>
      {step ? (
        <section className="flex items-start w-full bg-black2">
          <Siderbar />
          <div className="flex-1">
            <Header />
            <AccScreen />
          </div>
        </section>
      ) : (
        children
      )}
    </>
  );
};

export default Container;
