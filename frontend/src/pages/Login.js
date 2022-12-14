import React, { useEffect, useState } from "react";
import { LoginWrapper, LoginInput, RightAlignedLink } from "../components/Auth";
import style from "./MainPage.module.css";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import MainButton from "../components/MainButton";

export default function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("") 
const navigate = useNavigate();

const checkUser = () => {
  if (email === "" || password === "") {
    alert("아이디와 비밀번호를 입력해주세요!");
  }
  else{
    navigate("/afterlogin");
  }
}
axios
  .post('http://127.0.0.1:8000/api/v1/auth', {
    email: email,
    password: password,
  })
  .then(response => {
    // Handle success.
    console.log('로그인 완료');
    console.log('email:',email);
    console.log('User token', response.data.token);
    console.log('User profile', response.data.user);
    console.log("사랑");
    console.log(response.data.user.id);
    
    sessionStorage.setItem('email',email);
    sessionStorage.setItem("token" , response.data.token.access);
    sessionStorage.setItem('user_id',response.data.user.id);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });


//   const [email, setEmail] = useState('')
//   const [passwd, setPasswd] = useState('')
//   const [errors, setErrors] = useState(false)

//   const onSubmit = (e) => {
//     e.preventDefault()

//     const user = {
//       email: email,
//       passwd: passwd
//     }

//     axios.post('/api/v1/auth', user)
//       .then(res => {
//         if (res.data.key) {
//           localStorage.clear()
//           localStorage.setItem('token', res.data.key)
//           // 사용하려면 App.js에서 /로 라우팅해야 한다
//           window.location.replace('/')
//         } else {
//           setEmail('')
//           setPasswd('')
//           localStorage.clear()
//           setErrors(true)
//         }
//       })
//       .catch(err => {
//         console.clear()
//         alert('아이디 또는 비밀번호가 일치하지 않습니다')
//         setEmail('')
//         setPasswd('')
//       })
//   }

useEffect(() => {
  if (localStorage.getItem("token")){
    navigate("/login");
  }
}, []);

  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      
      <LoginWrapper>
        <LoginInput 
        type='email'
        value={email} 
        required
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="E-MAIL" />

        <LoginInput 
        type='password'
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        placeholder="PASSWORD"  />
        <div onClick={() => {
            checkUser();
            
          }}>
        <div className="flex justify-center items-center">
          
          <MainButton text = "Login"/>
        </div>
        </div>
        <RightAlignedLink to="/Join">SIGN UP →</RightAlignedLink>
      </LoginWrapper>
    </div>
  );
}
