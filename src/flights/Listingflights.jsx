import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flightcard from './Flightcard';
import './Listingflights.css';

export default function Listingflights() {
    const [flightCards, setFlightCards] = useState([]);

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
        <div className="list">
            <div className="list-flight">
                {Array.isArray(flightCards) && flightCards.map(flightCard => (
                    <Flightcard key={flightCard.id} flightCard={flightCard} /> // Pasar flightCard como prop
                ))}
            </div>
            <a className='submit' href='/'>Go home</a>
        </div>
      );
};
