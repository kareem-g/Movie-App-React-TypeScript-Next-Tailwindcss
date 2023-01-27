import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* Higher Order Component */}
      {/* TODO: AuthProvider Component Goes Here... */}
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
