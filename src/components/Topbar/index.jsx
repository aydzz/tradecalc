import { useState } from "react";
import { Link} from "react-router-dom";

import MessageMenu from "./components/MessageMenu";
import profile from "../../assets/img/user1-128x128.jpg"
import NotificationMenu from "./components/NotificationMenu";
import ProfileMenu from "./components/ProfileMenu";

export default function Topbar(props) {
    const sampleMessageData = {
      senderProfile: profile,
      senderName: "Edward Elric",
      message: "Got the Philosopher's stone...",
      dateSent: new Date().toLocaleDateString(),
    };
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
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
            <Link to="/app" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/app/post" className="nav-link">
              Post
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
        </ul>
      </nav>
    );
  }