import React from "react";
import Header from "./assets/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./assets/homePage/Home";
import Lists from "./assets/BoardLists/Lists";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boarddata/:id" element={<Lists />} />
      </Routes>
    </>
  );
}
