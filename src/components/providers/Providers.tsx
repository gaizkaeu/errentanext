import { AuthProvider } from "@/components/providers/authProvider";
import { store } from "@/store/store";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";

export function Providers(props: {children: JSX.Element}) {

  return (
    <Provider store={store}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {props.children}
          </ThemeProvider>
        </AuthProvider>
    </Provider>
  );
}