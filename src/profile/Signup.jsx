import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

import user_icon from '../assets/user_icon.png';
import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/new', { name, email, password });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <button type='submit'>Sign Up</button>
        </form>
    );
};


export default Signup;