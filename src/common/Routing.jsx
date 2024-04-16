import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Instructions from '../game/Instructions'
import Board from '../game/Board'
import UserWelcome from '../profile/UserWelcome'
import Signup from '../profile/Signup'
import Login from '../profile/Login'


function Routing(){
    return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />}/>
        <Route path={"/instructions"} element={<Instructions />}/>
        <Route path={"/welcome"} element={<UserWelcome />}/>
        <Route path={"/board"} element={<Board />}/>
        <Route path={"/signup"} element={<Signup />}/>
        <Route path={"/login"} element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;