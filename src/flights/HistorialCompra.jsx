import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flightcard from './FlightCardHistory';
import './Listingflights.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Listingflights() {
    const [flightCards, setFlightCards] = useState([]);
    const { isLoading, isAuthenticated, user } = useAuth0();
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            const userId = user.sub;

            const fetchFlights = async () => {
                try {
                    const response = await axios.get(`https://panchomro.me/historial`,{
                        params: {
                            userId: userId
                        }
                    });
                    console.log(response.data);
                    setFlightCards(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchFlights();
        }
    }, [isLoading, isAuthenticated, user]);
      return (
        <div>
          {isAuthenticated && (
            <div className="list">
                <div className="list-flight">
                    {Array.isArray(flightCards) && flightCards.map(flightCard => (
                        <Flightcard key={flightCard.id} flightCard={flightCard} /> // Pasar flightCard como prop
                    ))}
                </div>
                <a className='submit' href='/'>Go home</a>
            </div>
          )}
          {!isAuthenticated && (
            <div className="list">
                <h1>Log in to see your flight history</h1>
                <a className='submit' href='/'>Go home</a>
            </div>
          )}
        </div>
      );
};