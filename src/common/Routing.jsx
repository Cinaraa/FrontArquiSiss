import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Signup from '../profile/Signup'
import Login from '../profile/Login'
import Listingflights from '../flights/Listingflights'
import FlightDetails from '../flights/Flightdetail'
import Profileinfo from '../profile/Profileinfo'
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '../navbar/NavBar';
import HistorialCompra from '../flights/HistorialCompra'
import TransactionHandler from '../flights/TransactionHandler'
import Recomendations from '../flights/listingRecommendations';
import HeartbeatStatus from '../flights/Workerhealth';
import Admin from '../flights/Admin';
import ReservedFlights from '../flights/ReservedFlights'; // Asegúrate de que la ruta sea correcta
import ExchangesMenu from '../flights/ViewExchanges'; // Crea este componente si aún no existe
import ReservedFlightDetails from '../flights/ReservedFlightDetails'
import ExistingOffers from '../flights/ExistingOffers'
import PublishFlightOffer from '../flights/PublishFlightOffer'


function Routing() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isAuthenticated} logout={logout} />
      <Routes>
        <Route path={"/"} element={<App />}/>
        <Route path={"/perfil"} element={<Profileinfo />}/>
        <Route path={"/signup"} element={<Signup />}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/listingflights"} element={<Listingflights />}/>
        <Route path={"/flight/:id"} element={<FlightDetails />}/>
        <Route path={"/historial"} element={<HistorialCompra/>} />
        <Route path={"/transaction"} element={<TransactionHandler/>} />
        <Route path={"/recommendations"} element={<Recomendations/>} />
        <Route path={"/health"} element={<HeartbeatStatus/>} />
        <Route path={"/admin"} element={<Admin/>} />
        <Route path={"/admin/reserved-flights"} element={<ReservedFlights/>} />
        <Route path={"/reserved-flight/:id"} element={<ReservedFlightDetails/>} />
        <Route path={"/admin/view-exchanges"} element={<ExchangesMenu/>} />
        <Route path={"/admin/view-existing-offers"} element={<ExistingOffers/>} />
        <Route path={"/admin/publish-offer"} element={<PublishFlightOffer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
