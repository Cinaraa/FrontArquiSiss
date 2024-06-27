import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Flightdetail.css';
import LoginButton from '../profile/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function ReservedFlightDetails() {
  const { id } = useParams(); 
  const [reservedFlight, setReservedFlight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [ip, setIP] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasUpdatePermission, setHasUpdatePermission] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      const fetchReservedFlightDetails = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`http://localhost:3000/flights/reserved/${id}`,{
                        
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        
    });
          setReservedFlight(response.data);
        } catch (error) {
          console.error('Error fetching reserved flight details:', error);
        }
      };

      fetchReservedFlightDetails();
    }
  }, [id, isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const token = await getAccessTokenSilently();

        const decodedToken = jwtDecode(token);
        const permissions = decodedToken.permissions || [];

        setUserPermissions(permissions);

        const hasUpdatePerm = permissions.includes('update:reserved');
        setHasUpdatePermission(hasUpdatePerm);
      } catch (error) {
        console.error('Error fetching token and decoding:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserPermissions();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipRes = await axios.get("https://api.ipify.org/?format=json");
        const userIP = ipRes.data.ip;
        setIP(userIP);

        const locationRes = await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=c4483a9a22c74a52850e281789f5e38c&ip=${userIP}`);
        setLocation(locationRes.data);

        const { latitude, longitude } = locationRes.data.location;
        const addressRes = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=c4483a9a22c74a52850e281789f5e38c`);
        setAddress(addressRes.data.features[0].properties.formatted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleBuyReserved = async () => {
    try {
      if (!isLoading && isAuthenticated) {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
          `http://localhost:3000/admin/buyReserved`,
          {
            flightId: id,
            quantity: quantity,
            ip: ip,
            isAdmin: hasUpdatePermission
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('Purchase successful:', response);
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.data.url;

        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token_ws';
        tokenInput.value = response.data.token;
        form.appendChild(tokenInput);

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error('Error purchasing reserved flight:', error);
    }
  };

  if (!reservedFlight) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flight-details">
      <h2>Reserved Flight Details</h2>
      <p>Airline: {reservedFlight.airline}</p>
      <p>Departure Airport: {reservedFlight.departure_airport_name}</p>
      <p>Departure Time: {reservedFlight.departure_airport_time}</p>
      <p>Arrival Airport: {reservedFlight.arrival_airport_name}</p>
      <p>Arrival Time: {reservedFlight.arrival_airport_time}</p>
      <p>Duration: {reservedFlight.duration} min</p>
      <p>Carbon Emissions: {reservedFlight.carbon_emissions} kg</p>
      <p>Price: {reservedFlight.price} {reservedFlight.currency}</p>
      <p>Pasajes disponibles: {reservedFlight.quantity}</p>
      <img src={reservedFlight.airline_logo} alt="airline logo" />

      <label htmlFor="quantity">Cantidad de Pasajes:</label>
      <select id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
        {Array.from({ length: Math.min(reservedFlight.quantity, 4) }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
        {reservedFlight.quantity < 4 && (
          <option value={reservedFlight.quantity}>{reservedFlight.quantity}</option>
        )}
      </select>

      {isAuthenticated && (
        <button onClick={handleBuyReserved}>Buy Reserved</button>
      )}
      {!isAuthenticated && (
        <LoginButton className="login-button" />
      )}
      <Link to={`/Listingflights`}>Volver a vuelos</Link>
    </div>
  );
}
