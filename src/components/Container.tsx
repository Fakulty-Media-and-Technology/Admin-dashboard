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
        <section
          style={{ height: "100vh" }}
          className="overflow-hidden flex items-start w-full bg-black2"
        >
          <Siderbar />
          <div className="overflow-y-auto h-full flex-1">
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
