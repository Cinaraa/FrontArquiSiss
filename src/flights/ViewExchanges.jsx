import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewExchanges.css';

const ExchangesMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <h2>Menú Intercambios</h2>
      <button onClick={() => navigate('/admin/view-existing-offers')}>Ver ofertas disponibles</button>
      <button onClick={() => navigate('/admin/view-incoming-proposals')}>Ver proposiciones entrantes</button>
      <button onClick={() => navigate('/admin/publish-offer')}>Publicar oferta</button>
    </div>
  );
};

export default ExchangesMenu;