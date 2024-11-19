import React from "react";
import Headers from "./Headers";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <div className="">
      <Headers />
      <Outlet /> 
      <Footer></Footer>
    </div>
  );
}

export default Home;
