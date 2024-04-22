import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import NavBar from '../navbar/NavBar'; 
import './Profileinfo.css'; // Importa el archivo CSS

const Profileinfo = ()=> {
    const { user, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <div>
                <NavBar isLoggedIn={isAuthenticated} />
                <h1>Bienvenido, {user.name}</h1>
                <img src={user.picture} alt={user.name} />
                <Link className="button-profile submit" to="/historial-compras">Ver historial de compras</Link>
            </div>
        )
    );
};

export default Profileinfo;



        
        