import { useState } from 'react'
import reactLogo from './../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginButton from '../profile/LoginButton'
import LogoutButton from '../profile/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'


function App() {

  const {isAuthenticated} = useAuth0()


  return (
    <div className="App">
      {isAuthenticated && (
      <div>
      <LogoutButton />
      <a href='/welcome'> Welcome</a>
      <a href='/listingflights'> Flights</a>
        </div>
      
      )}
      {!isAuthenticated && (
        <LoginButton/>
      )}
      
    </div>
  )
}
export default App