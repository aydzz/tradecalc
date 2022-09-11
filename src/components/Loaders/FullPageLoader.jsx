import React from 'react'
import OverlayLoader from "./OverlayLoader";

export default function FullPageLoader() {
  return (
    <div className="content-wrapper m-0" style={{height:"100vh"}}>
        
            <div className="w-100 d-flex justify-content-center align-items-center h-100">
                <OverlayLoader type="loading-3"></OverlayLoader>
            </div>
        
    </div>
  )
}
