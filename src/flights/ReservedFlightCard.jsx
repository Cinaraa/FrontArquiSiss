import React from 'react';
import './ReservedFlightCard.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'

export default function ReservedFlightCard({ flight, onChangeAvailability }) {
  const departure_day = flight.departure_time ? flight.departure_time.split('T')[0] : 'N/A';
  const departure_airport = flight.departure_airport ? flight.departure_airport : 'N/A';
  const arrival_airport = flight.arrival_airport ? flight.arrival_airport : 'N/A';
  const quantity = flight.quantity ? flight.quantity : 'N/A';
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const handleChangeAvailability = async () => {
    try {
    //   const token = localStorage.getItem('token'); // Obtener el token JWT almacenado
        const token = await getAccessTokenSilently();
        console.log('Token JWT:', token);

      
      await axios.post(`https://panchomro.me/admin/reserved-flights/availability/${flight.flight_id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onChangeAvailability(flight.id);
      console.log('Availability changed successfully');
    } catch (error) {
      console.error('Error changing availability:', error);
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
        <div className='top-side-card'>
          {/* <p>Arrival airport: {arrival_airport}</p> */}
        </div>
      </div>
      <div className='bottom-part-card'>
        <button onClick={handleChangeAvailability}>Change Availability</button>
        <p>Available: {flight.available ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
