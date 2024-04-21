import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from '../navbar/NavBar'; 


const Profileinfo = ()=> {
    const {user, isLoading , isAuthenticated} = useAuth0();
    console.log(isAuthenticated);
    if (!isLoading) {
        const userId = user.sub;
        console.log('userId:', userId);
    }
    
    
    return (
        
        
        isAuthenticated && (
            <div>
                <NavBar isLoggedIn={isAuthenticated} />
                <h1>Bienvenido, {user.name}</h1>
                <img src={user.picture} alt={user.name} />
            </div>
        )
            );
        };

export default Profileinfo;
        
        