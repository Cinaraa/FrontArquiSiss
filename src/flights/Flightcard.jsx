// import './Flightard.css'
// import { useState } from 'react'
// import CardButton from './CardButton'
import { Link } from 'react-router-dom'

export default function Flightcard({ flightCard }) { // Cambia flightcard a flightCard
    return (
      <div className="flightcard">
        <div className="flight-card-info">
          <h2>{flightCard.id}</h2>
          <div className="flight-card-image">
            <img src={flightCard.airline_logo} alt="airline logo"/>
          </div>
          <div className="flight-card-info-header-departure">
            <p>{flightCard.departure_airport_name} {flightCard.departure_airport_id}</p>
            <p>{flightCard.departure_airport_time}</p>
          </div>
          <div className="flight-card-info-header-arrival">
            <p>{flightCard.arrival_airport_name} {flightCard.arrival_airport_id}</p>
            <p>{flightCard.arrival_airport_time}</p>
          </div>
        </div>
        <div className="flight-card-info-footer">
          <div className="flight-card-info-footer-duration">
            <p>Flight druation: {flightCard.duration}</p>
          </div>
          <div className="flight-card-info-footer-airplane">
            <p>{flightCard.airplane} {flightCard.airline}</p>
          </div>
          <div className="see-more-of-this-flight">
            <Link to={`/flight/${flightCard.id}`}>Ver más</Link>
          </div>
        </div>
      </div>
    );
  }
  