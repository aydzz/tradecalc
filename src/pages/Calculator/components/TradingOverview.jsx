import React from 'react'

export default function TradingOverview() {
  return (
  <div className='row'>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Profit Loss</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
        <label className='text-sm m-0'>Spread</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Order-SL Spread</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Capital Committed</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Notional Value</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Order-Spread Compliance</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Order-Risk Compliance</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Quantity</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <hr></hr>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Risk Scope</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Portfolio Risk Tolerance</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Portfolio Consumption %</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Spread</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..."/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Capital Risk Tolerance</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
      <div className="form-group col-lg-6 col-12 mb-3">
          <label className='text-sm m-0'>Capital Consumption %</label>
          <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-graph-up-arrow"></i></span>
              </div>
              <input type="text" className="form-control disabled" placeholder="Sample here..." value={""}/>
          </div>
      </div>
  </div>
  )
}
