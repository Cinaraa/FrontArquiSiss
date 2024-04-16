import Flightcard from './Flightcard'
import './Listingflights.css'

export default function Listingflights() {
 
  const Flightcards =[
    {id:3721,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T20:20:00.000Z",arrival_airport_name:"Aeropuerto Internacional de Múnich-Franz Josef Strauss",arrival_airport_id:"MUC",arrival_airport_time:"2024-04-24T14:05:00.000Z",duration:585,airpline:"Boeing 787",airline:"United",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",carbon_emissions:552000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",createdAt:"2024-04-16T22:31:30.930Z",updatedAt:"2024-04-16T22:31:30.930Z"},
    {id:3720,departure_airport_name:"Aeropuerto Internacional de San Francisco",departure_airport_id:"SFO",departure_airport_time:"2024-04-23T19:15:00.000Z",arrival_airport_name:"Aeropuerto de Fráncfort del Meno",arrival_airport_id:"FRA",arrival_airport_time:"2024-04-24T15:15:00.000Z",duration:660,airpline:"Boeing 777",airline:"United",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",carbon_emissions:914000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",createdAt:"2024-04-16T22:26:30.829Z",updatedAt:"2024-04-16T22:26:30.829Z"},
    {id:3719,departure_airport_name:"Aeropuerto Internacional de Los Ángeles",departure_airport_id:"LAX",departure_airport_time:"2024-04-23T17:10:00.000Z",arrival_airport_name:"Aeropuerto Internacional de Múnich-Franz Josef Strauss",arrival_airport_id:"MUC",arrival_airport_time:"2024-04-24T13:20:00.000Z",duration:670,airpline:"Airbus A380",airline:"Lufthansa",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",carbon_emissions:805000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",createdAt:"2024-04-16T22:21:30.743Z",updatedAt:"2024-04-16T22:21:30.743Z"},
    {id:3718,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T17:35:00.000Z",arrival_airport_name:"Aeropuerto de Fráncfort del Meno",arrival_airport_id:"FRA",arrival_airport_time:"2024-04-24T11:10:00.000Z",duration:575,airpline:"Boeing 787",airline:"Lufthansa",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",carbon_emissions:575000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",createdAt:"2024-04-16T22:16:30.696Z",updatedAt:"2024-04-16T22:16:30.696Z"},
    {id:3717,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T16:05:00.000Z",arrival_airport_name:"Aeropuerto Internacional de Múnich-Franz Josef Strauss",arrival_airport_id:"MUC",arrival_airport_time:"2024-04-24T09:50:00.000Z",duration:585,airpline:"Airbus A350",airline:"Lufthansa",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",carbon_emissions:509000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/LH.png",createdAt:"2024-04-16T22:11:30.611Z",updatedAt:"2024-04-16T22:11:30.611Z"},
    {id:3716,departure_airport_name:"Aeropuerto Internacional de Denver",departure_airport_id:"DEN",departure_airport_time:"2024-04-23T15:45:00.000Z",arrival_airport_name:"Aeropuerto de Fráncfort del Meno",arrival_airport_id:"FRA",arrival_airport_time:"2024-04-24T09:20:00.000Z",duration:575,airpline:"Boeing 787",airline:"United",airline_logo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",carbon_emissions:508000,price:1541471,currency:"CLP",airlineLogo:"https://www.gstatic.com/flights/airline_logos/70px/UA.png",createdAt:"2024-04-16T22:06:30.553Z",updatedAt:"2024-04-16T22:06:30.553Z"}
  ]

  return (
    <div className="list">
      <div className="list-flight">
        {Flightcards.map(flightcard => (
            <Flightcard key={flightcard.id} flightcard={flightcard} />
            ))}

      </div>
    </div>
  )
}