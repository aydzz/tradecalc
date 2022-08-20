import { useState } from "react"
import { Link } from "react-router-dom";

export function ItemDropdown(props){
    const [shown, setShown] = useState(false);

    function handleClick(){
        setShown(!shown);
    }
    return(
        <li className="nav-item dropdown" onClick={handleClick}>
            <a id="testSubMenu" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded={shown} className="nav-link dropdown-toggle">Tests</a>
            <ul aria-labelledby="testSubMenu" className={"dropdown-menu border-0 shadow" + (shown ? " show" : "")}>
            <li className="dropdown-submenu dropdown-hover">
                <Link id="dropdownSubMenu2" to="/adzzdev/miniapp" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Mini Apps</Link>
                <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>
                    <Link tabIndex="-1" to="/adzzdev/miniapp/ticktacktoe" className="dropdown-item">Ticktaktoe</Link>
                </li>
                <li><Link to="/adzzdev/miniapp/battleship" className="dropdown-item">Battleship</Link></li>
                </ul>
            </li>
            <li className="dropdown-divider"></li>
            <li><Link to="/adzzdev/react" className="dropdown-item">React Concepts</Link></li>
            <li className="dropdown-divider"></li>
            <li className="dropdown-submenu dropdown-hover">
                <a id="dropdownSubMenu2" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Hover for action</a>
                <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                <li>
                    <a tabIndex="-1" href="#" className="dropdown-item">level 2</a>
                </li>
                <li className="dropdown-submenu">
                    <a id="dropdownSubMenu3" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">level 2</a>
                    <ul aria-labelledby="dropdownSubMenu3" className="dropdown-menu border-0 shadow">
                    <li><a href="#" className="dropdown-item">3rd level</a></li>
                    <li><a href="#" className="dropdown-item">3rd level</a></li>
                    </ul>
                </li>
        

                <li><a href="#" className="dropdown-item">level 2</a></li>
                <li><a href="#" className="dropdown-item">level 2</a></li>
                </ul>
            </li>
            </ul>
        </li>
  )
}