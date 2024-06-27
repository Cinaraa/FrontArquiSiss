import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/admin/reserved-flights')}>Administrar reservados</button>
      <button onClick={() => navigate('/admin/view-exchanges')}>Ver intercambios</button>
    </div>
  );
};

export default Admin;
