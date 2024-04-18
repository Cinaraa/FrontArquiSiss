import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserWelcome from '../profile/UserWelcome.jsx'
import Routing from './Routing.jsx'
import { Auth0Provider } from '@auth0/auth0-react'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8v3xbi0ihbyftsnr.us.auth0.com"
      clientId="5bLCwk5Hdl24LBMAhhdv3dYQJuEb5ZIA"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
    <Routing />
    </Auth0Provider>
  </React.StrictMode>
)
