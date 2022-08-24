import { useState } from "react";
import OutsideClickObs from "../../Special/OutsideClickObs";

export default function MessageMenu(props) {
 const[shown, setShown] = useState(false);

  return (
    <OutsideClickObs outsideClickHandler={() => {
        setShown(false);
    }}>
    <li className={"nav-item dropdown " + (shown ? "show":"")} onClick={()=>{
        setShown(!shown);
    }}>
      
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="bi bi-chat"></i>
        <span className="badge badge-danger navbar-badge">0</span>
      </a>
      <MessageDropdown isShown={shown} data={props.data}></MessageDropdown>
    </li>
    </OutsideClickObs>
  );
}

function MessageDropdown(props) {
  return (
    <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-right transition-fast " + (props.isShown ? "show" : "")}>
        <span class="dropdown-header">0 new messages</span>
        {/* <MessageItem data={props.data}></MessageItem>
        <div className="dropdown-divider"></div>
        <MessageItem data={props.data}></MessageItem>
        <div className="dropdown-divider"></div>
        <MessageItem data={props.data}></MessageItem>
        <div className="dropdown-divider"></div>
        <MessageItem data={props.data}></MessageItem>
        <div className="dropdown-divider"></div> */}
      <div className="dropdown-divider"></div>
      <a href="#" className="dropdown-item dropdown-footer">
        See All Messages
      </a>
    </div>
  );
}

function MessageItem(props){
    return(
        <a href="#" className="dropdown-item">
            <div className="media">
            <img src={props.data.senderProfile} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
            <div className="media-body">
                <h3 className="dropdown-item-title">
                    {props.data.senderName}
                <span className="float-right text-sm text-danger">
                    <i className="bi bi-star"></i>
                </span>
                </h3>
                <p className="text-sm">{props.data.message}</p>
                <p className="text-sm text-muted">
                <i className="bi bi-clock mr-1"></i>{props.data.dateSent}
                </p>
            </div>
            </div>
        </a>
    )
}
