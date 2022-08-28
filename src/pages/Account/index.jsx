import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Callout from '../../components/Callouts';
import {useAuth} from "../../contexts/AuthContext"
import AccountForm from './components/AccountForm';
import TradingForm from './components/TradingForm';

export default function AccountIndex() {
  const {currentUser} = useAuth();
  const [tab, setTab] = useState(2);
  const [settingsTab, setSettingsTab] = useState(0);
  return (
    <div className='content-wrapper'>
      <div className='container-fluid'>
      <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
            <div className="col-sm-6">
                <h1>Account</h1>
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
      <div className='row'> 
        <div className='col-lg-2 col-md-4 col-12'>
        <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle" 
                    src={currentUser.photoURL ?? "https://avatars.dicebear.com/api/identicon/" + (currentUser ? (currentUser["uid"] + ".svg") : "nouserfound.svg")} 
                    alt="User profile picture"/>
                </div>
                <h3 className="profile-username text-center">{(currentUser["displayName"] ? currentUser["displayName"]  : currentUser["email"] )}</h3>
                <p className="text-muted text-center">Applicaton User</p>
              </div>
            
            </div>
        </div>
        <div className='col-lg-10 col-md-8 col-12'>
        <div className="card">
              <div className="card-header p-2">
                <ul className="nav nav-pills">
                  <li className="nav-item"onClick={()=>setTab(0)}>
                    <a className={"nav-link " + (tab === 0 ? "active" : "")} href="#activity" data-toggle="tab">Activity</a>
                  </li>
                  <li className="nav-item"onClick={()=>setTab(1)}>
                    <a className={"nav-link " + (tab === 1 ? "active" : "")} href="#timeline" data-toggle="tab">Timeline</a>
                  </li>
                  <li className="nav-item" onClick={()=>setTab(2)}>
                    <a className={"nav-link " + (tab === 2 ? "active" : "")} href="#settings" data-toggle="tab">Settings</a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div className={"tab-pane tra-activity-tab " + (tab === 0 ? "active" : "")}>
                    <p className="lead">Activity</p>
                  </div>
                  <div className={"tab-pane tra-timeline-tab " + (tab === 1 ? "active" : "")}>
                    <p className="lead">Timeline</p>
                  </div>
                  <div className={"tab-pane tra-settings-tab " + (tab === 2 ? "active" : "")}>
                    <div className="row">
                      <div className="col-7 col-sm-9">
                        {/* SETTINGS VERTICAL TAB CONTENTS */}
                        <div className="tab-content" id="vert-tabs-right-tabContent">
                          <div className={"tab-pane fade " + (settingsTab=== 0 ? "active show" : "")} id="vert-tabs-right-account" role="tabpanel" aria-labelledby="vert-tabs-right-account-tab">
                            <Callout variant="info" title="Notice" text="This feature is currently  under development."></Callout>
                            <AccountForm></AccountForm>
                          </div>
                          <div className={"tab-pane fade " + (settingsTab=== 1 ? "active show" : "")} id="vert-tabs-right-trading" role="tabpanel" aria-labelledby="vert-tabs-right-trading-tab">
                            <TradingForm></TradingForm>
                          </div>
                        </div>
                      </div>
                      <div className="col-5 col-sm-3">
                        <div className="nav flex-column nav-tabs nav-tabs-right h-100" id="vert-tabs-right-tab" role="tablist" aria-orientation="vertical">
                          <a  className={"nav-link " + (settingsTab === 0 ? "active" : "")} 
                              href="#vert-tabs-right-account" 
                              role="tab" 
                              aria-controls="vert-tabs-right-account" 
                              onClick={()=> setSettingsTab(0)}
                            >Account</a>
                          <a  className={"nav-link " + (settingsTab === 1 ? "active" : "")}
                              href="#vert-tabs-right-trading" 
                              role="tab" 
                              aria-controls="vert-tabs-right-trading"
                              onClick={()=> setSettingsTab(1)}
                            >Trading</a>
                        </div>
                      </div>
                    </div>
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
