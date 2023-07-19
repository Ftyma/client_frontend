import React from "react";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  let navigate = useNavigate();
  const goHome = () => {
    navigate("/login");
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-9xl">404</h1>
      <h1 className="text-3xl">Page not found</h1>
      <button
        onClick={goHome}
        className="px-10 py-2 text-lg bg-orange text-white mt-5"
      >
        Go to Login
      </button>
    </div>
  );
}
