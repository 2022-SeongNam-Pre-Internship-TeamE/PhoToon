import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Mypage from "./pages/Mypage";

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Join" element={<Join />} />
      <Route path="/Mypage" element={<Mypage />} />
      <Route path="/Mainpage" element={<MainPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
