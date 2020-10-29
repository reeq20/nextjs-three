import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Stage = dynamic(() => import("../components/Stage"), { ssr: false });

const Home = () => {
  return (
    <>
      <Stage />
    </>
  );
};

export default Home;
