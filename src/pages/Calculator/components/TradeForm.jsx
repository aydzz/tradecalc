import React from "react";
import { useState } from "react";
import Trade from "../../../server/models/Trade";
import tradeService from "../../../server/service/TradeLogService";
import {Toast} from "../../../assets/theme/utils/swal"

export default function TradeForm() {
  const [leverage, setLeverage] = useState();
  const [direction, setDirection] = useState();
  const [orderType, setOrderType] = useState();
  const [asset, setAsset] = useState();
  const [entryPrice, setEntryPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [cash, setCash] = useState();
  const [allowableCapitalLoss, setAllowableCapitalLoss] = useState();
  const [quantityCash, setQuantityCash] = useState();
  const [stoplossType, setStoplossType] = useState();
  const [stoplossPrice, setStoplossPrice] = useState();
  const [takeProfitType, setTakeProfitType] = useState();
  const [takeProfitPrice, setTakeProfitPrice] = useState();

  const clearForm = function(){
    //do something here...
  }
  const formSubmitHandler = function(e){
    e.preventDefault();
    const newTrade = new Trade(
      "",
      direction,
      orderType,
      "riskType",
      asset,
      entryPrice,
      0,
      quantity,
      leverage,
      stoplossType,
      stoplossPrice,
      takeProfitType,
      takeProfitPrice,
      100,
      100,
      "Adzz",
      new Date()
    );
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
            <input type="number" className="form-control" placeholder="Sample here..." value={leverage} onChange={(e)=>{setLeverage(e.target.value)}}/>
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
            <select type="text" className="form-control" value={direction} onChange={(e)=>{setDirection(e.target.value)}}>
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
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
            <select type="text" className="form-control" value={orderType} onChange={(e)=>{setOrderType(e.target.value)}}>
              <option value="CASH">CASH</option>
              <option value="QUANTITY">QUANTITY</option>
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
            <select type="text" className="form-control" value={asset} onChange={(e)=>{setAsset(e.target.value)}}>
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
            <input type="number" className="form-control" placeholder="Sample here..." value={entryPrice} onChange={(e)=>{setEntryPrice(e.target.value)}}/>
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
            <input type="number" className="form-control" placeholder="Sample here..." value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
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
            <input type="number" className="form-control" placeholder="Sample here..." value={cash} onChange={(e)=>{setCash(e.target.value)}}/>
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
            <input type="number" className="form-control" placeholder="Sample here..." value={allowableCapitalLoss} onChange={(e)=>{setAllowableCapitalLoss(e.target.value)}}/>
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
            <input type="number" className="form-control" placeholder="Sample here..." value={quantityCash} onChange={(e)=>{setQuantityCash(e.target.value)}} />
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
            <select type="text" className="form-control" value={stoplossType} onChange={(e)=>{setStoplossType(e.target.value)}}>
              <option value="RISK">RISK</option>
              <option value="SPREAD">SPREAD</option>
              <option value="LOSS">LOSS</option>
              <option value="TARGET">TARGET</option>
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
            <input type="number" className="form-control" placeholder="Sample here..." value={stoplossPrice} onChange={(e)=>{setStoplossPrice(e.target.value)}} />
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
            <select type="text" className="form-control" value={takeProfitType} onChange={(e)=>{setTakeProfitType(e.target.value)}}>
              <option value="RISK/REWARD">RISK/REWARD</option>
              <option value="TARGET">TARGET</option>
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
            <input type="number" className="form-control" placeholder="Sample here..." value={takeProfitPrice} onChange={(e)=>{setTakeProfitPrice(e.target.value)}}/>
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
