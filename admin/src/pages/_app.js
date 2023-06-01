import NavBar from "@/components/layout/NavBar";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
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
