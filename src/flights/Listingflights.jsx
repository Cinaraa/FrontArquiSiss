import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flightcard from './Flightcard';
import './Listingflights.css';

export default function Listingflights() {
    const [flightCards, setFlightCards] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('/flights');
                setFlightCards(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div className="list">
            <div className="list-flight">
                {flightCards.map(flightCard => (
                    <Flightcard key={flightCard.id} flightCard={flightCard} />
                ))}
            </div>
            <a className='submit' href='/'>Go home</a>
        </div>
    );
};
