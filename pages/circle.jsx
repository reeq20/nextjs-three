import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const CircleShader = dynamic(() => import("../components/CircleShader"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <CircleShader />
    </>
  );
};

export default Home;
