import { Timestamp } from "firebase/firestore";

export default class Trade{
    /**
     * 
     * @param {String} id 
     * @param {String} direction 
     * @param {String} orderType 
     * @param {String} riskType 
     * @param {String} asset 
     * @param {Number} entryPrice 
     * @param {Number} accountOpen 
     * @param {Number} quantity 
     * @param {Number} multiplier 
     * @param {String} stoplossType 
     * @param {Number} stoplossPrice 
     * @param {String} takeProfitType 
     * @param {Number} takeProfitPrice 
     * @param {Number} exitPrice 
     * @param {Number} tradeValue 
     * @param {String} createdBy 
     * @param {Date | Timestamp} createdDate 
     */
    constructor(id, direction, orderType, riskType, asset, entryPrice, accountOpen, quantity, multiplier, 
                stoplossType, stoplossPrice, takeProfitType, takeProfitPrice, exitPrice, tradeValue, createdBy, 
                createdDate
    ){
        this.id = id;
        this.direction = direction;
        this.orderType = orderType;
        this.riskType = riskType;
        this.asset = asset;
        this.entryPrice = entryPrice;
        this.accountOpen = accountOpen;
        this.quantity = quantity;
        this.multiplier = multiplier;
        this._notionalValue = 0;
        this.stoplossType = stoplossType;
        this.stoplossPrice = stoplossPrice;
        this.takeProfitType = takeProfitType;
        this.takeProfitPrice = takeProfitPrice;
        this._riskValue = 0;
        this._orderSLSpread = 0;
        this._orderTPSpread = 0;
        this.exitPrice = exitPrice;
        this.tradeValue = tradeValue;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }
    get notionalValue(){
        return this.entryPrice * this.multiplier;
    }
    get riskValue(){
        return 0;
    }
    get orderSLSpread(){
        return 0;
    }
    get orderTPSpread(){
        return 0;
    }
}