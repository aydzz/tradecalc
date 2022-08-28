export default class TradeSetting{

    /**
     * 
     * @param {String} id 
     * @param {Number} portfolioValue 
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
    constructor(id,portfolioValue, tradeCapital, tradePortCapital, leverage,range,rangeMultiplier,riskScope,
                riskDeviationPercent, acceptableSpread, minSpread, portRiskTradingThreshold,capRiskTradingThreshold,
                capPortRiskPercent, riskRewardMultiplier, userID
        ){
            this.id =  id
            this.portfolioValue = portfolioValue
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
        this.portfolioValue = ""
        this.tradeCapital = ""
        this.tradePortCapital = ""
        this.leverage = ""
        this.range = ""
        this.rangeMultiplier = ""
        this.riskScope = "capital"
        this.riskDeviationPercent = ""
        this.acceptableSpread = ""
        this.minSpread = ""
        this.portRiskTradingThreshold = ""
        this.capRiskTradingThreshold = ""
        this.capPortRiskPercent = ""
        this.riskRewardMultiplier = ""
        this.userID = ""
    }
}