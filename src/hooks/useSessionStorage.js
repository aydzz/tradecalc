import { useEffect, useState } from "react";
import appLogger from "../assets/js/AppLogger";

/**
 * Take note of all the checks before coming to the last option of actually using the passed literal value.
 * @param {*} key 
 * @param {*} initialValue 
 * @returns 
 * 
 */
const getSavedValue = (key, initialValue)=>{
    const savedValue = JSON.parse(sessionStorage.getItem(key));
    if(savedValue){
        return savedValue;
    }
    /*
     * Take note that this is just a utility if you want to pass a function instaed of actual value.
     * if that is the case, then the function will be run and the returned value will be used.
     */
    if(initialValue instanceof Function){
        return initialValue()
    }
    return initialValue;
}

export default function useSessionStorage(key, initialValue) {
    /**
     * This is totally unrelated to the calling of the Local storage( the use of the function as a parameter of useState).
     *  - This was done because we want to use a utility function getSavedValue() instead of evaluating it inside the actual hook scope
     *  - -- which will be run every render ( instead of just the first  render )
     */
    const ssChangeEvent = new CustomEvent("appsessionstoragechange");
    appLogger.log("APP: Hook scope call.");
    const [value, setValue] = useState(()=>{
        appLogger.log("APP: Stae in Hook scope call");
        return getSavedValue(key, initialValue)
    });

    useEffect(()=>{
        sessionStorage.setItem(key, JSON.stringify(value));
        document.dispatchEvent(ssChangeEvent);
    }, [value]);


    return [value, setValue];
}