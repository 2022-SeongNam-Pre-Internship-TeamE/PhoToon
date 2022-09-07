import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import AfterLogin from "./pages/AfterLogin";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Mypage from "./pages/Mypage";
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/afterlogin" element={<AfterLogin />} />
      <Route path="/Join" element={<Join />} />
      <Route path="/Mypage" element={<Mypage />} />
    </Routes>
    </BrowserRouter>
  );
  }
export default App;
