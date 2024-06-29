import React from 'react';
import './ExistingOffersCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'

export default function OffersCard({ offer }) {
  const departure_day = offer.departure_time ? offer.departure_time.split('T')[0] : 'N/A';
  const departure_airport = offer.departure_airport ? offer.departure_airport : 'N/A';
  const arrival_airport = offer.arrival_airport ? offer.arrival_airport : 'N/A';
  const quantity = offer.quantity ? offer.quantity : 'N/A';
  const airline = offer.airline ? offer.airline : 'N/A';
  const group_id = offer.group_id ? offer.group_id : 'N/A';
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();


  return (
    <div className='offer-card'>
      <div className='top-side card'>
        <div className='left-side-card'>
          <p>{airline}</p>
          <p>Grupo: {group_id}</p>
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
        <Link to={`/make-proposal/${offer.auction_id}`}>Hacer propuesta</Link>
      </div>
    </div>
  );
}
