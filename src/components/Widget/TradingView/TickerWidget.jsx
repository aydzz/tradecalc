import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';

export default function TickerWidget() {
    const containerRef = useRef();
    const DeploymentScript = document.createElement("script");
    DeploymentScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    DeploymentScript.innerHTML = JSON.stringify({
        "symbols": [
            {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500"
            },
            {
            "proName": "FOREXCOM:NSXUSD",
            "title": "US 100"
            },
            {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR/USD"
            },
            {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
            },
            {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
            }
        ],
        "colorTheme": "light",
        "isTransparent": false,
        "showSymbolLogo": true,
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
