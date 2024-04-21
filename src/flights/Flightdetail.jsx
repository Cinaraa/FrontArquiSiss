import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Flightdetail.css';
import LoginButton from '../profile/LoginButton';
import LoginPopup from '../loginpopup/LoginPopup'; // Importa el componente LoginPopup
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function FlightDetails() {
  const { id: flightid } = useParams(); 
  const [flight, setFlight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Estado para controlar la visualización del popup
  const {isLoading, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`https://panchomro.me/flights/${flightid}`);
        setFlight(response.data);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    };

    fetchFlightDetails();
  }, [flightid]);

  const handleBuyNow = async () => {
    try {
      if (!isLoading && isAuthenticated) {
        const userId = user.sub;
        console.log('userId:', userId);
        const response = await axios.post(`https://panchomro.me/flights/${flightid}/${userId}/buy`, {
          quantity: quantity
        });
        console.log('Purchase successful:', response.data);
      } else {
        setShowLoginPopup(true); // Mostrar el popup si el usuario no está autenticado
      }
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
      <p>Airline: {flight.airline}</p>
      <p>Departure Airport: {flight.departure_airport_name}</p>
      <p>Departure Time: {flight.departure_airport_time}</p>
      <p>Arrival Airport: {flight.arrival_airport_name}</p>
      <p>Arrival Time: {flight.arrival_airport_time}</p>
      <p>Duration: {flight.duration} min</p>
      <p>Carbon Emissions: {flight.carbon_emissions} kg</p>
      <p>Price: {flight.price} {flight.currency}</p>
      <p>Pasajes disponibles: {flight.quantity}</p>
      <img src={flight.airline_logo} alt="airline logo" />

      <label htmlFor="quantity">Cantidad de Pasajes:</label>
      <select id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
        {Array.from({ length: flight.quantity }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <button onClick={handleBuyNow}>Buy Now</button>
      <LoginButton className="login-button" />

      <Link to={`/Listingflights`}>Volver a vuelos</Link>

      {/* Mostrar el popup si showLoginPopup es true */}
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </div>
  );
}


