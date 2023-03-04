"use client";
import { AuthProvider } from "@/components/providers/authProvider";
import { store } from "@/store/store";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { AhoyProvider } from "./ahoyProvider";


export function Providers(props: { children: JSX.Element }) {



  return (
    <Provider store={store}>
      <AuthProvider>
        <AhoyProvider>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </AhoyProvider>
      </AuthProvider>
    </Provider>
  );
}