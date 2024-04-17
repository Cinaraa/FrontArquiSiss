import React from 'react';

export default function FlightDetails({ flightid }) {
  const Flightcards =[
    {id:3721,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T20:20:00.000Z",arrival_airport_name:"Aeropuerto Internacional de Múnich-Franz Josef Strauss",arrival_airport_id:"MUC",arrival_airport_time:"2024-04-24T14:05:00.000Z",duration:585,airplane:"Boeing 787",airline:"United",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",carbon_emissions:552000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",createdAt:"2024-04-16T22:31:30.930Z",updatedAt:"2024-04-16T22:31:30.930Z"},
    {id:3720,departure_airport_name:"Aeropuerto Internacional de San Francisco",departure_airport_id:"SFO",departure_airport_time:"2024-04-23T19:15:00.000Z",arrival_airport_name:"Aeropuerto de Fráncfort del Meno",arrival_airport_id:"FRA",arrival_airport_time:"2024-04-24T15:15:00.000Z",duration:660,airplane:"Boeing 777",airline:"United",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",carbon_emissions:914000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",createdAt:"2024-04-16T22:26:30.829Z",updatedAt:"2024-04-16T22:26:30.829Z"},
    {id:3719,departure_airport_name:"Aeropuerto Internacional de Los Ángeles",departure_airport_id:"LAX",departure_airport_time:"2024-04-23T17:10:00.000Z",arrival_airport_name:"Aeropuerto Internacional de Múnich-Franz Josef Strauss",arrival_airport_id:"MUC",arrival_airport_time:"2024-04-24T13:20:00.000Z",duration:670,airplane:"Airbus A380",airline:"Lufthansa",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",carbon_emissions:805000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",createdAt:"2024-04-16T22:21:30.743Z",updatedAt:"2024-04-16T22:21:30.743Z"},
    {id:3718,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T17:35:00.000Z",arrival_airport_name:"Aeropuerto de Fráncfort del Meno",arrival_airport_id:"FRA",arrival_airport_time:"2024-04-24T11:10:00.000Z",duration:575,airplane:"Boeing 787",airline:"Lufthansa",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",carbon_emissions:575000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",createdAt:"2024-04-16T22:16:30.696Z",updatedAt:"2024-04-16T22:16:30.696Z"},
    {id:3717,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T16:05:00.000Z",arrival_airport_name:"Aeropuerto Internacional de Múnich-Franz Josef Strauss",arrival_airport_id:"MUC",arrival_airport_time:"2024-04-24T09:50:00.000Z",duration:585,airplane:"Airbus A350",airline:"Lufthansa",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",carbon_emissions:509000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",createdAt:"2024-04-16T22:11:30.611Z",updatedAt:"2024-04-16T22:11:30.611Z"},
    {id:3716,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T15:45:00.000Z",arrival_airport_name:"Aeropuerto de Fráncfort del Meno",arrival_airport_id:"FRA",arrival_airport_time:"2024-04-24T09:20:00.000Z",duration:575,airplane:"Boeing 787",airline:"United",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",carbon_emissions:508000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",createdAt:"2024-04-16T22:06:30.553Z",updatedAt:"2024-04-16T22:06:30.553Z"}
  ]
  const flight = Flightcards.find(flight => flight.id === flightid);


  return (
    <div className="flight-details">
      <h2>Flight Details</h2>
      <p>Flight ID: {flight.id}</p>
      <p>Airline: {flight.airline}</p>
      <p>Departure Airport: {flight.departure_airport_name}</p>
      <p>Departure Time: {flight.departure_airport_time}</p>
      <p>Arrival Airport: {flight.arrival_airport_name}</p>
      <p>Arrival Time: {flight.arrival_airport_time}</p>
      <p>Duration: {flight.duration} min</p>
      <p>Carbon Emissions: {flight.carbon_emissions} kg</p>
      <p>Price: {flight.price} {flight.currency}</p>
      <img src={flight.airline_logo} alt="airline logo" />
      <button>Buy Now</button>

    </div>
  );
}
