import React from 'react';
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

const BuyInsurane = () => {
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
                    <tr>
                        <td>abc123</td>
                        <td>0.5</td>
                        <td>UNKNOWN</td>
                    </tr>
                </Table>
            </td>
            <td>
                Flight Name. :
        <select>
                    <option value="abc123">abc123</option>
                </select>
                <br />
                <br />
        Amount :
        <input type="number" placeholder="Ether" />
            </td>
            <td>
                <button>
                    submit
        </button>
            </td>
        </tr>
    );
};



export { BuyInsurane, MoneyWithdraw };