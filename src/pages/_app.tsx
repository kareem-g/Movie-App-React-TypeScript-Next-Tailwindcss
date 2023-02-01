import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { StoreProvider } from "easy-peasy";
import store from "@/store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    // <RecoilRoot>

    <StoreProvider store={store}>
      {/* TODO: AuthProvider Component Goes Here... */}
      <Component {...pageProps} />
    </StoreProvider>

    // </RecoilRoot>
  );
}
