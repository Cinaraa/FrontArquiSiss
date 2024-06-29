import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExistingOffersCard from './ExistingOffersCard';
//import './ExistingOffersCard.css';

import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';

export default function AdminexistingOffers() {
  const [existingOffers, setExistingOffers] = useState([]);
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

  useEffect(() => {
    const fetchExistingIncomingOffers = async () => {
      try {
        const response = await axios.get('https://panchomro.me/offers/incoming-offers');
        setExistingOffers(response.data);
      } catch (error) {
        console.error('Error fetching reserved flights:', error);
      }
    };

    fetchExistingIncomingOffers();
  }, []);


  return (
    <div>
      {isAuthenticated && (

        <div className="admin-existing-offers-list">
            <h1>Ofertas Entrantes</h1>
          {Array.isArray(existingOffers) && existingOffers.map(offer => (
            <ExistingOffersCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
      {!isAuthenticated && (
        <div className="admin-existing-offers-list">
          <h1>Log in to see the existing offers</h1>
        </div>
      )}
    </div>
  );
}
