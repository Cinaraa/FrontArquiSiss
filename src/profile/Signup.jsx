import React from 'react';
import { useState } from 'react'
import './Signup.css';

import user_icon from '../assets/user_icon.png';
import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';

const Signup = () => {

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
    
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt='user icon'/>
                    <input type='text' placeholder='Name'/>
                </div>

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

export default Signup;