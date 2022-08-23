import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import OutsideClickObs from "../components/Special/OutsideClickObs";
import BREAKPOINTS from "../assets/theme/base/breakpoints";
import useBreakpoints from "../hooks/useBreakpoints";
import ControlSidebar from "../components/ControlSidebar";

export default function PrivateLayout(props) {
  const screenSize = useBreakpoints();

  const handler = function(){
    /**
     * This is a workaround to the incorrectly passed props when the handler is being run in the last point ( useOutsideClickObserver)
     * - Workaround for this issue to use literals instead of passing values by reference
     * - We are not getting the correct result or atleas the latest version of the props / state we are using, hence the  current setup.
     */
    if(window.innerWidth <= BREAKPOINTS.values.md){
      props.sidebarToggleHandler(false);    
    }
  }

  return (
    <div className="wrapper">
        <Topbar sidebarToggleHandler={props.sidebarToggleHandler} cSidebarToggleHandler={props.cSidebarToggleHandler}></Topbar>
        <OutsideClickObs outsideClickHandler={handler}>
          <Sidebar></Sidebar>
        </OutsideClickObs>
        <Outlet />
        <ControlSidebar></ControlSidebar>
        <Footer></Footer>
    </div>
  )
}
