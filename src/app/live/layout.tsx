import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default layout;
