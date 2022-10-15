import React from 'react'
import { Link } from 'react-router-dom'
import OverlayLoader from '../../components/Loaders/OverlayLoader'
import {Form01,Form02,Form03,Form04,Form05} from './components/Formik/Forms'
import SampleModalDemo from './components/SampleModal'
import SampleTransition from './components/SampleTransition'
import TransitionComponent from './components/SampleTransition2'


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
        <div className='row'>
        <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
              <i className="bi bi-app"></i> Formik Form 5
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <Form05></Form05>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
              <i className="bi bi-app"></i> Formik Form 4
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <Form04></Form04>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
              <i className="bi bi-app"></i> Formik Form 3
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <Form03></Form03>
                  </div>
              </div>
            </div>
          </div>
          
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
              <i className="bi bi-app"></i> Formik Form 2
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <Form02></Form02>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
              <i className="bi bi-app"></i> Formik Form 1
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <Form01></Form01>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
                  <i className="bi bi-app"></i> Loaders
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                  <OverlayLoader type="loading-10"></OverlayLoader>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
                  <i className="bi bi-app"></i> Restart Modal
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <SampleModalDemo></SampleModalDemo>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
                <i className="bi bi-app"></i> Transtion 1
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <SampleTransition></SampleTransition>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
              <i className="bi bi-app"></i> Transtion 2
              </div>
              <div className='card-body'>
                  <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                    <TransitionComponent></TransitionComponent>
                  </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
      </div>
    </div>
  )
}
