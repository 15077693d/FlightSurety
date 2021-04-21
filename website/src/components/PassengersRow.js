import React, { useEffect, useState } from 'react';
import { buyInsurane } from '../ethereum/flightSuretyApp';
import { getAccount } from '../ethereum/web3';
import { Table } from './Table';
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

const MoneyWithdraw = () => {
    return (
        <tr>
            <td>
                Money Withdraw
        </td>
            <td>
                Available withdraw:
            <br />
                <br />
            0 ether
        </td>
            <td>
                You can only withdraw all amount...
        </td>
            <td>
                <button>
                    withdraw
        </button>
            </td>
        </tr>)
}

const BuyInsurane = ({ flights, setRefreshFlight }) => {
    const [flight, setFlight] = useState("")
    const [ether, setEther] = useState("")
    const [account, setAccount] = useState(null)
    const handleClick = async () => {
        if (flight !== "" & ether !== "") {
            await buyInsurane(flight, ether)
            setFlight("")
            setEther("")
            setRefreshFlight(new Date())
        }
    }
    useEffect(async () => {
        setAccount(await getAccount())
    }, [])
    let _flights = [] 
    flights.forEach(_flight => {
            let addresses = _flight.clients.map(_client => _client.address)
            console.log(addresses)
            if (addresses.includes(account)) {
                _flights.push(_flight) 
            } 
        })
       
    console.log(_flights, account)
    // if(_flights.length>0){
    //     console.log(_flights[0]['clients'][0]["address"], account)
    // }
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
                        _flights.map(
                            __flight =>
                                <tr>
                                    <td>{__flight["name"]}</td>
                                    <td>{__flight['clients'].filter(_client => _client["address"] === account)[0]['amount']}</td>
                                    <td>{__flight["statusCode"]}</td>
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
                        flights.filter(_flight => _flight["isRegistered"] === true & _flight["statusCode"] == "UNKNOWN" & _flight["repayment"] === false).map(
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