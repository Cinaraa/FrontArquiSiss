import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../navbar/NavBar';
import Listingflights from '../flights/Listingflights';
import Admin from '../admin/Admin'; // Importar el componente Admin
import './App.css';
import LoginButton from '../profile/LoginButton';
import LogoutButton from '../profile/LogoutButton';
import avioncita from '../assets/background.jpg';

function App() {
  const { isAuthenticated, logout, user, getAccessTokenSilently } = useAuth0();
  const [userRoles, setUserRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  console.log('userPermissions de app:', userPermissions);

  useEffect(() => {
    const getUserRolesAndPermissions = async () => {
      try {
        const token = await getAccessTokenSilently();

        const decodedToken = jwtDecode(token);
        const permissions = decodedToken.permissions || [];

        setUserRoles(decodedToken['https://panchomro.me/roles'] || []);
        setUserPermissions(permissions);
      } catch (error) {
        console.error('Error fetching token and decoding:', error);
      }
    };

    if (isAuthenticated) {
      getUserRolesAndPermissions();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

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
      {/* Configurar la ruta /admin */}
      {window.location.pathname === '/admin' && <Admin />}
      <Listingflights userPermissions={userPermissions} />
    </div>
  );
}

export default App;
