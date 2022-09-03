import React from 'react'
import { useRef } from 'react';

export default function ExitTradeForm() {
    const tpHit = useRef();
    const slHit = useRef();
    const exitOrder = useRef();
    const exitOrderText = useRef();

    const exitSelectionInitState = function(){
      
        exitOrder.current.disabled = false;
        slHit.current.disabled = false;
        tpHit.current.disabled = false

        exitOrderText.current.disabled = true
    }
    const exitSelectionHandler = function(e){
        if(e.currentTarget === tpHit.current){
            if(tpHit.current.checked){
                exitOrder.current.checked = false;
                exitOrder.current.disabled = true;
                slHit.current.checked = false;
                slHit.current.disabled = true;
    
                exitOrderText.current.disabled = true
            }else{
                exitSelectionInitState();
            }
        }else if(e.currentTarget === slHit.current){
            if(slHit.current.checked){
                tpHit.current.checked = false;
                tpHit.current.disabled = true;
                exitOrder.current.checked = false;
                exitOrder.current.disabled = true;
    
                exitOrderText.current.disabled = true
            }else{
                exitSelectionInitState();
            }
        }else{
            if(exitOrder.current.checked){
                tpHit.current.checked = false;
                tpHit.current.disabled = true;
                slHit.current.checked = false;
                slHit.current.disabled = true;
    
                exitOrderText.current.disabled = false
            }else{
                exitSelectionInitState();
            }
        }
        
        
        
    }

  return (
    <form>
        <div className="form-group col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                    ref={tpHit}
                    onClick={exitSelectionHandler}/>
                <label class="form-check-label">Take Profit Hit</label>
            </div>
        </div>
        <div className="form-group col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                    ref={slHit}
                    onClick={exitSelectionHandler}/>
                <label class="form-check-label">Stoploss Hit</label>
            </div>
        </div>
        <div className="form-group col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                    ref={exitOrder} 
                    onClick={exitSelectionHandler}/>
                <label class="form-check-label">Exit Order</label>
            </div>
        </div>
        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Exit Price</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Trade Exit Price..." disabled
                value={Number(0).toFixed(2)}  
                ref={exitOrderText}
                />
          </div>
        </div>

        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Account Closing</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Enter trade value here..." />
          </div>
        </div>

        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Profit Loss</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-graph-up-arrow"></i>
              </span>
            </div>
            <input type="number" className="form-control" placeholder="Enter actual trade PnL here..." />
          </div>
        </div>

        <div className="form-group col-12 mb-3">
          <label className="text-sm m-0">Remarks</label>
          <div className="input-group input-group-sm">
          <textarea class="form-control" rows="3" placeholder="Trade Remarks..."></textarea>
          </div>
        </div>

    </form>
  )
}
