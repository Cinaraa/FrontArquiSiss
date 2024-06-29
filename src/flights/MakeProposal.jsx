// AdminReservedFlights.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MakeProposalCard from './MakeProposalCard';
// import './ReservedFlights.css';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';

export default function AdminReservedFlights({ auction_id }) {
  const [reservedFlights, setReservedFlights] = useState([]);
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
    const fetchReservedFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/reserved-flights');
        setReservedFlights(response.data);
      } catch (error) {
        console.error('Error fetching reserved flights:', error);
      }
    };

    fetchReservedFlights();
  }, []);


  return (
    <div>
      {isAuthenticated && (
        <div className="admin-reserved-flights-list">
          {Array.isArray(reservedFlights) && reservedFlights.map(flight => (
            <MakeProposalCard key={flight.id} flight={flight.id} auction={auction_id} />
          ))}
        </div>
      )}
      {!isAuthenticated && (
        <div className="admin-reserved-flights-list">
          <h1>Log in to see the reserved flights</h1>
        </div>
      )}
    </div>
  );
}