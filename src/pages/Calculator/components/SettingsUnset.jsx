import React from 'react'
import { Link } from 'react-router-dom'

export default function SettingsUnset() {
  return (
    <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
        {/* <h1 className='d-block'><i className='bi bi-cone-striped'></i></h1> */}
        <p className='p-0 m-0'><Link to="../account">Account</Link> trade settings are <span className='text-danger'>required.</span></p>
    </div>
  )
}
