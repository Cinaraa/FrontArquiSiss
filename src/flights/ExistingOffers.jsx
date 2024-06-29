import React from 'react';
import './ExistingOffers.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'

export default function OffersCard({ offer, onChangeAvailability }) {
  const departure_day = offer.departure_time ? offer.departure_time.split('T')[0] : 'N/A';
  const departure_airport = offer.departure_airport ? offer.departure_airport : 'N/A';
  const arrival_airport = offer.arrival_airport ? offer.arrival_airport : 'N/A';
  const quantity = offer.quantity ? offer.quantity : 'N/A';
  const airline = offer.airline ? offer.airline : 'N/A';
  const group_id = offer.group_id ? offer.group_id : 'N/A';
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const handleChangeAvailability = async () => {
    try {
    //   const token = localStorage.getItem('token'); // Obtener el token JWT almacenado
        const token = await getAccessTokenSilently();
        console.log('Token JWT:', token);

      
      await axios.post(`http://localhost:3000/admin/reserved-offers/availability/${offer.offer_id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onChangeAvailability(offer.id);
      console.log('Availability changed successfully');
    } catch (error) {
      console.error('Error changing availability:', error);
    }
  };

  return (
    <div className='offer-card'>
      <div className='top-side card'>
        <div className='left-side-card'>
          <p>{offer.airline}</p>
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
        <p>Available: {offer.available ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}