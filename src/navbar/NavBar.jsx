import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../profile/LoginButton';
import LogoutButton from '../profile/LogoutButton';
import './NavBar.css';

const NavBar = ({ isLoggedIn, logout, userPermissions = [] }) => {
  const hasUpdatePermission = userPermissions.includes('update:reserved');

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
              <li>
                {/* <LogoutButton logout={logout} /> */}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;




