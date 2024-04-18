import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function FlightDetails() {
  const { id: flightid } = useParams(); 
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/flights/${flightid}`);
        setFlight(response.data);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    };

    fetchFlightDetails();
  }, [flightid]);

  const handleBuyNow = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/flights/${flightid}/buy`);
      console.log('Purchase successful:', response.data);
      // Aquí puedes manejar la respuesta del backend después de realizar la compra
    } catch (error) {
      console.error('Error purchasing flight:', error);
    }
  };

  if (!flight) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flight-details">
      <h2>Flight Details</h2>
      <p>Flight ID: {flight.id}</p>
      <p>Airline: {flight.airline}</p>
      <p>Departure Airport: {flight.departure_airport_name}</p>
      <p>Departure Time: {flight.departure_airport_time}</p>
      <p>Arrival Airport: {flight.arrival_airport_name}</p>
      <p>Arrival Time: {flight.arrival_airport_time}</p>
      <p>Duration: {flight.duration} min</p>
      <p>Carbon Emissions: {flight.carbon_emissions} kg</p>
      <p>Price: {flight.price} {flight.currency}</p>
      <img src={flight.airline_logo} alt="airline logo" />
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}
