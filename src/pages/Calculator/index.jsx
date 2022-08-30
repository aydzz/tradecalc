import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TradeForm from './components/TradeForm'
import TradingOverview, { TradingOverviewTable } from './components/TradingOverview'
import MarketOverviewWidget from '../../components/Widget/TradingView/MarketOverviewWidget'
import TradeLogs from './components/TradeLogs'
import Paginator from '../../components/Paginator'
import AdvancedRealTimeChart from '../../components/Widget/TradingView/AdvancedRealTimeChart'
import tradeSettingService from "../../server/service/TradeSettingService";
import userService from "../../server/service/UserService"
import {useAuth} from "../../contexts/AuthContext";
import appLogger from '../../assets/js/AppLogger'
import TradeSetting, { NullTradeSetting } from '../../server/models/TradeSetting'
import Trade, { NullTrade } from '../../server/models/Trade'
import TradeCalculator, { NullTradeCalculator } from '../../assets/js/TradeCalculator'
import OverlayLoader from '../../components/Loaders/OverlayLoader'

export default function CalculatorIndex() {
    /**@type {[Trade, Function]} */
    const [trade, setTrade] = useState(new NullTrade());
    /**@type {[TradeSetting, Function]} */
    const [tradeSettings, setTradeSettings] = useState(new NullTradeSetting());
    /**@type {[TradeCalculator, Function]} */
    const [tradeCalculator, setTradeCalculator] = useState(new NullTradeCalculator());

    const [loading, setLoading] = useState(true);
    const {currentUser} = useAuth();

    //EFFECT: Fetches current User's TradeSettingInstance to use by Calculator Components
    useEffect(function(){
        userService.getBy("uid", currentUser.uid).then(function(results){
            const user = results !== null ? results[0] : null;
            tradeSettingService.getBy("userID", user.id).then(function(results){
                if(results && results.length > 0){
                    setTradeSettings(results[0]);
                    setTradeCalculator(new TradeCalculator(results[0],trade));
                    setLoading(false);
                    
                }
            })
        })
    },[])
  return (
    <div className='content-wrapper'>
      <div className='container-fluid'>
      <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1>Calculator</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Calculator</li>
                </ol>
            </div>
            </div>
        </div>
      </section>
      <div className='row'>
        <div className='col-lg-8 col-md-6 col-12'>
            <div className='card'>
                <div className='card-header border-0'><i className='bi bi-bar-chart-steps'></i> Main Chart</div>
                <div className='card-body m-0 p-0'>
                    <AdvancedRealTimeChart></AdvancedRealTimeChart>
                </div>
            </div>
            
        </div>
        <div className="col-lg-4 col-md-6 col-12">
            <div className='row'>
                <div className="col-12">
                    <div className='card'>
                        <div className='card-header'>
                            <i className='bi bi-calculator'></i> Market Condition
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className="form-group col-xl-6 col-12 mb-3">
                                    <label className='text-sm m-0'>Range</label>
                                    <div className="input-group input-group-sm">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Sample here..." value={Number(tradeSettings.range).toFixed(2)}/>
                                    </div>
                                </div>
                                <div className="form-group col-xl-6 col-12 mb-3">
                                    <label className='text-sm m-0'>Range Multiplier</label>
                                    <div className="input-group input-group-sm">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Sample here..." value={Number(tradeSettings.rangeMultiplier).toFixed(2)}/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-12">
                    <div className="info-box bg-light">
                        <span className="info-box-icon bg-success"><i className="bi bi-wallet2"></i></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Active Funds</span>
                            <span className="info-box-number">$5.00</span>

                            {/* <div className="progress">
                                <div className="progress-bar" style={{"width": "70%"}}></div>
                            </div>
                            <span className="progress-description">
                                70% Increase in 30 Days
                            </span> */}
                        </div>
                        
                    </div>
                </div>
                <div className="col-xl-6 col-12">
                <div className="info-box bg-light">
                <span className="info-box-icon bg-primary"><i className="bi bi-graph-up-arrow"></i></span>
                <div className="info-box-content">
                    <span className="info-box-text">Profit/Loss</span>
                    <span className="info-box-number">$1.00</span>
                    {/* <div className="progress">
                        <div className="progress-bar" style={{"width": "70%"}}></div>
                    </div>
                    <span className="progress-description">
                        70% Increase in 30 Days
                    </span> */}
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="col-lg-5 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-calculator'></i> Trade
                </div>
                <div className='card-body'>
                    {loading ? 
                        (<div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
                            <OverlayLoader type="loading-6"></OverlayLoader>
                        </div>):
                        (
                            <TradeForm 
                            trade={trade} setTrade={setTrade} 
                            tradeSettings={tradeSettings} setTradeSettings={setTradeSettings}
                            tradeCalculator={tradeCalculator} setTradeCalculator={setTradeCalculator}
                            ></TradeForm>
                        )
                    }
                    
                </div>
            </div>
        </div>
        <div className="col-lg-4 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-person-lines-fill'></i> Overview
                </div>
                <div className='card-body table-responsive p-0'>
                    {loading ?
                        (<div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
                        <OverlayLoader type="loading-6"></OverlayLoader>
                        </div>): 
                        (<TradingOverviewTable tradeCalculator={tradeCalculator}></TradingOverviewTable>   )
                    }
                    
                </div>
                <div className='card-footer'><span className='text-xs float-right text-secondary'>{new Date().toLocaleDateString()}</span></div>
            </div>
        </div>
        <div className='col-lg-3 col-12'>
          <div className='card'>
            <div className='card-header border-0'>Market Overview</div>
            <div className='card-body p-0 m-0'>
              <MarketOverviewWidget></MarketOverviewWidget>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-clipboard2-data'></i> Logs
                </div>
                <div className='card-body p-0 m-0 mb-2'>
                    <TradeLogs></TradeLogs>
                </div>
                <div className='card-footer'>
                     <Paginator></Paginator>
                </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}
