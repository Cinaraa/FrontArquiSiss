import './App.css'
import LoginButton from '../profile/LoginButton'
import LogoutButton from '../profile/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import avioncita from '../assets/background.jpg'
import NavBar from '../navbar/NavBar';

import Listingflights from '../flights/Listingflights'; // Importar Listingflights
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';



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
        const roles = decodedToken['http://localhost:3000/roles'] || [];
        const permissions = decodedToken.permissions || [];

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

  return (
    <div className="App">
      <img className="background-image"src={avioncita} alt="avioncita" width="100" height="100"/>
      {isAuthenticated && (
      <div className='parallel-buttons'>
          <LogoutButton className="log-out-button"/>
        <a className='profile-button' href='/perfil'> Mi perfil</a>
      </div>
      )}
      {!isAuthenticated && (
        <LoginButton className="login-button"/>
      )}
      <a href='/listingflights' className="flights-button"> Flights</a>
      <NavBar isLoggedIn={isAuthenticated} userRoles={userRoles} userPermissions={userPermissions} />
      {/* Renderizar Listingflights solo si el usuario está en la ruta /listingflights */}
      {window.location.pathname === '/listingflights' && (
      <Listingflights userPermissions={userPermissions} />
    )}

      {/* <NavBar isLoggedIn={isAuthenticated} logout={logout}/> */}

      {/* {isAuthenticated && (
      <div>
      <LogoutButton />
      <a href='/perfil'> Mi perfil</a>
      <a href='/listingflights'> Flights</a> 
      </div> 

      
      )}
      <a href='/listingflights' className="flights-button"> Flights</a> 
      {!isAuthenticated && (

        <LoginButton className="login-button" />
      )}

        <LoginButton/>
      )} */}

      
    </div>
  )
}
export default App;