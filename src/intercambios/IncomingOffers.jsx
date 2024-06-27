import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offer from './Offer';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode'; 

import { useNavigate } from 'react-router-dom';
import './Exchanges.css';

const IncomingOffers = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const fetchUserPermissions = async () => {
        try {
            const token = await getAccessTokenSilently();
            const decodedToken = jwtDecode(token);
            const permissions = decodedToken.permissions || [];
            setUserPermissions(permissions);
        } catch (error) {
            console.error('Error fetching token and decoding:', error);
        }
    };

    if (isAuthenticated) {
        fetchUserPermissions();
    }
}, [isAuthenticated, getAccessTokenSilently]);

    //search for all offers
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/offers/incoming-offers');
                setOffers(response.data.offers); // Acceder a la clave 'offers'

                // Obtener aeropuertos de salida únicos
                const uniqueDepartureAirports = Array.from(new Set(response.data.offers.map(offer => offer.departure_airport_id)));
                setDepartureAirports(uniqueDepartureAirports);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchOffers();
      }, [getAccessTokenSilently]);

  return (
    <div>
        {isAuthenticated} && (
        <div>
          <h2>Incoming Offers</h2>
          <div className="offers-container">
            {offers.map(offer => (
              <Offer key={offer.id} offer={offer} userPermissions={userPermissions} />
            ))}
          </div>
          </div>
        )
      <h2>Exchanges Menu</h2>
      <button onClick={() => navigate('/admin/view-exchanges')}>Go Back</button>
    </div>
  );
};

export default IncomingOffers;
