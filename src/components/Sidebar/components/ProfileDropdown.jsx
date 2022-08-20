import React from 'react'

export default function ProfileDropdown(props) {
    if(props.isAuthenticated){
        return(
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="side-navprofile-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={`https://avatars.dicebear.com/api/identicon/${props.username}.svg`} alt="user profile" width="32" height="32" className="rounded-circle bg-white me-2"/>
                    <strong>{props.username}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="side-navprofile-dropdown">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="https://c1hcu128.caspio.com/folderlogout">Sign out</a></li>
                </ul>
            </div>
        );
    }else{
        return(
            <div>
                <a href="#" className="d-flex align-items-center text-white text-decoration-none" id="side-navprofile-dropdown-anon">
                    <img src={"https://avatars.dicebear.com/api/identicon/em%20oute.svg"} alt="user profile" width="32" height="32" className="rounded-circle bg-white me-2"/>
                    <strong>Anonymous</strong>
                </a>
            </div>
        )
    }
}
