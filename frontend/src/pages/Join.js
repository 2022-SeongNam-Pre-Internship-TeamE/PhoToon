import React, { useState }from "react";
import { JoinWrapper, JoinInput } from "../components/Auth";
import style from "./MainPage.module.css";
import axios from 'axios';


export default function Join() {

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [passwdcheck, setPasswdcheck] = useState('')
  const [errors, setErrors] = useState(false)

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePwd1 = (e) => {
    setPasswd(e.target.value)
  }

  const onChangePwd2 = (e) => {
    setPasswdcheck(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: email,
      passwd: passwd,
      passwdcheck: passwdcheck
    }

    // 유효성 검사
    if(passwd !== passwdcheck) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다')
      return false
    }

    axios.post('/api/v1/mall/join', user)
      .then(res => {
        if (res.data.key) {
          localStorage.clear()
          localStorage.setItem('token', res.data.key)
          // 사용하려면 App.js에서 /로 라우팅해야 한다
          window.location.replace('/')
        } else {
          setEmail('')
          setPasswd('')
          setPasswdcheck('')
          localStorage.clear()
          setErrors(true)
        }
      })
      .catch(err => {
        console.clear()
        alert('아이디 혹은 비밀번호가 일치하지 않습니다')
      })
  }
  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      <JoinWrapper>
        <form onSubmit={onSubmit}>
        <JoinInput 
        type="email"
        value={email}
        onChange={onChangeEmail}
        required
        label="E-MAIL" />
        <JoinInput 
        type="password"
        value={passwd}
        onChange={onChangePwd1}
        required
        label="PASSWORD"  />
        <JoinInput
          type="password"
          value={passwdcheck}
          onChange={onChangePwd2}
          required
          label="PASSWORD CHECK"
        />
        <div style={{ marginTop: "35px" }}>
          {/* 임시로 로그인 페이지 라우팅 */}
          <button url="/Login" value='Signup' >Sign UP</button>
        </div>
        </form>
      </JoinWrapper>
    </div>
  );
}
