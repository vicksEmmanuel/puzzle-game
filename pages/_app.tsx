import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { AppProps } from "next/app";
import Head from "next/head";
import "nprogress/nprogress.css";
import { IconContext } from "react-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Head>
          <title>Inheaden Puzzle Game</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <IconContext.Provider value={{ className: "" }}>
          <Component {...pageProps} />
          <ToastContainer position="top-right" />
        </IconContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
