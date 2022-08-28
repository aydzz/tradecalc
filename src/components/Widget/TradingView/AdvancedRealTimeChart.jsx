import React from 'react'
import { useRef, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

export default function AdvancedRealTimeChart() {
    const theme = useTheme();
    const containerRef = useRef();
    const InitializationScript = document.createElement("script");
    InitializationScript.innerHTML = `new TradingView.widget({
      "width": "100%",
      "height": 610,
      "symbol": "CRYPTOCAP:BTC.D",
      "timezone": "Etc/UTC",
      "theme": "${theme.darkMode ? "dark" : "light"}",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "range": "YTD",
      "allow_symbol_change": true,
      "container_id": "tra-tradingview-ART-chart"
    })`;
    useEffect(function(e){
      containerRef.current.appendChild(InitializationScript);
      // Specify how to clean up after this effect:
      return function(){
        if(containerRef.current){
          // containerRef.current.innerHTML = ""
        }
      }
    },[theme.darkMode])
  return (
    <>
    {/* <!-- TradingView Widget BEGIN --> */}
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <div ref={containerRef}></div>
      <div id="tra-tradingview-ART-chart">

      </div>
    </div>
    {/* <!-- TradingView Widget END --> */}
    </>
  )
}
