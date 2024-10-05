import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Routes/Routes";
import { useEffect } from "react";
import { Toaster } from "sonner";

const App = () => {
  // useEffect(() => {
  //   handleChnage('1');
  // }, []);
  // const handleChnage = (e) => {
  //   const zoom = (window.innerWidth / 1920) * 100;
  //   document.body.style.zoom = `${Math.round(zoom)}%`;
  // };
  // window.addEventListener('resize', handleChnage);
  return (
    <>
      <Toaster richColors />
      <RouterProvider router={Routes} />
    </>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
