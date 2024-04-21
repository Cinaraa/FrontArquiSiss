import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Flightdetail.css';
import LoginButton from '../profile/LoginButton';
import LoginPopup from '../popups/LoginPopup';
import CompraPopup from '../popups/CompraPopup';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function FlightDetails() {
  const { id: flightid } = useParams(); 
  const [flight, setFlight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Estado para controlar la visualización del popup de éxito
  const [showProcessingPopup, setShowProcessingPopup] = useState(false); // Estado para controlar la visualización del popup de procesamiento
  const [popupMessage, setPopupMessage] = useState(''); // Mensaje para el popup
  const { isLoading, isAuthenticated, user } = useAuth0();

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
        setShowProcessingPopup(true);
        const response = await axios.post(`https://panchomro.me/flights/${flightid}/${userId}/buy`, {
          quantity: quantity
        });
        console.log('Purchase successful:', response.data);
        setPopupMessage('Solicitud de compra exitosa!');
        setShowSuccessPopup(true);
        setShowProcessingPopup(false);
      } else {
        setShowLoginPopup(true); 
      }
    } catch (error) {
      console.error('Error purchasing flight:', error);
      setPopupMessage('Error al realizar la solicitud de compra, intentelo denuevo más tarde.');
      setShowSuccessPopup(true);
      setShowProcessingPopup(false);
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

      <Link to={`/Listingflights`}>Volver a vuelos</Link>

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
      {showSuccessPopup && <CompraPopup message={popupMessage} onClose={() => setShowSuccessPopup(false)} />}
      {showProcessingPopup && <CompraPopup message="Estamos procesando su solicitud..." />}
    </div>
  );
}
