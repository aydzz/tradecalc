import React from 'react'
import { Link } from 'react-router-dom'

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
        <div className="col-lg-6 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-person-lines-fill'></i> Account
                </div>
                <div className='card-body'>

                </div>
            </div>
        </div>
        <div className="col-lg-6 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-calculator'></i> Calculator
                </div>
                <div className='card-body'>

                </div>
            </div>
        </div>
        <div className="col-lg-12 col-12">
            <div className='card'>
                <div className='card-header'>
                    <i className='bi bi-clipboard2-data'></i> Analyzer
                </div>
                <div className='card-body'>

                </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}
