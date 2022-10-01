import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import tradeSettingService from "../server/service/TradeSettingService";
import userService from "../server/service/UserService";
import ContentWrapperLoader from "../components/Loaders/ContentWrapperLoader";
import appLogger from "../assets/js/AppLogger";

const TradeSettingsContext = React.createContext();
export function useTradeSettings(){
    return useContext(TradeSettingsContext);
}
export default function TradeSettingsContextProvider(props){

    const {currentUser} = useAuth();
    const [tradeSettings, setTradeSettings] = useState();
    const [tradeSettingsUnset, setTradeSettingsUnset] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    //EFFECT: Fetches current User's TradeSettingInstance to use by Calculator Components
    useEffect(function(){
        appLogger.log(currentUser);
        tradeSettingService.getBy("uid", currentUser.uid).then(function(results){
            if(results && results.length > 0){
                setTradeSettings(results[0]);
                setTradeSettingsUnset(false);
            }else{
                setTradeSettingsUnset(true);
            }
            setLoading(false);//last request done with error
        }).catch(function(error){
            setError(error);
            setLoading(false);//last request done with error
        })
    },[])
    const contextValue = {
        tradeSettings: tradeSettings,
        tradeSettingsUnset: tradeSettingsUnset,
        loading: loading,
        error: error
    }

    console.log(loading)
    return (
        <TradeSettingsContext.Provider value={contextValue}>
          {loading ? <ContentWrapperLoader/> : props.children}
        </TradeSettingsContext.Provider>
      )
}