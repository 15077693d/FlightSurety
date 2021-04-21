import Line from "./components/Line";
import React, { useState, useEffect } from 'react';
import {AirlineTable, PassengersTable} from './components/Table'
import { getFlight } from './ethereum/flightSuretyApp';
/*
Airline
 1. show and set operational (Operational Setup)
 2. show and reg airline and add ether (Airline Registration)
 3. show and add flight  (Flight Registration)
 4. Cancel flight, Insurance Repayment (Insurance Setup)

Passengers
 1.PassengersBuy insurance (Insurance Purchase)
 2. Money Withdraw
 3. check Flight Status
*/
function App() {
  const [flights, setFlights] = useState([])
  const [refreshFlight, setRefreshFlight] = useState(null)
  useEffect(async () => {
    setFlights(await getFlight())
  }, [refreshFlight])
  return (
    <div className="App">
     <h1 style={{textAlign:"center"}}>FlightSurety</h1>
     <Line/>
     <AirlineTable setRefreshFlight={setRefreshFlight} flights={flights}/>
     <Line/>
     <PassengersTable setRefreshFlight={setRefreshFlight} flights={flights}/>
    </div>
  );
}

export default App;
