import React, { useState } from "react";
import { LoginWrapper, LoginInput, RightAlignedLink } from "../components/Auth";
import style from "./MainPage.module.css";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [errors, setErrors] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: email,
      passwd: passwd
    }

    axios.post('/api/v1/auth', user)
      .then(res => {
        if (res.data.key) {
          localStorage.clear()
          localStorage.setItem('token', res.data.key)
          // 사용하려면 App.js에서 /로 라우팅해야 한다
          window.location.replace('/')
        } else {
          setEmail('')
          setPasswd('')
          localStorage.clear()
          setErrors(true)
        }
      })
      .catch(err => {
        console.clear()
        alert('아이디 또는 비밀번호가 일치하지 않습니다')
        setEmail('')
        setPasswd('')
      })
  }

  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      
      <LoginWrapper>
        <form onSubmit={onSubmit}>
        <LoginInput 
        type='email'
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        placeholder="E-MAIL" />
        <LoginInput 
        type='password'
        value={passwd}
        required
        onChange={e => setPasswd(e.target.value)}
        placeholder="PASSWORD"  />
        <div style={{ marginTop: "35px" }}>
          <button url="/AfterLogin" >Login</button>
        </div>
        </form>
        <RightAlignedLink to="/Join">SIGN UP →</RightAlignedLink>
        
      </LoginWrapper>
    </div>
  );
}
