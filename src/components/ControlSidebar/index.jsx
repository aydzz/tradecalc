import React from 'react'
import { useTheme } from '../../contexts/ThemeContext';

export default function ControlSidebar() {
  const {setDarkMode, darkMode} = useTheme();
  return (
    //<!-- Control Sidebar -->
    <aside className="control-sidebar control-sidebar-dark transition-normal">
        {/* <!-- Control sidebar content goes here --> */}
        <div className="p-3">
          <h5><i className="bi bi-gear"></i> Customization</h5>
          <p className='text-sm'>Kindly configure the app using the following controls</p>
          <hr className='mb-2'></hr>
          <div className="mb-4">
            <input type="checkbox" className="mr-1" 
            value={darkMode}
            checked={darkMode}
            onChange={(e)=>{
              if(e.target.checked){
                setDarkMode(true);
              }else{
                setDarkMode(false);
              }
            }}/>
            <span>Dark Mode</span>
          </div>
          {/* <h6>Calculator Options</h6>
          <div className="mb-4">
            <input type="checkbox" value="1" className="mr-1"/>
            <span>Show Main Chart</span>
          </div> */}
        </div>
    </aside>
    //<!-- /.control-sidebar -->
  )
}
