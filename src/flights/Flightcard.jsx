import './Flightcard.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Flightcard({ flightCard, userPermissions = [] }) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/flights/check-availability/${flightCard.id}`);
        if (response.data.available) {
          setIsAvailable(true);
        }
      } catch (error) {
        console.error('Error checking flight availability:', error);
      }
    };

    checkAvailability();
  }, [flightCard.id]);

  const departure_day = flightCard.departure_airport_time.split('T')[0];
  const departure_time = flightCard.departure_airport_time.split('T')[1].split('.')[0];
  const arrival_day = flightCard.arrival_airport_time.split('T')[0];
  const arrival_time = flightCard.arrival_airport_time.split('T')[1].split('.')[0];

  const isAdmin = userPermissions.includes('update:reserved');
  // console.log('userPermissions de flightcard:', userPermissions);

  return (
    <div className='flightcard'>
      <div className='top-side card'>
        <div className='left-side-card'>
          <img className='logo-card' src={flightCard.airline_logo} alt="airline logo" />
          <p>{flightCard.airline}</p>
        </div>
        <div className='center-left-side-card'>
          <p>{flightCard.departure_airport_id}</p>
          <p>Departure day: {departure_day}</p>
          <p>Departure time: {departure_time}</p>
        </div>
        <div className='center-right-side-card'>
          <p>Flight duration: {flightCard.duration} mins</p>
        </div>
        <div className='right-side-card'>
          <p>{flightCard.arrival_airport_id}</p>
          <p>Arrival day: {arrival_day}</p>
          <p>Arrival time: {arrival_time}</p>
        </div>
      </div>
      <div className='bottom-part-card'>
        <Link to={`/flight/${flightCard.id}`}>Ver más</Link>
        {isAvailable && <Link to={`/reserved-flight/${flightCard.id}`}>Ver Más con Descuento</Link>}
      </div>
    </div>
  );
}
