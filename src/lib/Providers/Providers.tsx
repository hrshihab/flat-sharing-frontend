"use client";

import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProvider } from "@mui/material";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
