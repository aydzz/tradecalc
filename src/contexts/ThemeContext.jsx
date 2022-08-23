import React, { useContext, useState } from "react";


const ThemeContext = React.createContext();
export function useTheme(){
    return useContext(ThemeContext);
}
export default function ThemeContextProvider(props){

    const [darkMode, setDarkMode] = useState(false);
    
    const contextValue = {
        darkMode: darkMode,
        setDarkMode: setDarkMode
    }

    return (
        <ThemeContext.Provider value={contextValue}>
          {props.children}
        </ThemeContext.Provider>
      )
}