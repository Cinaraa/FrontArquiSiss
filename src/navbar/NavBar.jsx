import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../profile/LoginButton';
// import LogoutButton from '../profile/LogoutButton'; // Puedes habilitarlo cuando necesites el botón de logout
import './NavBar.css';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';

const NavBar = ({ isLoggedIn, logout }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasUpdatePermission, setHasUpdatePermission] = useState(false);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const token = await getAccessTokenSilently();

        const decodedToken = jwtDecode(token);
        const permissions = decodedToken.permissions || [];

        setUserPermissions(permissions);

        const hasUpdatePerm = permissions.includes('update:reserved');
        setHasUpdatePermission(hasUpdatePerm);
      } catch (error) {
        console.error('Error fetching token and decoding:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserPermissions();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  console.log('userPermissions:', userPermissions);
  console.log('hasUpdatePermission:', hasUpdatePermission);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <Link to="/listingflights">Flights</Link>
          </li>
          {hasUpdatePermission && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          {!isLoggedIn ? (
            <li>
              <LoginButton />
            </li>
          ) : (
            <>
              <li>
                <Link to="/perfil">Mi perfil</Link>
              </li>
              {/* <li>
                <LogoutButton logout={logout} />
              </li> */}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;






