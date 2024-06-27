import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExchangeMenu.css';

const ExchangeMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
    <div className="admin-container">
      <h2>Exchanges Menu</h2>
      <button onClick={() => navigate('/admin/outgoing-proposals')}>Tus Bids</button>
      <button onClick={() => navigate('/admin/incoming-proposals')}>Bids pendientes de revision</button>
      <button onClick={() => navigate('/admin/outgoing-offers')}>Crear Oferta</button>
      <button onClick={() => navigate('/admin/incoming-offers')}>Ver Ofertas</button>
      
    </div>
    <button onClick={() => navigate('/admin')}>Go Back</button>
    </div>
  );
};

export default ExchangeMenu;
