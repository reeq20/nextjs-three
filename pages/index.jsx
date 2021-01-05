import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// const Stage = dynamic(() => import("../components/Stage"), { ssr: false });
const Cat = dynamic(() => import("../components/Cat"), { ssr: false });

const Home = () => {
  return (
    <>
      <Cat />
    </>
  );
};

export default Home;
