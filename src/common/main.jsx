import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routing from './Routing.jsx'
import { Auth0Provider } from '@auth0/auth0-react'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8v3xbi0ihbyftsnr.us.auth0.com"
      clientId="5bLCwk5Hdl24LBMAhhdv3dYQJuEb5ZIA"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://flights_api.auth', // El Identifier de tu API en Auth0
        scope: 'openid profile email'
      }}
      cacheLocation="localstorage"
    >
    <Routing />
    </Auth0Provider>
  </React.StrictMode>
)
