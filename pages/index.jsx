import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// const Stage = dynamic(() => import("../components/Stage"), { ssr: false });
const ShaderController = dynamic(
  () => import("../components/ShaderController"),
  { ssr: false }
);

const Home = () => {
  return (
    <>
      <ShaderController />
    </>
  );
};

export default Home;
