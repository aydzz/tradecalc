import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
export function PillGroup(props){
    const [isOpen, setIsOpen] = useState(false);
    const [inLocation, setInLocation] = useState(false);
    const location = useLocation();
    const matcher = props.matcher;

    useEffect(function(e){
        if(location.pathname.match(matcher)){
            setInLocation(true)
        }else{
            setInLocation(false);
        }
    })
    return(
        <li className={"nav-item ".concat((isOpen ? " menu-is-opening menu-open": ""))} onClick={()=>{
            console.log("was clicked")
            setIsOpen(!isOpen)
        }}>
          <a href="" className={"nav-link ".concat((inLocation ? " active": ""))} onClick={(e)=>{e.preventDefault()}}>
          {props.iconElement}
            <p>
              
              {" " + props.label}
              <i className="right bi bi-chevron-left"></i>
            </p>
          </a>
          <ul className="nav nav-treeview" style={{display: `${isOpen ? "block" : "none"}`}}>
            {props.children}
          </ul>
        </li>
    )
}

