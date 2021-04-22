import React, { useEffect, useState } from 'react'
import { Table } from './Table'
import {
  registerAirline,
  fundAirline,
  addFlight,
  removeFlight,
  repayClient
} from '../ethereum/flightSuretyApp'
import {
  getOperationStatus,
  setOperationStatus,
} from '../ethereum/flightSuretyData'
const AirlineRegistration = ({ airlines, setRefreshAirlines }) => {
  const [address, setAddress] = useState(null)
  const [ether, setEther] = useState(null)
  const handleClickRegister = async () => {
    if ((address !== '') & (address !== null)) {
      await registerAirline(address)
      setRefreshAirlines(address)
      setAddress('')
    }
  }

  const handleClickFund = async () => {
    if ((ether !== '')) {
      await fundAirline(ether)
      setRefreshAirlines(new Date())
      setEther('')
    }
  }
  return (
    <tr>
      <td>Airline Registration</td>
      <td>
        <Table>
          <tr>
            <th>Airline address</th>
            <th>Ether</th>
          </tr>
          {airlines
            ? airlines.map((airline) => (
              <tr key={airline['address']+"_Registration"}>
                <td>{airline['address']}</td>
                <td>{airline['ether']}</td>
              </tr>
            ))
            : null}
        </Table>
      </td>
      <td>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <br />
        <input
          placeholder="Ether"
          type="number"
          value={ether}
          onChange={(e) => setEther(e.target.value)}
        />
      </td>
      <td>
        <button onClick={handleClickRegister}>submit</button>
        <br />
        <br />
        <button onClick={handleClickFund}>fund myself</button>
      </td>
    </tr>
  )
}

const FlightRegistration = ({ flights, setRefreshFlight }) => {
  const [flight, setFlight] = useState("")
  const [timestamp, setTimestamp] = useState("")
  const handleClick = async () => {
    if (
      (flight !== '') & (timestamp !== '')
    ) {
      await addFlight(flight, timestamp)
      setRefreshFlight(new Date())
      setFlight('')
      setTimestamp('')
    }
  }
  return (
    <tr>
      <td>Flight Registration</td>
      <td>
        <Table>
          <tr>
            <th>Flight name</th>
            <th>Status</th>
          </tr>
          {flights.filter(_flights => _flights.statusCode !== "CANCEL").map((_flight) => (
            <tr>
              <td>{_flight['name']}</td>
              <td>{_flight['statusCode']}</td>
            </tr>
          ))}
        </Table>
      </td>
      <td>
        <input
          placeholder="Flight Name."
          value={flight}
          onChange={(e) => setFlight(e.target.value)}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
      </td>
      <td>
        <button onClick={handleClick}>submit</button>
      </td>
    </tr>
  )
}

const FlightCancel = ({ flights, setRefreshFlight }) => {
  const [flight, setFlight] = useState("")
  const handleClick = async () => {
    if (flight !== '') {
      await removeFlight(flight)
      setFlight('')
      setRefreshFlight(new Date())
    }
  }

  return (
    <tr>
      <td>Flight Cancel</td>
      <td>
        <Table>
          <tr>
            <th>Flight name</th>
          </tr>
          {
            flights.filter(_flight => _flight.statusCode ==="CANCEL" ).map(
              _flight => <tr key={_flight.name+"_cancel"}>
                <td>{_flight.name}</td>
              </tr>
            )
          }
        </Table>
      </td>
      <td>
        <input placeholder="Flight Name." value={flight} onChange={(e) => setFlight(e.target.value)} />
      </td>
      <td>
        <button onClick={handleClick}>submit</button>
      </td>
    </tr>
  )
}

const InsuranceRepayment = ({setRefreshWithdraw, flights, setRefreshFlight }) => {
  const [flight, setFlight] = useState("")
  const handleClick = async () => {
    if(flight!==""){
      await repayClient(flight, 
        flights.filter(_flight => _flight.name==flight)[0].statusCode)
      setRefreshFlight(new Date())
      setRefreshWithdraw(new Date())
      setFlight("")
    }
  }
  return (
    <tr>
      <td>Insurance Repayment</td>
      <td>
        <Table>
          <tr>
            <th>Flight name</th>
            <th>Status</th>
          </tr>
          {
            flights.filter(_flight => _flight.repayment==true).map(
              _flight =>  <tr>
            <td>{_flight.name}</td>
            <td>{_flight.statusCode}</td>
          </tr>
            )
          }
        </Table>
      </td>
      <td>
        <input value={flight} placeholder="Flight Name." onChange={(e) => setFlight(e.target.value)}/>
      </td>
      <td>
        <button onClick={handleClick}>submit</button>
      </td>
    </tr>
  )
}

const OperationalSetup = () => {
  const [_contractOwner, setContractOwner] = useState(null)
  const [_operational, setOperational] = useState(null)
  const [selected, setSelected] = useState('true')
  const [refresh, setRefresh] = useState('true')
  const handleClick = async () => {
    await setOperationStatus(selected)
    setRefresh(new Date())
  }
  useEffect(async () => {
    const { contractOwner, operational } = await getOperationStatus()
    setContractOwner(contractOwner)
    setOperational(operational)
  }, [refresh])
  return (
    <tr>
      <td>Operational Setup</td>
      <td>
        <Table>
          <tr>
            <th>Current Status</th>
            <th>Contract Owner</th>
          </tr>
          <tr>
            <td>{String(_operational)}</td>
            <td> {_contractOwner}</td>
          </tr>
        </Table>
      </td>
      <td>
        <select onChange={(e) => setSelected(e.target.value)}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </td>
      <td>
        <button onClick={handleClick}>submit</button>
      </td>
    </tr>
  )
}

export {
  OperationalSetup,
  AirlineRegistration,
  FlightRegistration,
  FlightCancel,
  InsuranceRepayment,
}
