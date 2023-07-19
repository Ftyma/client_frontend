import React from "react";
import logo from "../assets/logo.svg";
import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <>
      <div className="fixed bg-orange w-screen z-2">
        <Sidebar />
        <img
          src={logo}
          className="mx-auto lg:w-3/12 md:h-28 lg:h-30 xs:w-6/12 xs:h-70"
        />
      </div>
    </>
  );
}
