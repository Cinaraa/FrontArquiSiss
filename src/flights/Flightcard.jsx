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
        <div className="flight-card-info">
        <h2>{flightcard.id}</h2>
            <div className="flight-card-image">
                <img src={flightcard.airline_logo} alt="airline logo"/>
            </div>
            <div className="flight-card-info-header-departure">
                <p>{flightcard.departure_airport_name} {flightcard.departure_airport_id}</p>
                <p>{flightcard.departure_airport_time}</p>
            </div>
            <div className="flight-card-info-header-arrival">
                <p>{flightcard.arrival_airport_name} {flightcard.arrival_airport_id}</p>
                <p>{flightcard.arrival_airport_time}</p>
            </div>
        </div>
        <div className="flight-card-info-footer">
            <div className="flight-card-info-footer-duration">
                <p>Flight druation: {flightcard.duration}</p>
            </div>
            <div className="flight-card-info-footer-airplane">
                <p>{flightcard.airplane} {flightcard.airline}</p>
            </div>
            <div className="see-more-of-this-flight">
                <a href={`/flight/${flightcard.id}`}>Ver más</a>
            </div>
        </div>
    </div>  

  )
}