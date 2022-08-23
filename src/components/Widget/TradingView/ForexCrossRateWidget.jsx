import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';

export default function ForexCrossRateWidget() {
    const containerRef = useRef();
    const DeploymentScript = document.createElement("script");
    DeploymentScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    DeploymentScript.innerHTML = JSON.stringify({
        "width": "100%",
        "height": 400,
        "currencies": [
          "PHP",
          "EUR",
          "USD",
          "JPY",
          "GBP",
          "CAD"
          
        ],
        "isTransparent": false,
        "colorTheme": "light",
        "locale": "en"
      });
        useEffect(function(e){
            //new HTMLDivElement().removeChild(DeploymentScript)
            containerRef.current.appendChild(DeploymentScript);
            // Specify how to clean up after this effect:
          },[])
  return (
    <>
    {/* <!-- TradingView Widget BEGIN --> */}
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Quotes</span></a> by TradingView</div>
    <div ref={containerRef}></div>
</div>
{/* <!-- TradingView Widget END --> */}
    </>
  )
}