import React, { useEffect, useState } from 'react'
import tradeService from '../../../../server/service/TradeLogService'
import Trade from '../../../../server/models/Trade';
import { Timestamp } from 'firebase/firestore';

export default function TradeLogs() {
  const [page, setPage] = useState();

  const [logs, setLogs] = useState([]);
  useEffect(function(){
    tradeService.getAll().then(function(logs){
      setLogs(logs);
    })
  },[page]);
  
  
  const logsEl = logs.map(
    /**@param {Trade} log */
    function(log,i){
      return (
      <tr key={i}>
          <td>{i}</td>
          <td>{log.asset}</td>
          <td>
              <span className="badge bg-success">{log.direction}</span>
          </td>
          <td>asd</td>
          <td>{log.entryPrice}</td>
          <td>{log.multiplier}</td>
          <td>{new Date(log.createdDate.toDate()).toLocaleDateString()}</td>
          <td ><span className="badge bg-warning">Open</span></td>
          <td>
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-flat">
            <i class="bi bi-building"></i>
            </button>
            <button type="button" class="btn btn-default btn-flat">
              <i class="bi bi-person"></i>
            </button>
            <button type="button" class="btn btn-default btn-flat">
            <i class="bi bi-person"></i>
            </button>
          </div>
          </td>
      </tr>
      );
    }
  )
  return (
    <table class="table table-sm">
        <thead>
        <tr>
            <th style={{"width": "10px"}}>#</th>
            <th>Asset</th>
            <th>Direction</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Leverage</th>
            <th>Date</th>
            <th>Status</th>
            
            <th style={{"width": "40px"}}>Actions</th>
        </tr>
        </thead>
        <tbody>
          {logsEl}
        </tbody>
    </table>
  )
}
