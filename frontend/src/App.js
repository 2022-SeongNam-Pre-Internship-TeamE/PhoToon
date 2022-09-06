import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AfterLogin from "./pages/AfterLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/afterlogin" element={<AfterLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
