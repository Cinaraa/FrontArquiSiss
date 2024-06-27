import '../flights/Flightcard.css'
// import { useState } from 'react'
// import CardButton from './CardButton'
import { Link } from 'react-router-dom'

export default function Offer({ offer, userPermissions = []  }) { // Cambia flightcard a flightCard
  const departure_day = offer.departure_airport_time.split('T')[0];
  const departure_time = offer.departure_airport_time.split('T')[1].split('.')[0];


  return (
    <div className='offer'>
      <p>Departure airport: {offer.departure_airport}</p>
      <p>Arrival airport: {offer.arrival_airport}</p>
      <p>Departure day: {departure_day}</p>
      <p>Departure time: {departure_time}</p>
      <p>Airline: {offer.airline}</p>
      <p>Quantity: {offer.quantity}</p>
      <p>GroupId: {offer.group_id}</p>
      <p>FlightID: {offer.flightId}</p>
 
    </div>
  );
}

  