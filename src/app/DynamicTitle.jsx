import { useRouter } from "next/router";
import Head from "next/head";

const DynamicTitle = () => {
  const router = useRouter();
  const pageTitle = {
    "/": "Home - My Website",
    "/news": "news - My Website",
    "/contact": "Contact Us - My Website",
  };

  return (
    <>
      <Head>
        <title>{pageTitle[router.pathname] || "TOJO Global"}</title>
      </Head>
      <h1>{pageTitle[router.pathname]}</h1>
    </>
  );
};

export default DynamicTitle;
