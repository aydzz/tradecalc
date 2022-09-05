import React, { useEffect, useState } from 'react'
import tradeService from '../../../../server/service/TradeLogService'
import Trade from '../../../../server/models/Trade';
import { Timestamp } from 'firebase/firestore';
import ExitModal from './components/ExitModal';
import { swal, Toast } from '../../../../assets/theme/utils/swal';
import { v4 as uuidv4 } from 'uuid';

export default function TradeLogs() {
  const [page, setPage] = useState();
  const [exitTradeID, setExitTradeID] = useState();
  const [exitModalShown, setExitModalShown] = useState(false);
  
  const [UID, setUID] = useState(uuidv4());//for rerendering.

  const [logs, setLogs] = useState([]);
  useEffect(function(){
    tradeService.getAll().then(function(logs){
      setLogs(logs);
    })
  },[page,UID]);
  
  const logsEl = logs.map(
    /**@param {Trade} log */
    function(log,i){
      return (
      <tr key={log.id} className="text-sm">
          <td className="text-xs">{i + 1}</td>
          <td className="text-xs">{log.asset}</td>
          <td className="text-xs">
              <span 
                className={`badge text-uppercase ${log.direction === "short" ? "bg-danger" : log.direction === "long" ? "bg-success": "bg-default"}`}>{log.direction}</span>
          </td>
          <td className="text-xs">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(log.notionalValue).toFixed(2))}</td>
          <td className="text-xs">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(log.entryPrice).toFixed(2))}</td>
          <td className="text-xs">{Number(log.leverage).toFixed(2)}</td>
          <td className="text-xs">{new Date(log.createdDate.toDate()).toLocaleDateString()}</td>
          <td className="text-xs">
            <span className={`text-uppercase badge ${log.status === "open" ? "bg-warning" : "bg-success" }`}>
              {log.status}
            </span>
          </td>
          <td className="text-xs">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(log.tradeValue).toFixed(2))}</td>
          <td className="text-xs">
          {log.status === "open" ? 
            (<div className="btn-group">
            <button type="button" className="btn btn-xs btn-default btn-flat p-1" data-trade-id={log.id}
              onClick={
                (e)=>{
                  const tradeID = e.currentTarget.getAttribute("data-trade-id");
                  setExitTradeID(tradeID);
                  setExitModalShown(true);
                }
              }
            >
              <i className="bi bi-box-arrow-left"></i>
            </button>
            <button type="button" className="btn btn-xs btn-danger btn-flat" data-trade-id={log.id} onClick={(e)=>{
              const tradeID = e.currentTarget.getAttribute("data-trade-id");
              swal.fire({
                title: 'Are you sure?',
                text: "Trade will be deleted permanently.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm',
              }).then((result) => {
                if (result.isConfirmed) {
                  tradeService.delete(tradeID).then(function(res){
                    setUID(uuidv4())
                    swal.fire({
                      title: "Success",
                      icon: "success",
                      text: `${tradeID} was successfully deleted.`
                    })
                  })
                }else if(result.isDenied){
                  //action cancelled.
                }
              })
              
            }}>
              <i className="bi bi-x-circle"></i>
            </button>
          </div>) : <p className='text-center m-0 p-0'>-</p>
          }
          </td>
      </tr>
      );
    }
  )
  // console.log(exitTradeID);
  logsEl.push(<tr className="p-2"><td colSpan="10" className='text-center text-xs py-2'><a href="javascript:void(0)" onClick={()=>{console.log("Show here was clicked..")}}>Show More...</a></td></tr>)
  return (
    <>
      <ExitModal shown={exitModalShown} setShown={setExitModalShown} tradeID={exitTradeID}/>
      <table className="table table-sm">
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
              <th>PnL</th>
              <th style={{"width": "40px"}}>Actions</th>
          </tr>
          </thead>
          <tbody>
            {logsEl}
          </tbody>
      </table>
    </>
  )
}
