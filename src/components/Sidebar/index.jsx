import React from 'react';
import logo from '../../logo-dark.svg';
import { NavLink } from 'react-router-dom';

import {PillGroup} from './components/PillGroup';
import {useAuth} from "../../contexts/AuthContext"
import { useTheme } from '../../contexts/ThemeContext';

export default function Sidebar(props){
    const theme = useTheme();
    const authenticatedUser = useAuth()["currentUser"];
    const currentUser = authenticatedUser ?? props.user;
    return(
        <aside className={`main-sidebar elevation-4 ${theme.darkMode ? "sidebar-dark-primary" : "sidebar-light-primary"} transition-normal`}>
            <a href="/home" className="brand-link bg-light align-align-items-center justify-content-center">
                <img src={logo} alt="site-logo" className="brand-image img-circle bg-light elevation-1 p-1"/>
                <span className="brand-text font-weight-light">trading<strong>assistant</strong></span>
            </a>
            <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                <img id="sidebar-user-profile" 
                    src={currentUser.photoURL ?? "https://avatars.dicebear.com/api/identicon/" + (currentUser ? (currentUser["uid"] + ".svg") : "nouserfound.svg")} 
                    className="img-circle elevation-2 p-1" 
                    alt="User Image"/>
                </div>
                <div className="info">
                <a id="sidebar-user-name" href="#" className="d-inline-block text-sm" style={{whiteSpace:"pre-line"}}>{(currentUser["displayName"] ? currentUser["displayName"]  : currentUser["email"] )}</a>
                </div>
            </div>
            <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" disabled/>
                <div className="input-group-append">
                    <button className="btn btn-sidebar" disabled>
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
                
                <li className="nav-item">
                    <NavLink to="/app/calculator" className="nav-link">
                        <i className="nav-icon bi bi-calculator"></i>
                        <p>Calculator<span className="right badge badge-danger">HOT</span>
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/app/account" className="nav-link">
                        <i className="nav-icon bi bi-person-lines-fill"></i>
                        <p>Account</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/app/journal" className="nav-link">
                        <i className="nav-icon bi bi-journal"></i>
                        <p>Journal</p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/app/tradelogs" className="nav-link">
                        <i className="nav-icon bi bi-clock-history"></i>
                        <p>Logs</p>
                    </NavLink>
                </li>
                <li className="nav-header">MISCELLANEOUS</li>
                <li className="nav-item">
                    <NavLink to="/app/integrations" className="nav-link">
                        <i className="nav-icon bi bi-person"></i>
                        <p>Others</p>
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