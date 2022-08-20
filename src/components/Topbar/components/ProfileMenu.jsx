import { useState } from "react";
import OutsideClickObs from "../../Special/OutsideClickObs";

export default function ProfileMenu() {
  const [shown, setShown] = useState(false);

  return (
    <OutsideClickObs outsideClickHandler={() => {
        setShown(false);
    }}>
    <li
      className={"nav-item dropdown " + (shown ? "show" : "")}
      onClick={() => {
        setShown(!shown);
      }}
    >
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="bi bi-person"></i>
      </a>
      <ProfileDropdown isShown={shown}></ProfileDropdown>
    </li>
    </OutsideClickObs>
  );
}

function ProfileDropdown(props) {
  return (
      <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-right " + (props.isShown ? "show" : "")}>
        <a href="#" className="dropdown-item">
          <i className="bi bi-person mr-2"></i> View Profile
        </a>
        <div className="dropdown-divider"></div>
        <a href="#" className="dropdown-item">
          <i className="bi bi-gear mr-2"></i> Settings
        </a>
        <div className="dropdown-divider"></div>
        <a
          href="#"
          className="dropdown-item"
          onClick={(e) => {
            //logout logic here...
          }}
        >
          <i className="bi bi-box-arrow-right mr-2"></i> Logout
        </a>
      </div>
  );
}
