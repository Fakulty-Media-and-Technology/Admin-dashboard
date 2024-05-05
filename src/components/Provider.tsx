"use client";

import { useAppSelector } from "@/hooks/reduxHook";
import { selectShowAcc } from "@/store/slices/usersSlice";
import store from "@/store/store";
import { Provider } from "react-redux";
import Container from "./Container";

type Props = {
  children: React.ReactNode;
};

const ProviderContainer = ({ children }: Props) => {
  return (
    // <AnimatePresence >
    //     <ThemeProvider enableSystem={true} attribute="class">
    <Provider store={store}>
      <Container>{children}</Container>
    </Provider>
    //     </ThemeProvider>
    // </AnimatePresence>
  );
};

export default ProviderContainer;
