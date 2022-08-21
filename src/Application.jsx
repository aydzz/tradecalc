import logo from './logo.svg';
import './application.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./components/Route/PrivateRoute";
import HomeIndex from './pages/Home';
import useBreakpoints from './hooks/useBreakpoints';
import CalculatorIndex from './pages/Calculator';
import SettingsIndex from './pages/Settings';
import DashboardIndex from './pages/Dashboard'
import TradeLogsIndex from './pages/TradeLogs'
import LandingIndex from './pages/Landing';
import RegisterIndex from "./pages/Register";
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './pages/ForgotPassword';

function Application() {
  
  const screenSize = useBreakpoints();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(screenSize == "sm" ? true :  screenSize == "xs" ? true : false);
  
  function handleSidebarToggle(flag) {
    if(flag === undefined){
      setSidebarCollapsed(!sidebarCollapsed);
    }else{
      
      setSidebarCollapsed(flag);
    }
  }
  return (
    <div className={"App sidebar-mini ".concat(
                                                sidebarCollapsed && (screenSize !="sm" && screenSize !="xs") ? "sidebar-collapse" :
                                                sidebarCollapsed && (screenSize =="sm" || screenSize =="xs") ? "sidebar-open" : "")}>
        <div className="wrapper">
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Navigate to={"landing"} />} />
                <Route exact path="/landing" element={<LandingIndex/>} />
                <Route exact path="/register" element={<RegisterIndex/>} />
                <Route exact path="/forgot-password" element={<ForgotPassword/>} />
                <Route exact path = "/app" element={<PrivateRoute screenSize={screenSize} sidebarCollapsed={sidebarCollapsed} sidebarToggleHandler={handleSidebarToggle}></PrivateRoute>}>
                    <Route exact path="./" element={<Navigate to="dashboard" />}></Route>
                    <Route path="home" element={<HomeIndex></HomeIndex>} />
                    <Route path="dashboard" element={<DashboardIndex></DashboardIndex>} />
                    <Route path="calculator" element={<CalculatorIndex></CalculatorIndex>} />
                    <Route path="settings" element={<SettingsIndex></SettingsIndex>} />
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
