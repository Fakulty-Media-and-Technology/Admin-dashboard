"use client";

import { useAppSelector } from "@/hooks/reduxHook";
import { selectShowAcc } from "@/store/slices/usersSlice";
import store from "@/store/store";
import { Provider } from "react-redux";
import Container from "./Container";
import AuthGuard from "./AuthGuard";

type Props = {
  children: React.ReactNode;
};

const ProviderContainer = ({ children }: Props) => {
  return (
    // <AnimatePresence >
    //     <ThemeProvider enableSystem={true} attribute="class">
    <Provider store={store}>
      {/* <AuthGuard> */}
      {/* <Container> */}
      {children}
      {/* </Container> */}
      {/* </AuthGuard> */}
    </Provider>
    //     </ThemeProvider>
    // </AnimatePresence>
  );
};

export default ProviderContainer;
