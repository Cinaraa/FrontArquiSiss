import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HeartbeatStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('https://panchomro.me/heartbeat-status'); // Ajusta el puerto según tu configuración
        setStatus(response.data.status);
      } catch (error) {
        setError('Error Workers are taking a break');
        console.error('Error fetching heartbeat status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Heartbeat Status</h2>
      {status ? (
        <p>The server is up and running!</p>
      ) : (
        <p>The server is down.</p>
      )}
    </div>
  );
};

export default HeartbeatStatus;
