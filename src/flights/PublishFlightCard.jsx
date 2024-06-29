import React from 'react';
import './ReservedFlightCard.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function PublishFlightCard({ flight, onChangeAvailability }) {
  const departure_day = flight.departure_time ? flight.departure_time.split('T')[0] : 'N/A';
  const departure_airport = flight.departure_airport ? flight.departure_airport : 'N/A';
  const arrival_airport = flight.arrival_airport ? flight.arrival_airport : 'N/A';
  const quantity = flight.quantity ? flight.quantity : 'N/A';
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handlePlaceOffer = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log('Token JWT:', token);

      const response = await axios.post(
        `http://localhost:3000/place-offer/${flight.id}`,
        {
          infoCompra_id: flight.id, // Verifica que `flight.flight_id` es el dato correcto
          quantity: flight.quantity // O envía la cantidad necesaria si es otra
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Response:', response.data);
      onChangeAvailability(flight.id);
      console.log('Offer placed successfully');
    } catch (error) {
      console.error('Error placing offer:', error);
    }
  };

  return (
    <div className='reserved-flight-card'>
      <div className='top-side card'>
        <div className='left-side-card'>
          <img className='logo-card' src={flight.airline_logo} alt="airline logo"/>
          <p>{flight.airline}</p>
        </div>
        <div className='center-left-side-card'>
          <p>Departure airport: {departure_airport}</p>
          <p>Departure day: {departure_day}</p>
        </div>
        <div className='center-right-side-card'>
          <p>Arrival airport: {arrival_airport}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
      <div className='bottom-part-card'>
        <button onClick={handlePlaceOffer}>Publish offer</button>
      </div>
    </div>
  );
}

