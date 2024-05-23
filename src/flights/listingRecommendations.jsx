import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Recommendations = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setRecommendations(response.data);
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

  if (!isAuthenticated) {
    return <div>Please log in to see your recommendations.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Recommendations</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations found</p>
      ) : (
        <ul>
          {recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <p><strong>Created At:</strong> {new Date(recommendation.createdAt).toLocaleString()}</p>
              <p><strong>User IP:</strong> {recommendation.user_ip}</p>
              <div>
                <h3>Recommendation Details:</h3>
                <ul>
                  {Object.values(recommendation.recommendations).map((rec, index) => (
                    <li key={rec.id}>
                      <h4>Recommendation {index + 1}</h4>
                      <p><strong>Departure Airport:</strong> {rec.departure_airport_name} ({rec.departure_airport_id})</p>
                      <p><strong>Departure Time:</strong> {new Date(rec.departure_airport_time).toLocaleString()}</p>
                      <p><strong>Arrival Airport:</strong> {rec.arrival_airport_name} ({rec.arrival_airport_id})</p>
                      <p><strong>Arrival Time:</strong> {new Date(rec.arrival_airport_time).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
