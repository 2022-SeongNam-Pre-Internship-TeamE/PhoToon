import React, { useState }from "react";
import { useNavigate} from "react-router-dom";
import { JoinWrapper, JoinInput } from "../components/Auth";
import style from "./MainPage.module.css";
import axios from 'axios';

export default function Join() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordcheck, setPasswordcheck] = useState("")
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate();
 
  const user = () => {
    axios
  .post('http://127.0.0.1:8000/api/v1/join', {
    email: email,
    password: password,
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    localStorage.setItem('token', response.data.jwt);
    navigate("/login");
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
    }

  
  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      <JoinWrapper>
        <JoinInput 
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        required
        label="E-MAIL" />

        <JoinInput 
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        required
        label="PASSWORD"  />

        {/* <JoinInput
          type="password"
          value={passwdcheck}
          //onChange={onChangePwd2}
          required
          label="PASSWORD CHECK"
        /> */}

        <div style={{ marginTop: "35px" }}>
          {/* 임시로 로그인 페이지 라우팅 */}
          <button onClick={() => {
            user();
          }}>Sign UP</button>
        </div>
        
      </JoinWrapper>
    </div>
  );
}
