import React from 'react'
import TradeCalculator from '../../../assets/js/TradeCalculator'

export default function TradingOverview(props) {
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

export function TradingOverviewTable(props){
    /**@type {TradeCalculator} */
    const tradeCalculator = props.tradeCalculator;
    console.log(tradeCalculator);
    return(
        <table class="table table-hover table-sm">
            <thead>
            <tr>
                <th style={{width: "10px"}}>#</th>
                <th>Name</th>
                <th>Value</th>
                <th style={{width: "15px"}}></th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-xs">
                <td>1.</td>
                <td>Profit Loss</td>
                <td><span>{Number(tradeCalculator.profitLoss).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>2.</td>
                <td>Spread</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.spread).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>3.</td>
                <td>Order-SL Spread</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.orderSLSpread).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>4.</td>
                <td>Capital Committed</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.capitalCommited).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>5.</td>
                <td>Notional Value</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.trade.notionalValue).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>6.</td>
                <td>Order-Spread Compliance</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.orderSpreadCompliance).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>7.</td>
                <td>Order-Risk Compliance</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.orderRiskCompliance).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>8.</td>
                <td>Quantity</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.trade.calculatedQuantity).toFixed(5)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>9.</td>
                <td>Risk Scope</td>
                <td style={{width: "40px"}}><span class="badge bg-success text-capitalize">{String(tradeCalculator.tradeSetting.riskScope)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>10.</td>
                <td>Portfolio Risk Tolerance</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.portfolioRiskTolerance).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>11.</td>
                <td>Portfolio Consumption %</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.portfolioConsumptionPercent).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>12.</td>
                <td>Capital Risk Tolerance</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.capitalRiskTolerance).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            <tr class="text-xs">
                <td>13.</td>
                <td>Capital Consumption %</td>
                <td style={{width: "40px"}}><span >{Number(tradeCalculator.capitalConsumptionPercent).toFixed(2)}</span></td>
                <td><i class="bi bi-cone-striped text-danger"></i></td>
            </tr>
            </tbody>
        </table>
    )
}
