import React from 'react'

export default function OverlayLoader(props) {
  if(props.type === "loading-1"){
    return (
      <div class="loader-wrapper">
          <div class="load-1">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
          </div>
      </div>
    )
  }else if(props.type === "loading-2"){
    return (
      <div class="loader-wrapper">
          <div class="load-2">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
          </div>
      </div>
    )
  }else if(props.type === "loading-3"){
    return (
      <div class="loader-wrapper">
          <div class="load-3">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
          </div>
      </div>
    )
  }else if(props.type === "loading-4"){
    return(
      <div class="loader-wrappep">
          <div class="load-4">
              <div class="ring-1"></div>
          </div>
      </div>
    )
  }else if(props.type === "loading-5"){
    return(
      <div class="load-wrapp">
            <div class="load-5">
                <div class="ring-2">
                    <div class="ball-holder">
                        <div class="ball"></div>
                    </div>
                </div>
            </div>
        </div>
    )
  }else if(props.type === "loading-6"){
    return(
      <div class="load-wrapp">
          <div class="load-6">
              <div class="letter-holder">
                  <div class="l-1 letter">L</div>
                  <div class="l-2 letter">o</div>
                  <div class="l-3 letter">a</div>
                  <div class="l-4 letter">d</div>
                  <div class="l-5 letter">i</div>
                  <div class="l-6 letter">n</div>
                  <div class="l-7 letter">g</div>
                  <div class="l-8 letter">.</div>
                  <div class="l-9 letter">.</div>
                  <div class="l-10 letter">.</div>
              </div>
          </div>
      </div>
    )
  }else if(props.type === "loading-7"){
    return(
      <div class="load-wrapp">
          <div class="load-7">
              <div class="square-holder">
                  <div class="square"></div>
              </div>
          </div>
      </div>
    )
  }else if(props.type === "loading-8"){
    return (
      <div class="load-wrapp">
          <div class="load-8">
              <div class="line"></div>
          </div>
      </div>
    )
  }else if(props.type === "loading-9"){
    return (
      <div class="load-wrapp">
          <div class="load-9">
              <div class="spinner">
                  <div class="bubble-1"></div>
                  <div class="bubble-2"></div>
                </div>
          </div>
      </div>
    )
  }else if(props.type === "loading-10"){
    return (
      <div class="load-wrapp">
          <div class="load-10">
              <div class="bar"></div>
          </div>
      </div>
    )
  }
}
