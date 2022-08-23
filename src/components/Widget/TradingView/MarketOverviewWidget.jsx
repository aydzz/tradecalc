import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import {useTheme} from "../../../contexts/ThemeContext";

export default function MarketOverviewWidget() {
    const theme = useTheme();
    const containerRef = useRef();
    const DeploymentScript = document.createElement("script");
    DeploymentScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    DeploymentScript.innerHTML = JSON.stringify({
        "colorTheme": `${theme.darkMode ? "dark" : "light"}`,
        "dateRange": "1M",
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "600",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(0, 0, 255, 1)",
        "gridLineColor": "rgba(240, 243, 250, 0)",
        "scaleFontColor": "rgba(120, 123, 134, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              {
                "s": "FOREXCOM:SPXUSD",
                "d": "S&P 500"
              },
              {
                "s": "FOREXCOM:NSXUSD",
                "d": "US 100"
              },
              {
                "s": "FOREXCOM:DJI",
                "d": "Dow 30"
              },
              {
                "s": "INDEX:NKY",
                "d": "Nikkei 225"
              },
              {
                "s": "INDEX:DEU40",
                "d": "DAX Index"
              },
              {
                "s": "FOREXCOM:UKXGBP",
                "d": "UK 100"
              }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Forex",
            "symbols": [
              {
                "s": "FX:EURUSD",
                "d": "EUR/USD"
              },
              {
                "s": "FX:GBPUSD",
                "d": "GBP/USD"
              },
              {
                "s": "FX:USDJPY",
                "d": "USD/JPY"
              },
              {
                "s": "FX:USDCHF",
                "d": "USD/CHF"
              },
              {
                "s": "FX:AUDUSD",
                "d": "AUD/USD"
              },
              {
                "s": "FX:USDCAD",
                "d": "USD/CAD"
              }
            ],
            "originalTitle": "Forex"
          },
          {
            "title": "Crypto",
            "symbols": [
              {
                "s": "BINANCE:BTCUSDT",
                "d": "Bitcoin"
              },
              {
                "s": "BINANCE:SOLUSDT",
                "d": "Solana"
              },
              {
                "s": "BINANCE:ETHUSDT",
                "d": "Etherum"
              },
              {
                "s": "COINBASE:USDTUSD",
                "d": "USDT"
              },
              {
                "s": "CURRENCYCOM:USDCUSD",
                "d": "USDC"
              }
            ]
          }
        ]
      });
      useEffect(function(e){
        //new HTMLDivElement().removeChild(DeploymentScript)
        containerRef.current.appendChild(DeploymentScript);
        // Specify how to clean up after this effect:
        return function(){
          if(containerRef.current){
            containerRef.current.innerHTML = ""
          }
        }
      },[theme.darkMode])
  return (
    <>
    {/* <!-- TradingView Widget BEGIN --> */}
    <div class="tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/" rel="noopener" target="_blank"><span class="blue-text">Financial Markets</span></a> by TradingView</div>
        <div ref={containerRef}></div>
    </div>
    {/* <!-- TradingView Widget END --> */}
    </>
  )
}
