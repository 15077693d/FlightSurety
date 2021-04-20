import React, { useEffect, useState } from 'react'
import { Table } from './Table'
import {
  registerAirline,
  fundAirline,
  addFlight,
  removeFlight
} from '../ethereum/flightSuretyApp'
import {
  getOperationStatus,
  setOperationStatus,
} from '../ethereum/flightSuretyData'
const AirlineRegistration = ({ airlines, setRefresh }) => {
  const [address, setAddress] = useState(null)
  const [ether, setEther] = useState(null)
  const handleClickRegister = async () => {
    if ((address !== '') & (address !== null)) {
      await registerAirline(address)
      setRefresh(address)
      setAddress('')
    }
  }

  const handleClickFund = async () => {
    if ((ether !== '') & (ether !== null)) {
      await fundAirline(ether)
      setRefresh(new Date())
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
                <tr key={airline['address']}>
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
        <button onClick={handleClickFund}>fund</button>
      </td>
    </tr>
  )
}

const FlightRegistration = ({ flights, setRefreshFlight }) => {
  const [flight, setFlight] = useState(null)
  const [timestamp, setTimestamp] = useState(null)
  const handleClick = async () => {
    if (
      (flight !== '') &
      (flight !== null) &
      ((timestamp !== '') & (timestamp !== null))
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
          {flights.filter(_flights => _flights.isRegistered==true).map((_flight) => (
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
  const [flight, setFlight] = useState(null)
  const handleClick = async () => {
    if ((flight !== '') & (flight !== null)) {
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
            flights.filter(_flight => _flight.isRegistered==false).map(
              _flight => <tr>
              <td>{_flight.name}</td>
            </tr>
            )
          }
        </Table>
      </td>
      <td>
        <input placeholder="Flight Name." value={flight} onChange={(e) => setFlight(e.target.value)}/>
      </td>
      <td>
        <button onClick={handleClick}>submit</button>
      </td>
    </tr>
  )
}

const InsuranceRepayment = () => {
  return (
    <tr>
      <td>Insurance Repayment</td>
      <td>
        <Table>
          <tr>
            <th>Flight name</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>abc234</td>
            <td>Cancelled</td>
          </tr>
        </Table>
      </td>
      <td>
        <input placeholder="Flight Name." />
      </td>
      <td>
        <button>submit</button>
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
