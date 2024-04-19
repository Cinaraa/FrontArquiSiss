import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (

        <button className="log-out-button" onClick={() => loginWithRedirect()}>Log In</button>

        // <Link to="/login" className="log-out-button" onClick={() => loginWithRedirect()}>Log In</Link>

    );
}

export default LoginButton;
