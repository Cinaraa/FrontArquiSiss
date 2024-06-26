import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Flightdetail.css';
import LoginButton from '../profile/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';


export default function FlightDetails() {
  const { id: flightId } = useParams(); 
  const [flight, setFlight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [ip, setIP] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasUpdatePermission, setHasUpdatePermission] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      const fetchFlightDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/flights/${flightId}`);

          setFlight(response.data);
        } catch (error) {
          console.error('Error fetching flight details:', error);
        }
      };

      fetchFlightDetails();
    }
  }, [flightId, isAuthenticated, getAccessTokenSilently]);

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
            // Obtener la dirección IP
            const ipRes = await axios.get("https://api.ipify.org/?format=json");
            const userIP = ipRes.data.ip;
            setIP(userIP);

            // Obtener la información de ubicación
            const locationRes = await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=c4483a9a22c74a52850e281789f5e38c&ip=${userIP}`);
            setLocation(locationRes.data);

            // Obtener la dirección a partir de la latitud y longitud
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

  
const handleBuyNow = async () => {
  try {
      if (!isLoading && isAuthenticated) {
          const token = await getAccessTokenSilently();
          const response = await axios.post(
            `http://localhost:3000/buy`,
            {
                flightId: flightId,
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
          // window.location.href = response.data.url;
      }
  } catch (error) {
      console.error('Error purchasing flight:', error);
  }
};
const handleBuyReserved = async () => {
  try {
    if (!isLoading && isAuthenticated) {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        `http://localhost:3000/buyReserved`,
        {
          flightId: flightId,
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

      // Aquí puedes manejar la respuesta como lo necesites
    }
  } catch (error) {
    console.error('Error purchasing reserved flight:', error);
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
        {/* Opciones para la cantidad de pasajes */}
        {Array.from({ length: Math.min(flight.quantity, 4) }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
        {flight.quantity < 4 && (
          <option value={flight.quantity}>{flight.quantity}</option>
        )}
      </select>


      {isAuthenticated && (
        <button onClick={handleBuyNow}>Buy Now</button>
      )}
      {!hasUpdatePermission && (
        <button onClick={handleBuyReserved}>Buy Reserved</button>
      )}
      {!isAuthenticated && (
        <LoginButton className="login-button" />
      )}
      {!isAuthenticated && (
        <LoginButton className="login-button" />
      )}
      <Link to={`/Listingflights`}>Volver a vuelos</Link>

    </div>
  );
}
