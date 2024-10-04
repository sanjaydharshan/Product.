import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Routes/Routes";
import { useEffect } from "react";
const App = () => {
  // useEffect(() => {
  //   handleChnage('1');
  // }, []);
  // const handleChnage = (e) => {
  //   const zoom = (window.innerWidth / 1920) * 100;
  //   document.body.style.zoom = `${Math.round(zoom)}%`;
  // };
  // window.addEventListener('resize', handleChnage);
  return <RouterProvider router={Routes} />;
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
