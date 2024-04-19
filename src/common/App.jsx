import './App.css'
import LoginButton from '../profile/LoginButton'
import LogoutButton from '../profile/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import avioncita from '../assets/background.jpg'


function App() {

  const {isAuthenticated} = useAuth0()


  return (

    <div className="App">
      <img className="background-image"src={avioncita} alt="avioncita" width="100" height="100"/>
      {isAuthenticated && (
      <div className='parallel-buttons'>

      <LogoutButton className="log-out-button"/>
      <a className='profile-button' href='/perfil'> Mi perfil</a>
      </div>
      
      )}
      <a href='/listingflights' className="flights-button"> Flights</a> 
      {!isAuthenticated && (
        <LoginButton className="login-button" />
      )}
      
    </div>
  )
}
export default App