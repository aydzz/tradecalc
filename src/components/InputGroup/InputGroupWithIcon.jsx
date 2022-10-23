import React from 'react'

export default function InputGroupWithIcon({iconLoc, iconRight, iconLeft, isValid, ...rest}) {
  return (
    <>
    <div class="input-group"> 
        {iconLoc === "left" || iconLoc === "both" ? 
          <div className="input-group-prepend">
            <span className="input-group-text"><i className={iconLeft}></i></span>
          </div> :
          null
        }
        <input className={`form-control ${isValid === true ? "is-valid" : (isValid === false ? "is-invalid" : "") }`} {...rest}/>
        {iconLoc === "right" || iconLoc === "both" ? 
          <div className="input-group-append">
            <span className="input-group-text"><i className={iconRight}></i></span>
          </div> :
          null
        }
    </div>
    </>
  )
}

InputGroupWithIcon.defaultProps = {
  iconLoc:"left",
  iconRight:"bi bi-pencil",
  iconLeft: "bi bi-pencil",
  isValid: null
}