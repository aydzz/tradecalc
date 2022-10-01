/**
 * Force Update hook uses UUID to track the render ID of the component.
 * - Using this hook, user can emulate forceUpdate function in a React Class Component.
 * 
 * CREATED: 20220920 - adzz
 * UPDATED: 20220920 - adzz
 */
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function useForceUpdate(){
    const [renderID, setRenderID] = useState(uuid());
    
    /**
     * 
     * @param {String} token 
     */
    const forceUpdate = function(token){
        setRenderID(token ?? uuid());
    }
    
    return {
        renderID: renderID, 
        exec: forceUpdate
    };
}