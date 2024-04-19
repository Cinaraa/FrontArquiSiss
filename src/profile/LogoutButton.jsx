import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (

        <button className="login-button" onClick={() => logout()}>Log out</button>

        // <Link to="/" className="login-button" onClick={() => logout()}>Log out</Link>

    );
}

export default LogoutButton;
