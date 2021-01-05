import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const ObjShader = dynamic(() => import("../components/ObjShader"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <ObjShader />
    </>
  );
};

export default Home;
