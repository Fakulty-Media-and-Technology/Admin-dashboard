"use client";

import store from "@/store/store";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const ProviderContainer = ({ children }: Props) => {
  return (
    // <AnimatePresence >
    //     <ThemeProvider enableSystem={true} attribute="class">
    <Provider store={store}>{children}</Provider>
    //     </ThemeProvider>
    // </AnimatePresence>
  );
};

export default ProviderContainer;
