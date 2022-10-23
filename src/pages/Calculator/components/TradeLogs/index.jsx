import React, { useEffect, useState } from 'react'
import tradeService from '../../../../server/service/TradeLogService'
import Trade from '../../../../server/models/Trade';
import ExitModal from './components/ExitModal';
import { swal } from '../../../../assets/theme/utils/swal';
import appDataService from '../../../../server/service/AppDataService';
import { useAppData } from '../../../../contexts/AppDataContext';
import useForceUpdate from '../../../../hooks/useForceUpdate'
import { useAuth } from '../../../../contexts/AuthContext';
import { paginateList } from '../../../../assets/js/Functions';

export default function TradeLogs(props) {
  /**
   * Assignments from Props.
   */
  const maxRecordsPerPage = props.maxRecordsPerPage;
  const parentStates = props.parentStates;
  const [page,setPage] = [parentStates.page, parentStates.setPage];

  /**
   * Component Level Assignments
   */
  const [exitTradeID, setExitTradeID] = useState();
  const [exitModalShown, setExitModalShown] = useState(false);
  const {appData, setAppData} = useAppData();
  const {currentUser} = useAuth();
  
  const forceUpdate = useForceUpdate();

  const [logs, setLogs] = useState([]);
  const [paginatedLogs, setPaginatedLogs] = useState([]);
  const [displayedLogs, setDisplayedLogs] = useState([])


  //on render effects
  useEffect(function(){
    parentStates.setLogsRerenderer(
      function(){
        return forceUpdate.exec
      }
    );
  },[]);

  useEffect(function(){
    //force rerender when the following changes
  },[parentStates.shownTradesDescRerenderer, parentStates.paginatorRerenderer])

  useEffect(function(){
    setPaginatedLogs(paginateList(logs,10));

  },[logs])

  useEffect(function(){
    if(paginatedLogs.length){
        setDisplayedLogs(paginatedLogs[page-1]);
        parentStates.setTradeLogs(paginatedLogs[page-1])
    }
  },[paginatedLogs, page])

  useEffect(function(){
    tradeService.getAll().then(function(res){
      setLogs(res);
    });
    parentStates.forceUpdate.exec();
  },[forceUpdate.renderID]);
  
  const logsEl = displayedLogs.length ? displayedLogs.map(
    /**@param {Trade} log */
    function(log,i){
      return (
      <tr key={log.id} className="text-sm">
          <td className="text-xs">{i + 1 +((page * maxRecordsPerPage) - maxRecordsPerPage)}</td>
          <td className="text-xs">{log.asset}</td>
          <td className="text-xs">
            <span className={`badge text-uppercase ${log.direction === "short" ? "bg-danger" : log.direction === "long" ? "bg-success": "bg-default"}`}>{log.direction}</span>
          </td>
          <td className="text-xs">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(log.notionalValue).toFixed(2))}</td>
          <td className="text-xs">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(log.entryPrice).toFixed(2))}</td>
          <td className="text-xs">{Number(log.leverage).toFixed(2)}</td>
          <td className="text-xs">{String(log.createdDate)}</td>
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
            {/* Trade Log Deletion */}
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
                    const newAppData = appData.decrementTradeCount();
                    appDataService.save(newAppData).then(function(res){
                      forceUpdate.exec();
                      swal.fire({
                        title: "Success",
                        icon: "success",
                        text: `${tradeID} was successfully deleted.`
                      });
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
  ) : <tr><td colSpan={10} className="text-center">No trades to show...</td></tr>
  return (
    <>
      <ExitModal shown={exitModalShown} setShown={setExitModalShown} tradeID={exitTradeID} tradeLogsForceUpdate={forceUpdate}/>
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

TradeLogs.defaultProps = {
  maxRecordsPerPage: 10
}