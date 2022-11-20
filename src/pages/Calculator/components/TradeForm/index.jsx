import React, { useEffect } from "react";
import Trade, { NullTrade } from "../../../../server/models/Trade";
import tradeService from "../../../../server/service/TradeLogService";
import {Toast} from "../../../../assets/theme/utils/swal"
import TradeCalculator from "../../../../assets/js/TradeCalculator";
import appDataService from "../../../../server/service/AppDataService";
import { useAppData } from "../../../../contexts/AppDataContext";
import AppData from "../../../../server/models/AppData";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../../../../contexts/AuthContext";
import { Form, Formik } from "formik";
import * as Yup from "yup"
import { inputValidationString } from "../../../../assets/js/Functions";
import Functions from "../../../../assets/js/Functions";
import { useState } from "react";

/**
 * @TODO
 *  - clearFormFunction
 *  - impelement null instead of "" to fields that are not used in a fiel ( react throws a warning so i opted to "") - DONE 20220831 - adzz
 *  - add api call for dropdowns
 *  - Trade Object values are from the Previous Inputs ( when using FakeFiller, also applicalbe in manual inputting ) - FIXED 20220901 - adzz
 *    - Possible workaround can be changing the Trade State in the submission event
 * 
 */
export default function TradeForm(props) {
  /**@type {Trade} */
  const trade = props.trade;
  const setTrade = props.setTrade;
  const setTradeCalculator = props.setTradeCalculator;
  const tradeCalculator = props.tradeCalculator;
  const tradeSettings = props.tradeSettings;
  const logsRerenderer = props.logsRerenderer;

  /**
   * Component Level Assignments
   */
  /**@type {AppData, Function} */
  const {appData, setAppData} = useAppData();
  const {currentUser} = useAuth()
  const NULL_TRADE = new NullTrade();

  // useEffect(function(e){
  //   const newTradeCalculator = new TradeCalculator(tradeSettings, trade);
    
  //   tradeCalculator ( calculated ) value assignments on state change.
  //   trade.stoplossPrice = newTradeCalculator.stoplossPrice;
  //   trade.takeProfitPrice = newTradeCalculator.takeProfitPrice;
  //   trade.riskValue = newTradeCalculator.riskValue;

  //   console.log(newTradeCalculator);
  //   setTradeCalculator(newTradeCalculator);
  // },[]);

  const calculationHandler = function(){
    const newTradeCalculator = new TradeCalculator(tradeSettings, trade)
  
    //tradeCalculator ( calculated ) value assignments on state change.
    trade.stoplossPrice = newTradeCalculator.stoplossPrice;
    trade.takeProfitPrice = newTradeCalculator.takeProfitPrice;
    trade.riskValue = newTradeCalculator.riskValue;

    console.log(newTradeCalculator);
    setTradeCalculator(newTradeCalculator);
  }
  const submitHandler = function(values,params){
    //do submission effect to our object here..
    const newTrade = trade
    newTrade.status = "open" // this seems wrong.
    newTrade.accountOpen = tradeSettings.portfolioValue //this seems wrong as well.
    newTrade.createdBy = currentUser.uid;

    const {resetForm, validateForm} = params;

    tradeService.save(newTrade).then(function(res){
      const newAppData = appData.incrementTradeCount()
      appDataService.save(newAppData).then(function(res){
        setAppData(newAppData);
        Toast.fire({
          title: "Trade has been logged!",
          icon: "success"
        })
        logsRerenderer(uuidv4());
        resetForm();
        validateForm();
      }).catch(function(err){
      })
    })
  }
  return (
    <Formik
      validateOnMount={true}
      enableReinitialize
      initialValues={{
        leverage: NULL_TRADE.leverage,
        direction: NULL_TRADE.direction,
        orderType: NULL_TRADE.orderType,
        asset: NULL_TRADE.asset,
        entryPrice: NULL_TRADE.entryPrice,
        quantity: NULL_TRADE.quantity,
        cash: NULL_TRADE.cash,
        allowableCapitalLoss: NULL_TRADE.allowableCapitalLoss,
        stoplossType: NULL_TRADE.stoplossType,
        stoplossPrice: NULL_TRADE.stoplossPrice,
        takeProfitType: NULL_TRADE.takeProfitType,
        takeProfitPrice: NULL_TRADE.takeProfitPrice
      }}
      validationSchema={
        Yup.object({
          leverage: Yup.number().required().integer().positive(),
          direction: Yup.string().required(),
          orderType: Yup.string().required(),
          asset: Yup.string().required(),
          entryPrice: Yup.number().required().positive(),
          quantity: Yup.number().required().positive(),
          cash: Yup.number().required().positive(),
          allowableCapitalLoss: Yup.number().required().positive(),
          stoplossType: Yup.string().required(),
          takeProfitType:  Yup.string().required(),
        }) 
      }
      onSubmit={submitHandler}
    >
      {function(formik){
        const tempTrade = Object.assign(new Trade(), new NullTrade());
        const newTrade = Object.assign(tempTrade,formik.values);
        
        console.log(trade);
        console.log(newTrade);
        if(!Functions.isEqualTo(trade, tempTrade)){
          setTrade(newTrade);

          /**
           * @TODO Fix Warning Generated from this function call 
           */
          calculationHandler();
        }
        return(
          <Form>
            <div className="row">
              <div className="form-group col-lg-6 col-12 mb-3">
                <label className="text-sm m-0">Leverage</label>
                <div className="input-group input-group-sm">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="bi bi-graph-up-arrow"></i>
                    </span>
                  </div>
                  <input name="leverage" type="number" className={`form-control ${inputValidationString(formik,"leverage")}`} placeholder="Sample here..." 
                    {...formik.getFieldProps("leverage")}
                    // value={trade.leverage} 
                    // onBlur={formik.getFieldProps("leverage").onBlur}
                    // onChange={(e)=>{
                    //     const newTrade = Object.assign(new Trade(), trade);
                    //     newTrade.leverage = Number(e.target.value);
                    //     setTrade(newTrade);
                    //     formik.getFieldProps("leverage").onChange(e)
                        
                    // }}
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
                  <select name="direction" className={`form-control ${inputValidationString(formik,"direction")}`}
                    {...formik.getFieldProps("direction")}
                    // value={trade.direction}
                    // onBlur={formik.getFieldProps("direction").onBlur} 
                    // onChange={(e)=>{
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.direction = e.target.value;
                    //   setTrade(newTrade);
                    //   formik.getFieldProps("direction").onChange(e)
                      
                    // }}
                  >
                    <option value="">-- SELECT --</option>
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
                  <select name="orderType" className={`form-control ${inputValidationString(formik,"orderType")}`}
                    {...formik.getFieldProps("orderType")}
                    // value={trade.orderType} 
                    // onBlur={formik.getFieldProps("orderType").onBlur} 
                    // onChange={(e)=>{
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.orderType = e.target.value;
                    //   setTrade(newTrade);
                    //   formik.getFieldProps("orderType").onChange(e)
                    // }}
                  >
                    <option value="">-- SELECT --</option>
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
                  <select name="asset" className={`form-control ${inputValidationString(formik,"asset")}`}
                    {...formik.getFieldProps("asset")} 
                    // value={trade.asset} 
                    // onBlur={formik.getFieldProps("asset").onBlur} 
                    // onChange={(e)=>{
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.asset = e.target.value;
                    //   setTrade(newTrade);
                    //   formik.getFieldProps("asset").onChange(e);
                    // }}
                  >
                    <option value="">-- SELECT --</option>
                    <option value="ASSET_1">ASSET 1</option>
                    <option value="ASSET_2">ASSET 2</option>
                    <option value="ASSET_3">ASSET 3</option>
                    <option value="ASSET_4">ASSET 4</option>
                    <option value="ASSET_5">ASSET 5</option>
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
                  <input name="entryPrice" type="number" className={`form-control ${inputValidationString(formik,"entryPrice")}`} placeholder="Sample here..." 
                    {...formik.getFieldProps("entryPrice")}
                    // value={trade.entryPrice} 
                    // onChange={(e)=>{
                    //   formik.getFieldProps("entryPrice").onChange(e)
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.entryPrice = Number(e.target.value);
                    //   setTrade(newTrade);
                    // }}
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
                  <input name="quantity" type="number" className={`form-control ${inputValidationString(formik,"quantity")}`} placeholder="Sample here..." 
                    {...formik.getFieldProps("quantity")}
                    // value={trade.quantity} 
                    // onChange={(e)=>{
                    //   formik.getFieldProps("quantity").onChange(e)
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.quantity = Number(e.target.value);
                    //   setTrade(newTrade);
                    // }}
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
                  <input name="cash" type="number" className={`form-control ${inputValidationString(formik,"cash")}`} placeholder="Sample here..." 
                    {...formik.getFieldProps("cash")}
                    // value={trade.cash} 
                    // onChange={(e)=>{
                    //   formik.getFieldProps("cash").onChange(e)
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.cash = Number(e.target.value);
                    //   setTrade(newTrade);
                    // }}
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
                  <input name="allowableCapitalLoss" type="number" className={`form-control ${inputValidationString(formik,"allowableCapitalLoss")}`} placeholder="Sample here..." 
                    {...formik.getFieldProps("allowableCapitalLoss")}
                    // value={trade.allowableCapitalLoss} 
                    // onChange={(e)=>{
                    //   formik.getFieldProps("allowableCapitalLoss").onChange(e)
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.allowableCapitalLoss = Number(e.target.value);
                    //   setTrade(newTrade);
                    // }}
                    />
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
                  <input name="cashQty" type="number" className={`form-control`} placeholder="Sample here..." 
                    // {...formik.getFieldProps("cashQty")}
                    value={trade.cashQty} 
                    readOnly={true}
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
                  <select name="stoplossType" className={`form-control ${inputValidationString(formik,"stoplossType")}`}
                    {...formik.getFieldProps("stoplossType")}
                    // value={trade.stoplossType} 
                    // onChange={(e)=>{
                    //   formik.getFieldProps("stoplossType").onChange(e)
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.stoplossType = e.target.value;
                    //   setTrade(newTrade);
                    // }}
                  >
                    <option value="">-- SELECT --</option>
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
                  <input name="stoplossPrice" type="number" className={`form-control`} placeholder="Sample here..."
                    // {...formik.getFieldProps("stoplossPrice")}
                    value={Number(trade.stoplossPrice).toFixed(5)}
                    readOnly={true}
                    />
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
                  <select name="takeProfitType" className={`form-control ${inputValidationString(formik,"takeProfitType")}`} 
                    {...formik.getFieldProps("takeProfitType")}
                    // value={trade.takeProfitType} 
                    // onChange={(e)=>{
                    //   formik.getFieldProps("takeProfitType").onChange(e)
                    //   const newTrade = Object.assign(new Trade(), trade);
                    //   newTrade.takeProfitType = e.target.value;
                    //   setTrade(newTrade);
                    // }}
                    >
                      <option value="">-- SELECT --</option>
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
                  <input name="takeProfitPrice" type="number" className={`form-control`} placeholder="Sample here..." 
                    // {...formik.getFieldProps("takeProfitPrice") }
                    value={Number(tradeCalculator.takeProfitPrice).toFixed(5)}
                    readOnly={true}/>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className={`btn btn-primary d-block m-auto ${!formik.isValid ? "disabled" : ""}`} disabled={!formik.isValid}>
                  <i className="bi bi-box-arrow-left"></i> Log Trade 
                </button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
}
/**
 * NOTES:
 *  20220829: replaced controlled fields's datasource as a new Trade Object Instance instead ( former individual field ). 
 *  - Take note of our issue regarding the Object.bind() since we are using getters and setters here.
 * 20220901: FIXED: updates to calculated values were handled in the instantiation of the newTradeCalculator instaed in the onChange of the field.
 * 20221023: Used formik, and adjusted the state[trade] change handling ( for calculation, this is required to be stored in the Trade instance).
 *  - now the recalc/ reassignment is being done every Formik Rerender instead of adding effects on each input onChange.
 * 
 * 
 */
