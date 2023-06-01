import NavBar from "@/components/layout/NavBar";
import "@/styles/globals.css";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (pageProps.token) {
      axios.defaults.headers.common.Authorization = pageProps.token;
    }
  }, []);
  const getLayout = (page) => (
    <>
      <Head>
        <title>Cocktell 관리자 페이지</title>
      </Head>
      {Component.getLayout ? (
        Component.getLayout(page)
      ) : (
        <>
          <NavBar />
          {page}
        </>
      )}
    </>
  );
  return getLayout(<Component {...pageProps} />);
}
