import React from 'react'
import { Link } from 'react-router-dom'

export default function SettingsIndex() {
  return (
    <div className='content-wrapper'>
      <div className='container-fluid'>
      <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1>Settings</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Settings</li>
                </ol>
            </div>
            </div>
        </div>
      </section>
      </div>
    </div>
  )
}
