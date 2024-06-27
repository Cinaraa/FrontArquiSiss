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
import ExchangeMenu from '../intercambios/ExchangeMenu'; // Asegúrate de que la ruta sea correcta
import OutgoingOffers from '../intercambios/OutgoingOffers'
import IncomingOffers from '../intercambios/IncomingOffers'
import OutgoingProposals from '../intercambios/OutgoingProposals'
import IncomingProposals from '../intercambios/IncomingProposals'
// import ViewExchanges from '../flights/ViewExchanges'; // Crea este componente si aún no existe




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
        <Route path={"/admin/view-exchanges"} element={<ExchangeMenu/>} />
        <Route path={"/admin/outgoing-offers"} element={<OutgoingOffers/>} />
        <Route path={"/admin/incoming-offers"} element={<IncomingOffers/>} />
        <Route path={"/admin/outgoing-proposals"} element={<OutgoingProposals/>} />
        <Route path={"/admin/incoming-proposals"} element={<IncomingProposals/>} />
        {/* <Route path={"/admin/view-exchanges"} element={<ViewExchanges/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
