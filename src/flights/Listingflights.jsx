import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flightcard from './Flightcard';
import './Listingflights.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Listingflights() {
    const [flightCards, setFlightCards] = useState([]);
    const [departureAirports, setDepartureAirports] = useState([]);
    const [arrivalAirports, setArrivalAirports] = useState([]);
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState('');
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState('');
    const [departureAirportTime, setDepartureAirportTime] = useState('');
    const { isAuthenticated } = useAuth0();
    

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('https://panchomro.me/flights');
                console.log(response.data.flights);
                setFlightCards(response.data.flights); // Acceder a la clave 'flights'

                // Obtener aeropuertos de salida únicos
                const uniqueDepartureAirports = Array.from(new Set(response.data.flights.map(flight => flight.departure_airport_id)));
                setDepartureAirports(uniqueDepartureAirports);

                // Obtener aeropuertos de llegada únicos
                const uniqueArrivalAirports = Array.from(new Set(response.data.flights.map(flight => flight.arrival_airport_id)));
                setArrivalAirports(uniqueArrivalAirports);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFlights();
    }, []);

    const handleSearch = async () => {
      if (isAuthenticated){
          try {
              const params = {};
              if (selectedDepartureAirport) {
                  params.departure_airport_id = selectedDepartureAirport;
              }
              if (selectedArrivalAirport) {
                  params.arrival_airport_id = selectedArrivalAirport;
              }
              if (departureAirportTime) {
                  params.departure_airport_time = departureAirportTime;
              }
  
              const response = await axios.get('https://panchomro.me/flights', {
                  params: params
              });
              console.log(response.data.flights);
  
              setFlightCards(response.data.flights);
          } catch (error) {
              console.error(error);
          }
      }
  };
  

    return (
        <div>
            {isAuthenticated && (
                <div className="list">
                    <div className="list-flight">
                        {Array.isArray(flightCards) && flightCards.map(flightCard => (
                            <Flightcard key={flightCard.id} flightCard={flightCard} />
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
            <div>
                <label htmlFor="departureAirport">Departure Airport:</label>
                <select id="departureAirport" value={selectedDepartureAirport} onChange={(e) => setSelectedDepartureAirport(e.target.value)}>
                    <option value="">Select departure airport</option>
                    {departureAirports.map(airport => (
                        <option key={airport} value={airport}>{airport}</option>
                    ))}
                </select>

                <label htmlFor="arrivalAirport">Arrival Airport:</label>
                <select id="arrivalAirport" value={selectedArrivalAirport} onChange={(e) => setSelectedArrivalAirport(e.target.value)}>
                    <option value="">Select arrival airport</option>
                    {arrivalAirports.map(airport => (
                        <option key={airport} value={airport}>{airport}</option>
                    ))}
                </select>

                <label htmlFor="departureAirportTime">Departure Airport Time:</label>
                <input
                    type="datetime-local" // Usa datetime-local para seleccionar la fecha y hora
                    id="departureAirportTime"
                    value={departureAirportTime}
                    onChange={(e) => setDepartureAirportTime(e.target.value)}
                />

                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};
