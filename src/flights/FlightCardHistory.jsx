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
            <p>{flightCard.departure_airport}</p>
            <p>{flightCard.departure_time}</p>
            <p>{flightCard.datetime}</p>
            <p>{flightCard.quantity}</p>
            <p>{flightCard.totalPrice}</p>
          </div>
          <div className="flight-card-info-header-arrival">
            <p>{flightCard.arrival_airport}</p>
          </div>
        </div>
        <div className="flight-card-info-footer">
          <div className="see-more-of-this-flight">
            <p>{flightCard.valid}</p>
          </div>
          <div className="see-more-of-this-flight">
            {flightCard.isValidated ? (
                <p>Vuelo ya validado!</p>
            ) : (
                <p>Vuelo no validado aún!</p>
            )}
          </div>

        </div>
      </div>
    );
  }
  