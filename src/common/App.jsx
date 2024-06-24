import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode'; // Importación corregida
import NavBar from '../navbar/NavBar';

import './App.css';
import LoginButton from '../profile/LoginButton';
import LogoutButton from '../profile/LogoutButton';
import avioncita from '../assets/background.jpg';

function App() {
  const { isAuthenticated, logout, user, getAccessTokenSilently } = useAuth0();
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const getUserRolesAndPermissions = async () => {
      try {
        console.log('Attempting to get token...');
        const token = await getAccessTokenSilently();
        console.log('Token obtained:', token);

        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        const roles = decodedToken['https://panchomro.me/roles'] || [];
        const permissions = decodedToken.permissions || [];
        console.log('Roles:', roles);
        console.log('Permissions:', permissions);

        setUserRoles(roles);
        setUserPermissions(permissions);
      } catch (error) {
        console.error('Error fetching token and decoding:', error);
      }
    };

    if (isAuthenticated) {
      getUserRolesAndPermissions();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  console.log('User object:', user);
  console.log('User roles:', userRoles);
  console.log('User permissions:', userPermissions);

  return (
    <div className="App">
      <img className="background-image" src={avioncita} alt="avioncita" width="100" height="100" />
      {isAuthenticated && (
        <div className="parallel-buttons">
          <LogoutButton className="log-out-button" />
          <a className="profile-button" href="/perfil">
            Mi perfil
          </a>
        </div>
      )}
      {!isAuthenticated && <LoginButton className="login-button" />}
      <a href="/listingflights" className="flights-button">
        Flights
      </a>
      <NavBar isLoggedIn={isAuthenticated} userRoles={userRoles} userPermissions={userPermissions} />
    </div>
  );
}

export default App;




