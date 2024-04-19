import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flightcard from './Flightcard';
import NavBar from '../navbar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import './Listingflights.css';

export default function Listingflights() {
  const [flightCards, setFlightCards] = useState([]);
  const { isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3000/flights');
        console.log(response.data.flights);
        setFlightCards(response.data.flights); // Acceder a la clave 'flights'
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={isAuthenticated} logout={logout} />
      {isAuthenticated && (
        <div className="list">
          <div className="list-flight">
            {Array.isArray(flightCards) && flightCards.map(flightCard => (
              <Flightcard key={flightCard.id} flightCard={flightCard} /> // Pasar flightCard como prop
            ))}
          </div>
          <a className='submit' href='/'>Go home</a>
          <a className='submit' href='/historial'>Ver historial de compra</a>
        </div>
      )}
      {!isAuthenticated && (
        <div className="list">
          <h1>Log in to see the flights</h1>
          <a className='submit' href='/'>Go home</a>
        </div>
      )}
    </div>
  );
};

