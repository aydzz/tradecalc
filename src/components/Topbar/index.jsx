import { useState } from "react";
import { Link} from "react-router-dom";
import profile from "../../assets/img/user1-128x128.jpg"

import MessageMenu from "./components/MessageMenu";
import NotificationMenu from "./components/NotificationMenu";
import ProfileMenu from "./components/ProfileMenu";
import {useTheme} from "../../contexts/ThemeContext";

export default function Topbar(props) {
    const theme = useTheme();
    const sampleMessageData = {
      senderProfile: profile,
      senderName: "Edward Elric",
      message: "Got the Philosopher's stone...",
      dateSent: new Date().toLocaleDateString(),
    };
    return (
      <nav className={`main-header navbar navbar-expand ${theme.darkMode ? "navbar-dark navbar-dark": "navbar-white navbar-light"}`}>
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item" onClick={()=>{
            props.sidebarToggleHandler()
          }} id="sidebar-toggler">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="bi bi-list"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
        </ul>
  
        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
          {/* <!-- Navbar Search --> */}
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="bi bi-search"></i>
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="bi bi-search"></i>
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
  
          {/* <!-- Messages Dropdown Menu --> */}
          <MessageMenu data={sampleMessageData}></MessageMenu>
          {/* <!-- Notifications Dropdown Menu --> */}
          <NotificationMenu data={{}}></NotificationMenu>
          {/* <!-- Profile Dropdown --> */}
          <ProfileMenu></ProfileMenu>
          <li className="nav-item" onClick={()=>{props.cSidebarToggleHandler()}}>
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
              <i className="bi bi-grid-1x2"></i>
            </a>
          </li>
        </ul>
      </nav>
    );
  }