"use client";

import { useAppSelector } from "@/hooks/reduxHook";
import { selectShowAcc } from "@/store/slices/usersSlice";
import store from "@/store/store";
import { Provider } from "react-redux";
import Container from "./Container";
import AuthGuard from "./AuthGuard";
import { ProgressProvider } from "@bprogress/next/app";

type Props = {
  children: React.ReactNode;
};

const ProviderContainer = ({ children }: Props) => {
  return (
    // <AnimatePresence >
    //     <ThemeProvider enableSystem={true} attribute="class">
    <Provider store={store}>
      <AuthGuard>
        <ProgressProvider
          height="3px"
          color="#EE2726"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {/* <Container> */}
          {children}
          {/* </Container> */}
        </ProgressProvider>
      </AuthGuard>
    </Provider>
    //     </ThemeProvider>
    // </AnimatePresence>
  );
};

export default ProviderContainer;
