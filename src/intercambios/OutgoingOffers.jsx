import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Exchanges.css';

const OutgoingOffers = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h2>Exchanges Menu</h2>
      <button onClick={() => navigate('/admin/view-exchanges')}>Go Back</button>
    </div>
  );
};

export default OutgoingOffers;
