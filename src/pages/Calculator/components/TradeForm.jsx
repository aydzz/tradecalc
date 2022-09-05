import React, { useEffect } from "react";
import { useState } from "react";
import Trade from "../../../server/models/Trade";
import tradeService from "../../../server/service/TradeLogService";
import {Toast} from "../../../assets/theme/utils/swal"
import TradeCalculator from "../../../assets/js/TradeCalculator";
import {swal} from "../../../assets/theme/utils/swal";

export default function TradeForm(props) {
  /**@type {Trade} */
  const trade = props.trade;
  const setTrade = props.setTrade;
  const setTradeCalculator = props.setTradeCalculator;
  const tradeCalculator = props.tradeCalculator;
  const tradeSettings = props.tradeSettings;

  useEffect(function(e){
    const newTradeCalculator = new TradeCalculator(tradeSettings, trade);
    
    //tradeCalculator ( calculated ) value assignments on state change.
    trade.stoplossPrice = newTradeCalculator.stoplossPrice;
    trade.takeProfitPrice = newTradeCalculator.takeProfitPrice;
    trade.riskValue = newTradeCalculator.riskValue;

    setTradeCalculator(newTradeCalculator);
  },[trade])

  // useEffect(function(e){
  //   console.log(trade);
  //   setTradeCalculator(new TradeCalculator(tradeSettings, trade));
  // },[tradeCalculator]);
  
  const clearForm = function(){
    //do something here...
  }
  const formSubmitHandler = function(e){
    e.preventDefault();
    //do submission effect to our object here..
    const newTrade = trade
    newTrade.status = "open" // this seems wrong.
    newTrade.accountOpen = tradeSettings.portfolioValue //this seems wrong as well.

    console.log(newTrade);
    tradeService.save(newTrade).then(function(res){
      Toast.fire({
        title: "Trade has been logged!",
        icon: "success"
      })
    })
  }
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="row">
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Leverage</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..." 
              value={trade.leverage} 
              onChange={(e)=>{
                    const newTrade = Object.assign(new Trade(), trade);
                    newTrade.leverage = Number(e.target.value);
                    setTrade(newTrade);
              }}
            />
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Direction</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <select type="text" className="form-control" 
              value={trade.direction} 
              onChange={(e)=>{
                const newTrade = Object.assign(new Trade(), trade);
                newTrade.direction = e.target.value;
                setTrade(newTrade);
              }}
            >
              <option value="long">LONG</option>
              <option value="short">SHORT</option>
            </select>
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Order Type</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <select type="text" className="form-control" 
              value={trade.orderType} 
              onChange={(e)=>{
                const newTrade = Object.assign(new Trade(), trade);
                newTrade.orderType = e.target.value;
                setTrade(newTrade);
              }}
            >
              <option value="cash">CASH</option>
              <option value="quantity">QUANTITY</option>
            </select>
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Asset</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <select type="text" className="form-control" 
              value={trade.asset} 
              onChange={(e)=>{
                const newTrade = Object.assign(new Trade(), trade);
                newTrade.asset = e.target.value;
                setTrade(newTrade);
              }}
            >
              <option value="BTC/USDT">BTC/USDT</option>
              <option value="ETH/USDT">ETH/USDT</option>
            </select>
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Entry Price</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..." 
                value={trade.entryPrice} 
                onChange={(e)=>{
                  const newTrade = Object.assign(new Trade(), trade);
                  newTrade.entryPrice = Number(e.target.value);
                  setTrade(newTrade);
                }}
              />
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Quantity</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..." 
                value={trade.quantity} 
                onChange={(e)=>{
                  const newTrade = Object.assign(new Trade(), trade);
                  newTrade.quantity = Number(e.target.value);
                  setTrade(newTrade);
                }}
              />
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Cash</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..." 
              value={trade.cash} 
              onChange={(e)=>{
                const newTrade = Object.assign(new Trade(), trade);
                newTrade.cash = Number(e.target.value);
                setTrade(newTrade);
              }}
            />
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Allowable Capital Loss</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..." 
              value={trade.allowableCapitalLoss} 
              onChange={(e)=>{
                const newTrade = Object.assign(new Trade(), trade);
                newTrade.allowableCapitalLoss = Number(e.target.value);
                setTrade(newTrade);
              }}/>
          </div>
        </div>
        <hr></hr>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Quantity[cash]</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..." 
              value={trade.cashQty} 
              onFocus={()=>{
                Toast.fire({
                  title: "Warning",
                  icon: "warning",
                  text: "Formula Fields cant be changed."
                })
              }}
              />
              
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Stoploss Type</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <select type="text" className="form-control" 
                value={trade.stoplossType} 
                onChange={(e)=>{
                  const newTrade = Object.assign(new Trade(), trade);
                  newTrade.stoplossType = e.target.value;
                  setTrade(newTrade);
                }}
              >
              <option value="risk">RISK</option>
              <option value="spread">SPREAD</option>
              <option value="loss">LOSS</option>
              <option value="target">TARGET</option>
            </select>
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Stoploss Price</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..."
              value={Number(trade.stoplossPrice).toFixed(5)} 
              readOnly={true}/>
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Take Profit Type</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <select type="text" className="form-control" 
                value={trade.takeProfitType} 
                onChange={(e)=>{
                  const newTrade = Object.assign(new Trade(), trade);
                  newTrade.takeProfitType = e.target.value;
                  setTrade(newTrade);
                }}>
              <option value="riskreward">RISK/REWARD</option>
              <option value="target">TARGET</option>
            </select>
          </div>
        </div>
        <div className="form-group col-lg-6 col-12 mb-3">
          <label className="text-sm m-0">Take Profit Price</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Sample here..." 
              value={Number(tradeCalculator.takeProfitPrice).toFixed(5)} 
              readOnly={true}/>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary d-block m-auto">
            <i className="bi bi-box-arrow-left"></i> Log Trade{" "}
          </button>
        </div>
      </div>
    </form>
  );
}


/**
 * NOTES:
 *  20220829: replaced controlled fields's datasource as a new Trade Object Instance instead ( former individual field ). 
 *  - Take note of our issue regarding the Object.bind() since we are using getters and setters here.
 * 20220901: FIXED: updates to calculated values were handled in the instantiation of the newTradeCalculator instaed in the onChange of the field.
 * 
 * TODO:
 *  - clearFormFunction
 *  - impelement null instead of "" to fields that are not used in a fiel ( react throws a warning so i opted to "") - DONE 20220831 - adzz
 *  - add api call for dropdowns
 *  - Trade Object values are from the Previous Inputs ( when using FakeFiller, also applicalbe in manual inputting ) - FIXED 20220901 - adzz
 *    - Possible workaround can be changing the Trade State in the submission event
 * 
 */
