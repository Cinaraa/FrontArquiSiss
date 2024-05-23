import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flightcard from './Flightcard';
import './Listingflights.css';
import { useAuth0 } from '@auth0/auth0-react';

const Recommendations = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creationdate, setCreationDate] = useState('');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const fetchRecommendations = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get('http://localhost:3000/recommendations', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log(response.data);
          if (response.data && response.data.length > 0 && response.data[0].recommendations) {
            setRecommendations(response.data[0].recommendations.top_3_recommendations);
            setCreationDate(response.data[0].createdAt);
          } else {
            setRecommendations([]);
          }
        } catch (error) {
          setError('Error fetching recommendations');
          console.error('Error fetching recommendations:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
    }
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="list">
        <h1>Please log in to see your recommendations.</h1>
        <a className='submit' href='/'>Go home</a>
      </div>
    );
  }

  return (
    <div className="list">
      <h2>Your Recommendations</h2>
      <p>Recommendations created on: {creationdate}</p>
      {error && <div>{error}</div>}
      {!error && recommendations.length === 0 && <p>No recommendations found</p>}
      <div className="list-flight">
        {Array.isArray(recommendations) && recommendations.map((rec) => (
          <Flightcard key={rec.id} flightCard={rec} />
        ))}
      </div>
      <a className='submit' href='/'>Go home</a>
    </div>
  );
};

export default Recommendations;
