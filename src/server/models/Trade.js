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
     * @param {Number} notionalValue 
     * @param {String} stoplossType 
     * @param {Number} stoplossPrice 
     * @param {String} takeProfitType 
     * @param {Number} takeProfitPrice 
     * @param {Number} riskValue 
     * @param {Number} orderSLSpread 
     * @param {Number} orderTPSpread 
     * @param {Number} exitPrice 
     * @param {Number} tradeValue 
     * @param {String} createdBy 
     * @param {Date} createdDate 
     */
    constructor(id, direction, orderType, riskType, asset, entryPrice, accountOpen, quantity, multiplier, notionalValue, 
                stoplossType, stoplossPrice, takeProfitType, takeProfitPrice, riskValue, orderSLSpread, orderTPSpread, exitPrice, tradeValue, createdBy, 
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
        this.notionalValue = notionalValue;
        this.stoplossType = stoplossType;
        this.stoplossPrice = stoplossPrice;
        this.takeProfitType = takeProfitType;
        this.takeProfitPrice = takeProfitPrice;
        this.riskValue = riskValue;
        this.orderSLSpread = orderSLSpread;
        this.orderTPSpread = orderTPSpread;
        this.exitPrice = exitPrice;
        this.tradeValue = tradeValue;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }
}