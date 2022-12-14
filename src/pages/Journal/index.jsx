import React from 'react'
import { Link } from 'react-router-dom'

export default function JournalIndex() {
  return (
    <div className='content-wrapper'>
      <div className='container-fluid'>
      <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1>Journal</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Journal</li>
                </ol>
            </div>
            </div>
        </div>
      </section>
      </div>
    </div>
  )
}
