import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routing from './Routing.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import authConfig from '../authconfig.json'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: authConfig.audience,
        scope: authConfig.scope
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      <Routing />
    </Auth0Provider>
  </React.StrictMode>
);
