import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const WaveShader = dynamic(() => import("../components/WaveShader"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <WaveShader />
    </>
  );
};

export default Home;
