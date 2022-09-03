import TradeSetting, { NullTradeSetting } from "../../server/models/TradeSetting";
import Trade, { NullTrade } from "../../server/models/Trade";

export default class TradeCalculator{
    /** 
     * TradeCalculator class is comprised of two Application Data Model ( Trade and TradeSetting) to calculate trading values.
     *  - Take note that this class should only have attributes / methods that needs the 2 class simultaneously ( unless the attr itself is not significant to the entities. )
     *  - add prefix (fx) to attributes that is also present in the other entities that needs to be calculated here.
     * CREATED: 20220829 - adzz
     * UPDATED: 20220829 - adzz
     * 
     * @param {TradeSetting} tradeSetting 
     * @param {Trade} trade 
     */
    constructor(tradeSetting, trade){
        this.tradeSetting = tradeSetting;
        this.trade = trade;
    }
    get stoplossPrice(){
        let price = 0;
        if(this.trade.stoplossType==="risk"){
            //check if not zero
            if(this.trade.calculatedQuantity !== 0){
                if(this.trade.direction === "long"){
                    price = this.trade.entryPrice - ((this.tradeSetting.tradePortCapital * this.tradeSetting.capPortRiskPercent)/this.trade.calculatedQuantity)
                }else if(this.trade.direction === "short"){
                    price = this.trade.entryPrice + ((this.tradeSetting.tradePortCapital * this.tradeSetting.capPortRiskPercent)/this.trade.calculatedQuantity)
                }
            }
        }else if(this.trade.stoplossType === "spread"){
            if(this.trade.direction === "long"){
                price = this.trade.entryPrice - (this.tradeSetting.range * this.tradeSetting.rangeMultiplier)
            }else if(this.trade.direction === "short"){
                price = this.trade.entryPrice + (this.tradeSetting.range * this.tradeSetting.rangeMultiplier)
            }
        }else if(this.trade.stoplossType === "loss"){
            //check if not zero
            if(this.trade.calculatedQuantity !== 0){
                if(this.trade.direction === "long"){
                    price = this.trade.entryPrice - (this.trade.allowableCapitalLoss/Math.floor(this.trade.calculatedQuantity));
                }else if(this.trade.direction === "short"){
                    price = this.trade.entryPrice + (this.trade.allowableCapitalLoss/Math.floor(this.trade.calculatedQuantity));
                }
            }
        }else if(this.trade.stoplossType === "target"){
            //not implemented yet for this can be done manually.
        }else{
            //handle something here...
        }
        return price;
    }
    //maximum CALCULATED cash that is being risked for the current trade.
    get riskValue(){
        let value = 0
        if(this.trade.stoplossType !== "loss"){
            value = this.tradeSetting.tradePortCapital* this.tradeSetting.capPortRiskPercent
        }else{
            value = this.trade.allowableCapitalLoss;
        }
        return value;
    }
    get takeProfitPrice(){
        let price = 0
        if(this.trade.takeProfitType==="riskreward"){
            if(this.trade.calculatedQuantity !== 0){
                if(this.trade.direction === "long"){
                    price = this.trade.entryPrice + ((this.riskValue * this.tradeSetting.riskRewardMultiplier)/this.trade.calculatedQuantity)
                }else if(this.trade.direction === "short"){
                    price = this.trade.entryPrice - ((this.riskValue * this.tradeSetting.riskRewardMultiplier)/this.trade.calculatedQuantity)
                }
            }
        }else if(this.trade.takeProfitType==="target"){
            //not implemented yet for this can be done manually.
        }else{
            //handle something here...
        }
        return price;
    }
    //projected cash loss when Stoploss is hit ( not including the fees )
    get projectedLoss(){
        let value = Math.abs(this.trade.entryPrice * Math.floor(this.trade.calculatedQuantity) - this.trade.stoplossPrice * Math.floor(this.trade.calculatedQuantity));
        return value;
        
    }
    //current summation of trade values. (PnL)
    get profitLoss(){
        return 0;
    }
    //desired or acceptable spread set by the user.
    get spread(){
        return this.tradeSetting.range * this.tradeSetting.rangeMultiplier;
    }
    //distance between the entry price and the stoploss
    get orderSLSpread(){
        return Math.abs((this.trade.entryPrice - this.trade.stoplossPrice));
    }
    get capitalCommited(){
        let value = 0;

        
        if(this.trade.orderType === "quantity"){
            value = this.trade.entryPrice * this.trade.quantity / this.trade.leverage 
        }else if(this.trade.orderType === "cash"){

        }else{
            
        }
        return value;
    }
    //percentage at which the spread is being complied to at the current trade values.
    get orderSpreadCompliance(){
        return this.orderSLSpread / this.spread;
    }

    //percentage at which the maximum risk is being complied to at the current trade values.
    get orderRiskCompliance(){

        return this.projectedLoss / (this.tradeSetting.capPortRiskPercent * this.tradeSetting.tradePortCapital)
    }
    //This it the value($) you want to risk based on the RiskTradingThreshold ( % ) for your capital.
    get portfolioRiskTolerance(){
        return this.tradeSetting.portRiskTradingThreshold * this.tradeSetting.portfolioValue
    }
    //This just shows what percentage of your porfolio is the commited value of the current trade
    get portfolioConsumptionPercent(){
        return this.riskValue / this.portfolioRiskTolerance
    }
    get capitalRiskTolerance(){
        return this.tradeSetting.capRiskTradingThreshold * this.tradeSetting.tradeCapital;
    }
    get capitalConsumptionPercent(){
        return this.riskValue / this.capitalRiskTolerance
    }
    
}

export class NullTradeCalculator extends TradeCalculator{
    constructor(){
        super(new NullTradeSetting(), new NullTrade());
    }
}