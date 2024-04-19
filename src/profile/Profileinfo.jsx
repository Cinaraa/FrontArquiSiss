import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '../navbar/NavBar';

const Profileinfo = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <div>
      <NavBar isLoggedIn={isAuthenticated} logout={logout} />
      {isAuthenticated && (
        <div>
          <h1>Bienvenido, {user.name}</h1>
          <img src={user.picture} alt={user.name} />
        </div>
      )}
    </div>
  );
};

export default Profileinfo;

        
        