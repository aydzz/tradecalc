import { setUserProperties } from 'firebase/analytics';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import TradeCalculator from '../../../../../assets/js/TradeCalculator';
import OverlayLoader from '../../../../../components/Loaders/OverlayLoader';
import { useTradeSettings } from '../../../../../contexts/TradeSettingsContext';
import Trade, { NullTrade } from '../../../../../server/models/Trade';
import { NullTradeSetting } from '../../../../../server/models/TradeSetting';
import tradeService from '../../../../../server/service/TradeLogService';
import TradeSetting from '../../../../../server/models/TradeSetting';
import tradeSettingService from '../../../../../server/service/TradeSettingService';
import { swal } from '../../../../../assets/theme/utils/swal';

export default function ExitTradeForm(props) {
    const tradeID = props.tradeID;
    /**@type {TradeSetting} */
    const {tradeSettings} = useTradeSettings();
    
    /**@type {[TradeCalculator, Function]} */
    const [tradeCalculator, setTradeCalculator] = useState(new TradeCalculator(tradeSettings, new NullTrade()))

    /**@type {[Trade, Function]} */
    const [trade, setTrade] = useState(new NullTrade());

    const tpHit = useRef();
    const slHit = useRef();
    const exitOrder = useRef();
    
    const exitOrderText = useRef();
    const [exitOrderVal, setExitOrderVal] = useState(Number(0).toFixed(2));
    const accountClosingRef = useRef();
    const [accountClosing, setAccountClosing] = useState(Number(0).toFixed(2));
    const profitLossRef = useRef();
    const [profitLoss, setProfitLoss] = useState(Number(0).toFixed(2));
    const [remarks, setRemarks] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    const setModalShown = props.setModalShown;

    

    const exitSelectionInitState = function(){
        exitOrder.current.disabled = false;
        slHit.current.disabled = false;
        tpHit.current.disabled = false

        exitOrderText.current.disabled = true
        setExitOrderVal(Number(0).toFixed(2));
    }
    const exitSelectionHandler = function(e){
        if(e.currentTarget === tpHit.current){
            if(tpHit.current.checked){
                exitOrder.current.checked = false;
                exitOrder.current.disabled = true;
                slHit.current.checked = false;
                slHit.current.disabled = true;
    
                exitOrderText.current.disabled = true;
                console.log(tradeCalculator.takeProfitPrice);
                setExitOrderVal(Number(tradeCalculator.takeProfitPrice).toFixed(2));
            }else{
                exitSelectionInitState();
            }
        }else if(e.currentTarget === slHit.current){
            if(slHit.current.checked){
                tpHit.current.checked = false;
                tpHit.current.disabled = true;
                exitOrder.current.checked = false;
                exitOrder.current.disabled = true;
    
                exitOrderText.current.disabled = true;
                setExitOrderVal(Number(tradeCalculator.stoplossPrice).toFixed(2));
                
            }else{
                exitSelectionInitState();
            }
        }else{
            if(exitOrder.current.checked){
                tpHit.current.checked = false;
                tpHit.current.disabled = true;
                slHit.current.checked = false;
                slHit.current.disabled = true;
    
                exitOrderText.current.disabled = false
                setExitOrderVal(Number(0).toFixed(2));
            }else{
                exitSelectionInitState();
            }
        }
    }
    //throws an error when no tradeID was received.
    if(!tradeID){
      throw new Error("Missing Trade ID in Exit Form")
    }

    //gets the trade details.
    useEffect(function(){
      tradeService.get(tradeID).then(function(res){
        if(res){
          setTrade(res);
          setTradeCalculator(new TradeCalculator(tradeSettings,res));
          setLoading(false);
        }else{
          throw new Error("Missing Trade Details.")
        }
      }).catch((error)=>{
        setError(error);
        setLoading(false);
      })
    },[]);

    //throws the error if there is any error during render.
    useEffect(function(){
      if(error){
        throw error;
      }
    },[error])

    const loader = (
      <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
        <OverlayLoader type="loading-6"></OverlayLoader>
      </div>
    )

  return (
    loading ? loader :
    <form onSubmit={(e)=>{
      e.preventDefault();
      console.log(trade);
      const newTrade = Object.assign(new Trade(), trade);
      const newTradeSettings = Object.assign(new TradeSetting(), tradeSettings);

      //Setting exit values, Note that I think this should be a transactional query in firebase ( execute batch at once ) - TODO 3
      const newRealizedPnL = Number(tradeSettings.realizedPnL) + Number(profitLoss);
      const newTradeValue = Number(profitLoss); //no calculation for this yet, i think this should calculated in trade calculator. ()
      const newStatus = "closed";

      newTrade.status = newStatus;
      newTrade.tradeValue = newTradeValue
      newTradeSettings.realizedPnL = newRealizedPnL;

      tradeSettingService.save(newTradeSettings).then(function(res){
        tradeService.save(newTrade).then(function(e){
            setModalShown(false);
            swal.fire({
              "icon": "success",
              "title": "Trade Closed",
              "text": `${newTrade.id} was successfully closed.`
            })
        })
      })



    }} ref={props.formRef}>
        <div className="form-group col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                    ref={tpHit}
                    onClick={exitSelectionHandler}/>
                <label class="form-check-label">Take Profit Hit</label>
            </div>
        </div>
        <div className="form-group col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                    ref={slHit}
                    onClick={exitSelectionHandler}/>
                <label class="form-check-label">Stoploss Hit</label>
            </div>
        </div>
        <div className="form-group col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                    ref={exitOrder} 
                    onClick={exitSelectionHandler}/>
                <label class="form-check-label">Exit Order</label>
            </div>
        </div>
        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Exit Price</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Trade Exit Price..." disabled
                value={exitOrderVal}  
                ref={exitOrderText}
                onChange={(e)=>{
                  if(e.target.value === ""){
                    setExitOrderVal(Number(0).toFixed(2));
                  }else{
                    setExitOrderVal(e.target.value);
                  }
                  
                }}
                onBlur={(e)=>{
                  setExitOrderVal(Number(exitOrderVal).toFixed(2))
                }}
              />
          </div>
        </div>
        <hr></hr>
        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Account Closing</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Account Closing." 
              ref={accountClosingRef}
              value={accountClosing}
              onChange={(e)=>{
                if(e.target.value === ""){
                  //setAccountClosing(Number(0).toFixed(2))
                  setAccountClosing(e.target.value)
                }else{
                  setAccountClosing(e.target.value)
                  let profitLoss = 0;
                  profitLoss = Number(e.target.value)- (Number(tradeSettings.portfolioValue) +Number( tradeSettings.realizedPnL ));
                  setProfitLoss(Number(profitLoss).toFixed(2));
                }
              }}
              onBlur={(e)=>{
                setProfitLoss(Number(profitLoss).toFixed(2))
              }}
            />
          </div>
        </div>
              
        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Profit Loss</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Enter actual trade PnL here..." 
              ref={profitLossRef}
              value={profitLoss}
              onChange={(e)=>{
                if(e.target.value === ""){
                  //setProfitLoss(Number(0).toFixed(2));
                  setProfitLoss(e.target.value);
                }else{
                  setProfitLoss(e.target.value);
                  let accountClosing = 0;
                  accountClosing = (Number(tradeSettings.portfolioValue) + Number(tradeSettings.realizedPnL) ) + Number(e.target.value);
                  setAccountClosing(Number(accountClosing).toFixed(2));
                };
              }}
              onBlur={(e)=>{
                setAccountClosing(Number(accountClosing).toFixed(2))
              }}
            />
          </div>
        </div>
        <div className="form-group col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked disabled/>
                <label class="form-check-label">Input PnL Manually</label>
            </div>
        </div>
        <hr></hr>
        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Remarks</label>
          <div className="input-group input-group-sm">
          <textarea class="form-control" rows="3" placeholder="Trade Remarks..."
            value={remarks}
            onChange={(e)=>{
              setRemarks(e.target.value);
            }}
          ></textarea>
          </div>
        </div>

    </form>
  )
}

/**
 * TODO:
 *  1.There might be another way of getting the tradeDetails which is to reuse Trade instance from TradeLogs. ( since we already got it in the first place.)
 *    - to be more economic in api calls, kindly fix this in the future
 *  2. Automatically calculate accountClosing and profitLoss based on the inputs from exit parameters
 *    - Also enable thhe option to automatically compute it.
 *    - PnL is being calculated manually as of the moment ( based on the inputs from accountClosing and profitLoss )
 *  3. Implement  transactional query for saving BOTH Trade and TradeSetting ( realizedPnL ) with one request.
 */
