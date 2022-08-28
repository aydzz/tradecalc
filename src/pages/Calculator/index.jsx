import React from 'react'
import { Link } from 'react-router-dom'
import TradeForm from './components/TradeForm'
import TradingOverview from './components/TradingOverview'
import MarketOverviewWidget from '../../components/Widget/TradingView/MarketOverviewWidget'
import TradeLogs from './components/TradeLogs'
import Paginator from '../../components/Paginator'

export default function CalculatorIndex() {
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
      <div className="col-lg-5 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-calculator'></i> Trade
                </div>
                <div className='card-body'>
                    <TradeForm></TradeForm>
                </div>
            </div>
        </div>
        <div className="col-lg-4 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-person-lines-fill'></i> Overview
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className="col-6">
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
                        <div className="col-6">
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
                        
                        <div className='col-12'>
                            <TradingOverview></TradingOverview>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='col-lg-3'>
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
