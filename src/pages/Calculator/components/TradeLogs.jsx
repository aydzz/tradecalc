import React from 'react'

export default function TradeLogs() {
  return (
    <table class="table table-sm">
        <thead>
        <tr>
            <th style={{"width": "10px"}}>#</th>
            <th>Asset</th>
            <th>Direction</th>
            <th>Entry</th>
            <th>Leverage</th>
            <th>Notional Value</th>
            <th>Date</th>
            <th>Status</th>
            
            <th style={{"width": "40px"}}>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1.</td>
            <td>BTC/USDT</td>
            <td>
                <span className="badge bg-success">LONG</span>
            </td>
            <td>$100.00</td>
            <td>10</td>
            <td>$1000.00</td>
            <td>{new Date().toLocaleDateString()}</td>
            <td ><span className="badge bg-warning">OPEN</span></td>
        </tr>
        </tbody>
    </table>
  )
}
