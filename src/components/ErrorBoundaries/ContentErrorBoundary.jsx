import React from "react";
import {Error500Private} from "../../pages/Error/500";

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
        <Error500Private></Error500Private>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}