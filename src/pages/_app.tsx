import type { AppProps } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "sonner";

type AppLayoutProps = {
  Component: AppProps["Component"] & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
  pageProps: AppProps["pageProps"];
};

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppLayoutProps) => {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <Toaster richColors />
    </>
  );
};

export default api.withTRPC(MyApp);
