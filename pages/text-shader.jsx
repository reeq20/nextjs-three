import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const TextShader = dynamic(() => import("../components/TextShader"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <TextShader />
    </>
  );
};

export default Home;
