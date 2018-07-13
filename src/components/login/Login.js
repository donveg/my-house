import React , { Component } from 'react';
import FromData from './FormData';
import * as img from '../../config/img';


export default class Login extends Component {
    render (){
        return (
            <div className="login-box">
                <div className="login-background"></div>
                <div className="login-inner-box">
                    <img src={img.login_logo} alt='' className='login-logo'/>
                    <h2>物业管理平台</h2>
                    <FromData />
                </div>
            </div>
        )
    }
}