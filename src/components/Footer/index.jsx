import React from "react";

const Footer = React.forwardRef((props, ref)=>{
    const {className ,...rest} = props;
    return(
        <footer ref={ref} className={"main-footer ".concat(className)} {...rest}>
            {/* <!-- To the right --> */}
            <div className="float-right d-none d-sm-inline">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </div>
            {/* <!-- Default to the left --> */}
            <strong>Copyright &copy; 2022 - Present <a href="/">tradingassistant</a>.</strong> All rights reserved.
        </footer>
    )
});

export default Footer;