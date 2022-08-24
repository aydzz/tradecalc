import { useState } from "react";
import OutsideClickObs from "../../Special/OutsideClickObs";
import { signOut } from "firebase/auth";
import firebase from "../../../server/firebase";
import { Toast } from "../../../assets/theme/utils/swal";

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
            signOut(firebase.auth).then(function (result) {
              Toast.fire({
                icon: "success",
                title: "Logged out successfully",
              });
              console.log(e);
            }).catch(function(error){
              Toast.fire({
                icon: "error",
                title: "Error occurred while logging out."
              })
              console.log(error);
            })
          }}
        >
          <i className="bi bi-box-arrow-right mr-2"></i> Logout
        </a>
      </div>
  );
}
