import Line from "./components/Line";
import {AirlineTable, PassengersTable} from './components/Table'
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
  
  return (
    <div className="App">
     <h1 style={{textAlign:"center"}}>FlightSurety</h1>
     <Line/>
     <AirlineTable/>
     <Line/>
     <PassengersTable/>
    </div>
  );
}

export default App;
