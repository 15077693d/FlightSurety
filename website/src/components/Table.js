import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { OperationalSetup, AirlineRegistration, FlightRegistration, FlightCancel, InsuranceRepayment } from './AirlineRow';
import { BuyInsurane, MoneyWithdraw } from './PassengersRow';
import {getAirlines} from '../ethereum/flightSuretyData'
import { getFlight } from '../ethereum/flightSuretyApp';

const Table = styled.table`
    margin:auto;
    margin-top: ${({ margin }) => margin};
    margin-bottom: ${({ margin }) => margin};
    border-collapse: collapse;
    width:${({ width }) => width};
    th, td{
        border: 1px solid #ddd;
        padding: ${({ padding }) => padding};
    }
    th{
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }
`

/*
Airline
 1. show and set operational (Operational Setup)
 2. show and reg airline and add ether (Airline Registration)
 3. show and add flight  (Flight Registration)
 4. Cancel flight, Insurance Repayment (Insurance Setup)
*/

const TableHead = ({ name }) => {
    return (
        <tr>
            <th>
                {name}
            </th>
            <th>
                Information
        </th>
            <th>
                Input
        </th>
            <th>
                Submit
        </th>
        </tr>
    );
};

const AirlineTable = () => {
    const [airlines, setAirlines] = useState(null)
    const [flights, setFlight] = useState(null)
    const [refresh, setRefresh] = useState(null)
    useEffect(async () => {
        setAirlines(await getAirlines())
        setFlight(await getFlight())
    }, [refresh])
    return (
        <Table width="700px" margin="50px" padding="8px">
            <TableHead name={"Airline broad"} />
            <OperationalSetup />
            <AirlineRegistration airlines={airlines} setRefresh={setRefresh}/>
            <FlightRegistration flights={flights} setRefresh={setRefresh}/>
            <FlightCancel setRefresh={setRefresh}/>
            <InsuranceRepayment setRefresh={setRefresh}/>
        </Table>
    );
};

/*
Passengers
 1.PassengersBuy insurance (Insurance Purchase)
 2. Money Withdraw
 3. check Flight Status
*/
const PassengersTable = () => {
    return (
        <Table width="700px" margin="50px" padding="8px">
            <TableHead name={"Passenger broad"} />
            <BuyInsurane />
            <MoneyWithdraw />
        </Table>
    );
};

export { AirlineTable, PassengersTable, Table };