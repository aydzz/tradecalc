import logo from './logo.svg';
import './application.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./components/Route/PrivateRoute";
import HomeIndex from './pages/Home';
import useBreakpoints from './hooks/useBreakpoints';
import CalculatorIndex from './pages/Calculator';
import DashboardIndex from './pages/Dashboard'
import TradeLogsIndex from './pages/TradeLogs'
import LandingIndex from './pages/Landing';
import RegisterIndex from "./pages/Register";
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import ThemeContextProvider, { useTheme } from './contexts/ThemeContext';
import LoginIndex from './pages/Login';
import AccountIndex from './pages/Account';
import JournalIndex from './pages/Journal';
import StagingIndex from './pages/Staging';

function Application() {
  const theme = useTheme();
  const screenSize = useBreakpoints();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(screenSize == "sm" ? true :  screenSize == "xs" ? true : false);
  const [controlSidebarOpen, setControlSidebarOpen] = useState(false)
  
  function handleSidebarToggle(flag) {
    if(flag === undefined){
      setSidebarCollapsed(!sidebarCollapsed);
    }else{
      
      setSidebarCollapsed(flag);
    }
  }
  function cSidebarToggleHandler(){
    setControlSidebarOpen(!controlSidebarOpen);
  }
  return (
    <div className={"App sidebar-mini ".concat(
                                                sidebarCollapsed && (screenSize !="sm" && screenSize !="xs") ? "sidebar-collapse " :
                                                sidebarCollapsed && (screenSize =="sm" || screenSize =="xs") ? "sidebar-open " : "")
                                       .concat(controlSidebarOpen ? "control-sidebar-slide-open " : "")
                                       .concat(theme.darkMode ? "dark-mode " : "")}>
        <div className="wrapper">
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Navigate to={"landing"} />} />
                <Route exact path="/landing" element={<LandingIndex/>} />
                <Route exact path="/register" element={<RegisterIndex/>} />
                <Route exact path="/login" element={<LoginIndex/>} />
                <Route exact path="/forgot-password" element={<ForgotPassword/>} />
                <Route exact path = "/app" element={<PrivateRoute screenSize={screenSize} sidebarCollapsed={sidebarCollapsed} sidebarToggleHandler={handleSidebarToggle} cSidebarToggleHandler={cSidebarToggleHandler}></PrivateRoute>}>
                    <Route exact path="./" element={<Navigate to="dashboard" />}></Route>
                    <Route path="staging" element={<StagingIndex></StagingIndex>} />
                    <Route path="home" element={<HomeIndex></HomeIndex>} />
                    <Route path="dashboard" element={<DashboardIndex></DashboardIndex>} />
                    <Route path="calculator" element={<CalculatorIndex></CalculatorIndex>} />
                    <Route path="account" element={<AccountIndex></AccountIndex>} />
                    <Route path="journal" element={<JournalIndex></JournalIndex>} />
                    <Route path="tradelogs" element={<TradeLogsIndex></TradeLogsIndex>} />
                  </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
    </div>
  );
}

export default Application;
