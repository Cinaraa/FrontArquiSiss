import React from 'react';
import './ReservedFlightCard.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'

export default function ReservedFlightCard({ flight, onChangeAvailability }) {
  const departure_day = flight.departure_airport_time ? flight.departure_airport_time.split('T')[0] : 'N/A';
  const departure_time = flight.departure_airport_time ? flight.departure_airport_time.split('T')[1].split('.')[0] : 'N/A';
  const arrival_day = flight.arrival_airport_time ? flight.arrival_airport_time.split('T')[0] : 'N/A';
  const arrival_time = flight.arrival_airport_time ? flight.arrival_airport_time.split('T')[1].split('.')[0] : 'N/A';
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const handleChangeAvailability = async () => {
    try {
    //   const token = localStorage.getItem('token'); // Obtener el token JWT almacenado
        const token = await getAccessTokenSilently();
        console.log('Token JWT:', token);

      
      await axios.post(`http://localhost:3000/admin/reserved-flights/availability/${flight.flight_id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onChangeAvailability(flight.id);
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
          <p>{flight.departure_airport_id}</p>
          <p>Departure day: {departure_day}</p>
          <p>Departure time: {departure_time}</p>
        </div>
        <div className='center-right-side-card'>
          <p>Flight duration: {flight.duration} mins</p>
        </div>
        <div className='right-side-card'>
          <p>{flight.arrival_airport_id}</p>
          <p>Arrival day: {arrival_day}</p>
          <p>Arrival time: {arrival_time}</p>
        </div>
      </div>
      <div className='bottom-part-card'>
        <button onClick={handleChangeAvailability}>Change Availability</button>
        <p>Available: {flight.available ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
