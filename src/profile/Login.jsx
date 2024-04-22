import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';

import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/login', { email, password });
            console.log(response.data);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <button type='submit'>Log in</button>
        </form>
    );
};


export default Login;