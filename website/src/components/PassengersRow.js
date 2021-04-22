import React, { useState } from 'react';
import { buyInsurane } from '../ethereum/flightSuretyApp';
import { Table } from './Table';
import {withdraw} from '../ethereum/flightSuretyData'
/*
Passengers
 1.PassengersBuy insurance (Insurance Purchase)
 CANCEL
 UNKNOWN = 0;
ON_TIME = 10;
LATE_AIRLINE = 20;
LATE_WEATHER = 30;
LATE_TECHNICAL = 40;
LATE_OTHER = 50;
 2. Money Withdraw
*/

const MoneyWithdraw = ({client, setRefreshWithdraw}) => {
    const handleClick = async () => {
        await withdraw()
        await setRefreshWithdraw()
    }
    return (
        <tr>
            <td>
                Money Withdraw
        </td>
            <td>
                Available withdraw:
            <br />
                <br />
            {client.withdraw} ether
        </td>
            <td>
                You can only withdraw all amount...
        </td>
            <td>
                <button onClick={handleClick}>
                    withdraw
        </button>
            </td>
        </tr>)
}

const BuyInsurane = ({ client, flights, setRefreshWithdraw }) => {
    const [flight, setFlight] = useState("")
    const [ether, setEther] = useState("")
    const handleClick = async () => {
        if (flight !== "" & ether !== "") {
            await buyInsurane(flight, ether)
            setFlight("")
            setEther("")
            setRefreshWithdraw(new Date())
        }
    }
    console.log(client,flights)
    return (
        <tr>
            <td>
                Insurance Purchase
        </td>
            <td>
                Your purchased:
            <br />
                <br />
                <Table>
                    <tr>
                        <th>Flight name</th>
                        <th>Ether</th>
                        <th>Status</th>
                    </tr>
                    {
                        client.purchases.map(
                            _flight => 
                                <tr>
                        <td>{_flight.flightName}</td>
                        <td>{_flight.flightAmount}</td>
                        <td>{flights.filter(__flight => __flight.name==_flight.flightName)[0].statusCode}</td>
                    </tr>
                        )
                    }
                </Table>
            </td>
            <td>
                Flight Name :
        <select onChange={(e) => setFlight(e.target.value)}>
                    <option value="">Available flight</option>
                    {
                        flights.filter(_flight => _flight["statusCode"] == "UNKNOWN" & _flight["repayment"] === false).map(
                            _flight => <option key={_flight.name} value={_flight.name}>{_flight.name}</option>
                        )
                    }
                </select>
                <br />
                <br />
        Amount :
        <input type="number" placeholder="Ether" onChange={(e) => setEther(e.target.value)} />
            </td>
            <td>
                <button onClick={handleClick}>
                    submit
        </button>
            </td>
        </tr>
    );
};



export { BuyInsurane, MoneyWithdraw };