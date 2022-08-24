import React from "react";
import { useState } from "react";

export default function TradeForm() {
  const [leverage, setLeverage] = useState();
  const [direction, setDirection] = useState();
  const [orderType, setOrderType] = useState();
  const [asset, setAsset] = useState();
  const [entryPrice, setEntryPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [allowableCapitalLoss, setAllowableCapitalLoss] = useState();
  const [quantityCash, setQuantityCash] = useState();
  const [stoplossType, setStoplossType] = useState();
  const [stoplossPrice, setStoplossPrice] = useState();
  const [takeProfitType, setTakeProfitType] = useState();
  const [takeProfitPrice, setTakeProfitPrice] = useState();

  return (
    <div className="row">
      <div className="form-group col-lg-6 col-12 mb-3">
        <label className="text-sm m-0">Leverage</label>
        <div className="input-group input-group-sm">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="bi bi-graph-up-arrow"></i>
            </span>
          </div>
          <input type="number" className="form-control" placeholder="Sample here..." />
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
          <select type="text" className="form-control">
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
          <select type="text" className="form-control">
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
          <select type="text" className="form-control">
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
          <input type="number" className="form-control" placeholder="Sample here..." />
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
          <input type="number" className="form-control" placeholder="Sample here..." />
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
          <input type="number" className="form-control" placeholder="Sample here..." />
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
          <input type="number" className="form-control" placeholder="Sample here..." />
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
          <input type="number" className="form-control" placeholder="Sample here..." />
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
          <select type="text" className="form-control">
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
          <input type="number" className="form-control" placeholder="Sample here..." />
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
          <select type="text" className="form-control">
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
          <input type="number" className="form-control" placeholder="Sample here..." />
        </div>
      </div>
      <div className="col-12">
        <button className="btn btn-primary d-block m-auto">
          <i className="bi bi-box-arrow-left"></i> Log Trade{" "}
        </button>
      </div>
    </div>
  );
}
