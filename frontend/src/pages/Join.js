import React, { Component } from 'react';
import { JoinWrapper , JoinInput } from '../components/Auth';
import MainButton from "../components/MainButton";
import style from "./MainPage.module.css";

class Join extends Component {
    
    render() {
        return (
    <div>
        <div className={`${style.box1}`}>
            <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
        </div>
            <JoinWrapper>
                <JoinInput label="E-MAIL" name="email" />
                <JoinInput label="PASSWORD" name="password"  type="password"/>
                <JoinInput label="PASSWORD CHECK" name="password check" type="password"/>
                <div style= {{marginTop : '35px'}}>
                    <MainButton text="SIGN UP"></MainButton>
                </div>
            </JoinWrapper>
    </div>
        );
    }
}

export default Join;