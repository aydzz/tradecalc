/**
 * Calculator Component ( index )
 *  - contains miscellaneous components for the Calculator Page
 */

import { useEffect } from "react";
import useForceUpdate from "../../../hooks/useForceUpdate";

/**
 * This shows the current index of the record against the total count of trades.
 */
export function ShownTradesDesc(props){
    /**
     * Prop Level Assignment
     */
    const parentStates = props.parentStates;
    
    /**
     * Component Level Assignment
     */
    const forceUpdate = useForceUpdate();

    /**
     * Effects
     */
    useEffect(function(){
        parentStates.setShownTradesDescRerenderer(forceUpdate)
    },[]);
    return props.totalTradeCount ? (
        <div>
            <p className='p-0 m-0 text-sm'>Showing {((props.page * props.maxRecordsPerPage) - props.maxRecordsPerPage) + 1} to {((props.page - 1) * props.maxRecordsPerPage ) + props.tradeLogsLength} of {props.totalTradeCount} trades</p>
        </div>
    ) : null;
}