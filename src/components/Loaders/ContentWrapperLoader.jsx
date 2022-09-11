import React from 'react'
import OverlayLoader from "./OverlayLoader";

export default function ContentWrapperLoader() {
  return (
    <div className="content-wrapper" style={{height: "calc(100vh - calc(3.5rem + 1px) - calc(3.5rem + 1px))"}}>
        <div className="w-100 d-flex justify-content-center align-items-center h-100">
            <OverlayLoader type="loading-3"></OverlayLoader>
        </div>
    </div>
  )
}
