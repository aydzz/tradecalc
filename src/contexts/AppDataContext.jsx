import React, { useContext, useEffect, useState } from "react";
import {Toast} from "../assets/theme/utils/swal";
import { useAuth } from "./AuthContext";
import {useTheme} from "./ThemeContext"
import FullPageLoader from "../components/Loaders/FullPageLoader"
import AppData, { NullAppData } from "../server/models/AppData";
import appDataService from "../server/service/AppDataService"

const AppDataContext = React.createContext();
/**
 * 
 * @returns {
 *  AppData,Function
 * }
 */
export function useAppData(){
    return useContext(AppDataContext);
}
export default function AppDataProvider(props){

    const {currentUser} = useAuth();
    const {setDarkMode} = useTheme();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(currentUser ? true: false);
    /**@type {[AppData, Function]} */
    const [appData, setAppData] = useState(new NullAppData());
    
    //Fetches current User's AppData
    useEffect(function(){
        if(currentUser){
            appDataService.getBy("uid", currentUser.uid).then(function(res){
                setAppData(res[0])
                setLoading(false);
            }).catch(function(err){
                //do something here...
                setError(err);
            });
        }
    },[])

    //Handles Loaded AppData
    useEffect(function(){
        if(appData && appData.id){
            setDarkMode(appData.themeSettings.darkMode);
        }
    },[appData]);

    //Error Handling ( for error boundary )
    useEffect(function(){
        if(error){
            throw error;
        }
    },[error]);

    const contextValue = {
        appData: appData,
        setAppData: setAppData
    }

    console.log(loading)
    return (
        <AppDataContext.Provider value={contextValue}>
          {loading ? <FullPageLoader/> : props.children}
        </AppDataContext.Provider>
      )
}