import React from 'react';
import logo from '../../logo.svg'
import { NavLink } from 'react-router-dom';

import {PillGroup} from './components/PillGroup';

export default function Sidebar(props){
    const currentUser = props.user;
    return(
        <aside className="main-sidebar elevation-4 sidebar-light-primary transition-normal">
            <a href="/home" className="brand-link bg-light align-align-items-center justify-content-center">
                <img src={logo} alt="site-logo" className="brand-image img-circle p-1 bg-light elevation-1"/>
                <span className="brand-text font-weight-light">adzz<strong></strong></span>
            </a>
            <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                <img id="sidebar-user-profile" src={"https://avatars.dicebear.com/api/identicon/" + (currentUser["uid"] + ".svg")} className="img-circle elevation-2 p-1" alt="User Image"/>
                </div>
                <div className="info">
                <a id="sidebar-user-name" href="#" className="d-inline-block" style={{whiteSpace:"pre-line"}}>{(currentUser["displayName"])}</a>
                </div>
            </div>
            <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                    <i className="bi bi-search"></i>
                    </button>
                </div>
                </div>
            </div>
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                <NavLink to="/app/dashboard" className="nav-link">
                    <i className="nav-icon bi bi-speedometer"></i>
                    <p>Dashboard</p>
                </NavLink>
                </li>
                <PillGroup label="Messages" matcher={(new RegExp(`(/app/messages/.+)|(/app/inbox)`,"gi"))} iconElement={<i className='bi bi-envelope'></i>}>
                    <li className="nav-item" onClick={(e)=>{e.stopPropagation()}}>
                        <NavLink to="/app/inbox" className="nav-link">
                            <i className="nav-icon bi bi-envelope-paper"></i>
                            <p>Inbox</p>
                        </NavLink>
                    </li>
                    <li className="nav-item" onClick={(e)=>{e.stopPropagation()}}>
                        <NavLink to="/app/messages/view" className="nav-link">
                            <i className="nav-icon bi bi-envelope-paper"></i>
                            <p>View Message</p>
                        </NavLink>
                    </li>
                    <li className="nav-item" onClick={(e)=>{e.stopPropagation()}}>
                        <NavLink to="/app/messages/create" className="nav-link">
                            <i className="nav-icon bi bi-envelope-plus"></i>
                            <p>Create message</p>
                        </NavLink>
                    </li>
                </PillGroup>
                <li className="nav-header mt-2">IN DEVELOPMENT</li>
                <li className="nav-item">
                    <NavLink to="/app/features" className="nav-link">
                        <i className="nav-icon bi bi-menu-app"></i>
                        <p>Features<span className="right badge badge-danger">HOT</span>
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/app/collection" className="nav-link">
                        <i className="nav-icon bi bi-grid-1x2"></i>
                        <p>Collection</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/app/integrations" className="nav-link">
                        <i className="nav-icon bi bi-menu-app"></i>
                        <p>Integrations</p>
                    </NavLink>
                </li>

                <li className="nav-header mt-2">MODULES</li>
                <li className="nav-item">
                    <NavLink to="/app/post" className="nav-link">
                        <i className="nav-icon bi bi-stickies-fill"></i>
                        <p>Posts</p>
                    </NavLink>
                </li>
                </ul>
            </nav>
            </div>
        </aside>
    )
}

Sidebar.defaultProps = {
    user: {
        uid: "johndoe123",
        displayName: "John  Doe",
        email: "johndoe@mailinator.com"

    }
}