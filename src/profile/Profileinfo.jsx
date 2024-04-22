import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import NavBar from '../navbar/NavBar'; 

const Profileinfo = ()=> {
    const {user, isLoading , isAuthenticated} = useAuth0();
    console.log(isAuthenticated);
    
    return (
        isAuthenticated && (
            <div>
                <NavBar isLoggedIn={isAuthenticated} />
                <h1>Bienvenido, {user.name}</h1>
                <img src={user.picture} alt={user.name} />
                <Link to="/historial-compras">Ver historial de compras</Link>
            </div>
        )
    );
};

export default Profileinfo;

        
        