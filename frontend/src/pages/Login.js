import React, { Component } from 'react';
import { LoginWrapper, InputWithLabel, RightAlignedLink } from '../components/Auth';
import MainButton from "../components/MainButton";

class Login extends Component {
    
    render() {
        return (
            <LoginWrapper>
                <InputWithLabel name="email" placeholder="이메일"/>
                <InputWithLabel name="password" placeholder="비밀번호" type="password"/>
                <div style= {{marginTop : '35px'}}>
                    <MainButton text="LOGIN"></MainButton>
                </div>
                <RightAlignedLink to="/Join">회원가입</RightAlignedLink>
            </LoginWrapper>
            
        );
    }
}

export default Login;