import { useState } from "react";
import OutsideClickObs from "../../Special/OutsideClickObs";
export default function NotificationMenu(props){
    const[shown, setShown] = useState(false);
    return(
        <OutsideClickObs outsideClickHandler={() => {
            setShown(false);
        }}>
            <li className={"nav-item dropdown " + (shown ? "show" :"")} onClick={()=>{
                setShown(!shown)
            }}>
                <a className="nav-link" data-toggle="dropdown" href="#">
                    <i className="bi bi-bell"></i>
                    <span className="badge badge-warning navbar-badge">0</span>
                </a>
                <NotificationDropdown isShown={shown} data={props.data}></NotificationDropdown>
            </li>
        </OutsideClickObs>
    )
}

function NotificationDropdown(props){
    return(
        <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-right " + (props.isShown ? "show" : "")}>
            <span className="dropdown-header">0 new notifications</span>
            {/* <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
                <i className="bi bi-envelope mr-2"></i> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
                <i className="bi bi-person mr-2"></i> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
                <i className="bi bi-file-earmark mr-2"></i> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
            </a> */}
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
    )
}