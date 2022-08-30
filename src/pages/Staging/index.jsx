import React from 'react'
import { Link } from 'react-router-dom'
import OverlayLoader from '../../components/Loaders/OverlayLoader'

export default function StagingIndex() {
  return (
    <div className='content-wrapper'>
      <div className='container-fluid'>
      <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1>Staging</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Staging</li>
                </ol>
            </div>
            </div>
        </div>
      </section>
      <div className='container-fluid'>
        <div className='card'>
            <div className='card-header'>
                Loaders
            </div>
            <div className='card-body'>
                <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                <OverlayLoader type="loading-10"></OverlayLoader>
                </div>
            
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}
