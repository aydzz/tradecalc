import React, { useEffect, useState } from 'react'
import TradeSetting, {NullTradeSetting} from '../../../server/models/TradeSetting'
import tradeSettingService from '../../../server/service/TradeSettingService';
import userService from '../../../server/service/UserService';
import {Toast} from "../../../assets/theme/utils/swal"
import { useAuth } from '../../../contexts/AuthContext';
import User from '../../../server/models/User';
import OverlayLoader from '../../../components/Loaders/OverlayLoader';

export default function TradingForm(props) {
    /**@type {[TradeSetting, Function]} */
    const [tradeSetting, setTradeSetting] = useState(new NullTradeSetting());
    
    /**@type {[User, Function]} */
    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);
    const {currentUser} = useAuth();
    /**EFFECT: Fetch User Setting and User Detail */
    useEffect(function(){
        userService.getBy("uid",currentUser.uid).then(function(res){
            if(!res){
                console.error("APP: User was not found.");
            }else{
                if(res.length > 1){
                    console.error("APP: Multiple user was found.");   
                }else{
                    //all good
                    const user = res[0];
                    setUser(user);
                    tradeSettingService.getBy("userID",user.id).then(function(res){
                        if(!res){
                            console.warn("APP: No settings for the current user yet");
                        }else{
                            if(res.length > 1){
                                console.warn("APP Multiple settings found for current user.");
                            }else{
                                const setting = res[0];
                                setting.userID = user.id;
                                tradeSetting.id = setting.id;
                                setTradeSetting(setting);
                            }
                        }
                        
                        setLoading(false);
                    })
                }
            }
        })
        
    },[])    
    const submitHandler = function(e){
        e.preventDefault();
        tradeSetting.userID = user.id;
        tradeSettingService.save(tradeSetting).then(function(res){
            Toast.fire({
                title: "Settings Updated",
                icon: "success"
            })
        }).catch(function(e){
            Toast.fire({
                title: "Error",
                text: "There was an error updating your settings",
                icon: "error"
            })
        })
    }

    if(loading){
        return(
            <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
                <OverlayLoader type="loading-6"/> 
            </div>
        )
    }
  return (
    <form className="form-horizontal"
        onSubmit={submitHandler}
    >
        <h5 className="lead mb-3">ACCOUNT/PLATFORM PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
        <hr></hr>
        
        <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">Portfolio Value</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter current Portfolio Value" 
                value={tradeSetting.portfolioValue} 
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.portfolioValue = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }}
            />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">Trade Capital</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter current Trade Capital" 
                value={tradeSetting.tradeCapital} 
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.tradeCapital = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }}    
            />
            </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Trade-Portfolio Capital</label>
          <div className='col-sm-10'>
            <div className="input-group input-group">
                <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="bi bi-calculator"></i>
                </span>
                </div>
                <input type="number" className="form-control" placeholder="Unable to calculate value." value={Number(tradeSetting.tradePortCapital).toFixed(2)} disabled/>
            </div>
          </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Leverage</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter Leverage" 
                value={tradeSetting.leverage}
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.leverage = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }}    
            />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Range</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter current Market Range" 
                value={tradeSetting.range}
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.range = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }}    
            />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Range Multiplier</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter your Range Multiplier" 
                value={tradeSetting.rangeMultiplier}
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.rangeMultiplier = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }} 
            />
            </div>
        </div>
        
        <h5 className="lead mb-3 mt-4">GENERAL RISK MANAGEMENT PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
        <hr></hr>

        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Risk Scope</label>
            <div className="col-sm-10">
            <select className='form-control' 
                value={tradeSetting.riskScope}
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.riskScope = e.target.value;
                    setTradeSetting(newTradeSetting);
                }} 
            >
                <option value="portfolio">PORTFOLIO</option>
                <option value="capital">CAPITAL</option>
            </select>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Risk Deviation %</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter Risk Deviation %" 
                value={tradeSetting.riskDeviationPercent}
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.riskDeviationPercent = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }} 
            />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Acceptable Spread</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter Acceptable Spread" 
                value={tradeSetting.acceptableSpread} 
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.acceptableSpread = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }}     
            />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Minimum Spread</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter Minimum Spread" 
                value={tradeSetting.minSpread} 
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.minSpread = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }} 
            />
            </div>
        </div>
        
        <h5 className="lead mb-3 mt-4">RISK PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
        <hr></hr>

        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Portfolio Risk Trading Threshold</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter Portfolio Risk Trading Threshold" 
                value={tradeSetting.portRiskTradingThreshold} 
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.portRiskTradingThreshold = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }} 
            />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Capital Risk Trading Threshold</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter Capital Risk Trading Threshold" 
                value={tradeSetting.capRiskTradingThreshold} 
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.capRiskTradingThreshold = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }} 
            />
            </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Capital-Portfolio Risk %</label>
          <div className='col-sm-10'>
            <div className="input-group input-group">
                <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="bi bi-calculator"></i>
                </span>
                </div>
                <input type="number" className="form-control" placeholder="Unable to calculate value." value={Number(tradeSetting.capPortRiskPercent).toFixed(2)} disabled/>
            </div>
          </div>
        </div>
        <h5 className="lead mb-3 mt-4">REWARD PARAMETERS <i className='float-right p-1 bi bi-gear'></i></h5>
        <hr></hr>

        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Risk to Reward Multiplier</label>
            <div className="col-sm-10">
            <input type="number" className="form-control" placeholder="Enter Risk to Reward Multiplier" 
                value={tradeSetting.riskRewardMultiplier} 
                onChange={(e)=>{
                    const newTradeSetting = Object.assign(new TradeSetting(), tradeSetting);
                    newTradeSetting.riskRewardMultiplier = Number(e.target.value);
                    setTradeSetting(newTradeSetting);
                }} 
            />
            </div>
        </div>
        <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-danger">Update Settings</button>
            </div>
        </div>
    </form>
  )
}
