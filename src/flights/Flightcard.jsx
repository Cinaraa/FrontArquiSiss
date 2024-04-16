// import './Flightard.css'
// import { useState } from 'react'
// import CardButton from './CardButton'

export default function Flightcard({flightcard}){
//   const [showImage, setShowImage] = useState(true);
//   const toggleImage =() => {
//     setShowImage(!showImage);
//   }

  return(
    <div className="flightcard">
      <div className="flight-card-container">
        <div className="flight-card">
          <div className="flight-card-info">
            <div className="flight-card-info-header">
              <div className="flight-card-info-header-departure">
                <h2>{flightcard.departure_airport_name}</h2>
                <p>{flightcard.departure_airport_id}</p>
                <p>{flightcard.departure_airport_time}</p>
              </div>
              <div className="flight-card-info-header-arrival">
                <h2>{flightcard.arrival_airport_name}</h2>
                <p>{flightcard.arrival_airport_id}</p>
                <p>{flightcard.arrival_airport_time}</p>
              </div>
            </div>
            <div className="flight-card-info-footer">
              <div className="flight-card-info-footer-duration">
                <h2>{flightcard.duration}</h2>
                <p>min</p>
              </div>
              <div className="flight-card-info-footer-airplane">
                <h2>{flightcard.airpline}</h2>
                <p>{flightcard.airline}</p>
              </div>
            </div>
          </div>
          <div className="flight-card-image">
            <img src={flightcard.airline_logo} alt="airline logo"/>
          </div>
        </div>        
      </div>
    </div>
  )
}