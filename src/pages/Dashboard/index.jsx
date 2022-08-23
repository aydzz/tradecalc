import React from 'react'
import { Link } from 'react-router-dom'
import MarketOverviewWidget from '../../components/Widget/TradingView/MarketOverviewWidget'

export default function DashboardIndex() {
  return (
    <div className='content-wrapper'>
      <div className='container-fluid'>
      <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1>Dashboard</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
                </ol>
            </div>
            </div>
        </div>
      </section>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='card'>
            <div className='card-header border-0'>Market Overview</div>
            <div className='card-body p-0 m-0'>
              <MarketOverviewWidget></MarketOverviewWidget>
            </div>
          </div>
        </div>
        <div className='col-lg-3'>
          <div className='card'>
            <div className='card-header'>Card Title</div>
            <div className='card-body'>
              
            </div>
          </div>
        </div>
        <div className='col-lg-3'>
          <div className='card'>
            <div className='card-header'>Card Title</div>
            <div className='card-body'>
              
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  )
}

