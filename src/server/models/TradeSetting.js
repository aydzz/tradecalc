export default class TradeSetting{

    /**
     * TradeSetting  is a an entity DataModel that where we store data inputs from the user. 
     *  - records are unique per User Entity ( 1 User = 0 | 1 TradeSetting)
     *  - take note to only use members for calculation. any calculation that uses Trade should be handled in the TradeCalculator.
     * 
     * CREATED: 202208xx - adzz
     * UPDATED: 20220829 - adzz
     * @param {String} id 
     * @param {Number} portfolioValue 
     * @param {Number} realizedPnL
     * @param {Number} tradeCapital 
     * @param {Number} tradePortCapital 
     * @param {Number} leverage 
     * @param {Number} range 
     * @param {Number} rangeMultiplier 
     * @param {String} riskScope 
     * @param {Number} riskDeviationPercent 
     * @param {Number} acceptableSpread 
     * @param {Number} minSpread 
     * @param {Number} portRiskTradingThreshold 
     * @param {Number} capRiskTradingThreshold 
     * @param {Number} capPortRiskPercent 
     * @param {Number} riskRewardMultiplier 
     * @param {String} userID 
     */
    constructor(id,portfolioValue, realizedPnL, tradeCapital, tradePortCapital, leverage,range,rangeMultiplier,riskScope,
                riskDeviationPercent, acceptableSpread, minSpread, portRiskTradingThreshold,capRiskTradingThreshold,
                capPortRiskPercent, riskRewardMultiplier, userID
        ){
            this.id =  id
            this.portfolioValue = portfolioValue
            this.realizedPnL = realizedPnL;
            this.tradeCapital = tradeCapital
            this._tradePortCapital = tradePortCapital
            this.leverage = leverage
            this.range = range
            this.rangeMultiplier = rangeMultiplier
            this._riskScope = riskScope
            this.riskDeviationPercent = riskDeviationPercent
            this.acceptableSpread = acceptableSpread
            this.minSpread = minSpread
            this.portRiskTradingThreshold = portRiskTradingThreshold
            this.capRiskTradingThreshold = capRiskTradingThreshold
            this._capPortRiskPercent = capPortRiskPercent
            this.riskRewardMultiplier = riskRewardMultiplier
            this.userID = userID
    }
    /**
     * @param {String} val
     */
    set riskScope(val){
        if(val){
            if(!(val !== "capital" || val !== "portfolio")){
                console.warn("APP:Model(TradeSetting) riskScope is neither 'capital' nor 'portfolio'");
            }
        }else{
            throw new Error("riskScope cannot  be falsy");
        }
        this._riskScope = val;
    }
    get riskScope(){
        return this._riskScope;
    }
    set tradePortCapital(val){
        this._tradePortCapital = val;
    }
    get tradePortCapital(){
        if(this.riskScope === "capital"){
            return this.tradeCapital
        }else if(this.riskScope === "portfolio"){
            return this.portfolioValue
        }
        
    }

    set capPortRiskPercent(val){
        this._capPortRiskPercent = val;
    }
    get capPortRiskPercent(){
        if(this.riskScope === "capital"){
            return this.capRiskTradingThreshold
        }else if(this.riskScope === "portfolio"){
            return this.portRiskTradingThreshold
        }
    }
}


export class NullTradeSetting{
    /**
     * 
     * @param {String} id 
     * @param {Number} portfolioValue 
     * @param {Number} realizedPnL
     * @param {Number} tradeCapital 
     * @param {Number} tradePortCapital 
     * @param {Number} leverage 
     * @param {Number} range 
     * @param {Number} rangeMultiplier 
     * @param {String} riskScope 
     * @param {Number} riskDeviationPercent 
     * @param {Number} acceptableSpread 
     * @param {Number} minSpread 
     * @param {Number} portRiskTradingThreshold 
     * @param {Number} capRiskTradingThreshold 
     * @param {Number} capPortRiskPercent 
     * @param {Number} riskRewardMultiplier 
     * @param {String} userID 
     */
     constructor(){
        this.id =  ""
        this.portfolioValue = 0
        this.realizedPnL = 0
        this.tradeCapital = 0
        this.tradePortCapital = 0
        this.leverage = 0
        this.range = 0
        this.rangeMultiplier = 0
        this.riskScope = "capital"
        this.riskDeviationPercent = 0
        this.acceptableSpread = 0
        this.minSpread = 0
        this.portRiskTradingThreshold = 0
        this.capRiskTradingThreshold = 0
        this.capPortRiskPercent = 0
        this.riskRewardMultiplier = 0
        this.userID = ""
    }
}