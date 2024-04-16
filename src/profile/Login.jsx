import React from 'react';
import { useState } from 'react'
import './Login.css';

import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';

const Login = () => {

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Log In</div>
                <div className='underline'></div>
    
            </div>
            <div className='inputs'>

                <div className='input'>
                    <img src={email_icon} alt='email icon'/>
                    <input type='email' placeholder='Email ID'/>
                </div>

                <div className='input'>
                    <img src={password_icon} alt='password icon'/>
                    <input type='password' placeholder='Password'/>
                </div>

            </div>
            <div className='submit-container'>
                <div className='submit'>Sign Up</div>
                <div className='submit'>Log in</div>
            </div>
        </div>
    );
};

export default Login;