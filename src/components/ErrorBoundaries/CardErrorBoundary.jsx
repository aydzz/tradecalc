import appLogger from "../../assets/js/AppLogger"
import React from "react";
import Error500 from "../../pages/Error/500";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      return (
        <>
          <div className="d-flex justify-content-center align-items-center text-uppercase" style={{minHeight: "250px"}}>
            <p className="lead text-center"><span className="text-danger"><i className="bi bi-x-circle-fill"></i> ERROR:</span> Something went wrong.<br></br>
            <span className="text-xs">We will work on fixing that right away.</span>
            </p>
          </div>
          
         </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}