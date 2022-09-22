import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import AfterLogin from "./pages/AfterLoginPage";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Mypage from "./pages/Mypage";
import Start from "./pages/StartPage";
import ChoiceCartoon from "./pages/ChoiceCartooonPage";
import Background from "./pages/BackgroundPage";
import Result from "./pages/ResultPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/afterlogin" element={<AfterLogin />} />
        <Route path="/join" element={<Join />} />
        <Route path="/start" element={<Start />} />
        <Route path="/choicecartoon" element={<ChoiceCartoon />} />
        <Route path="/background" element={<Background />} />
        <Route path="/result" element={<Result />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
