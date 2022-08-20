import { useRef } from "react";
import useOutsideClickObserver from "../../hooks/useOutsideClickObserver";

/**
 * Component that alerts if you click outside of it
 */
 export default function OutsideClickObs(props) {
    const wrapperRef = useRef(null);
    //Take note to use a function keyword as the shorthand does not work as expected ( error: is not a function)
    useOutsideClickObserver(wrapperRef, (clickedOutside, result)=>{
      if(clickedOutside){
        props.outsideClickHandler();
      }else{
        //nothing here.
      }
    });
  
    return <div ref={wrapperRef}>{props.children}</div>;
  }