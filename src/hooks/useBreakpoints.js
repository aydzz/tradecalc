import { useEffect } from "react";
import { useState } from "react";
import BREAKPOINTS from "../assets/theme/base/breakpoints";

/**
 * Listens/Checks for window resizing and returns the correct breakpoint string based on bootstrap.
 * @returns {String}
 * 
 * CREATED: 08/14/2022
 * UPDATED:
 */
function useBreakpoints(){
    const [screenSize, setScreenSize] = useState();
    
    const screenSizeSetter = function(width){
        if(width >= BREAKPOINTS.values.xxl){
            setScreenSize("xxl");
        }else if(width >= BREAKPOINTS.values.xl){
            setScreenSize("xl");
        }else if(width >= BREAKPOINTS.values.lg){
            setScreenSize("lg");
        }else if(width >= BREAKPOINTS.values.md){
            setScreenSize("md");
        }else if(width >= BREAKPOINTS.values.sm){
            setScreenSize("sm");
        }else{
            setScreenSize("xs");
        }
    }
    useEffect(function(){
        screenSizeSetter(window.innerWidth);
    },[]);

    window.addEventListener("resize", function(){
        screenSizeSetter(window.innerWidth)
    });
    
    return screenSize;
    
}

export default useBreakpoints