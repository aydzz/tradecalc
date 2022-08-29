import { Timestamp } from "firebase/firestore";
/**

 */
export default class Trade {
    /**
     * Trade is a an entity DataModel that where we store data inputs from the user. 
     *  - This is mainly for transactional data which is essentially the trade that the user make ( in session, not journal log)
     *  - take note to only use members for calculation. any calculation that uses TradeSetting should be handled in the TradeCalculator.
     * 
     * CREATED: 202208xx - adzz
     * UPDATED: 20220829 - adzz
     * 
     * @param {String} id 
     * @param {String} direction 
     * @param {String} orderType 
     * @param {String} riskType 
     * @param {String} asset 
     * @param {Number} entryPrice 
     * @param {Number} accountOpen 
     * @param {Number} quantity 
     * @param {Number} cash
     * @param {Number} cashQty
     * @param {Number} leverage 
     * @param {Number} allowableCapitalLoss
     * @param {String} stoplossType 
     * @param {Number} stoplossPrice 
     * @param {String} takeProfitType 
     * @param {Number} takeProfitPrice 
     * @param {Number} exitPrice 
     * @param {Number} tradeValue 
     * @param {String} createdBy 
     * @param {Date | Timestamp} createdDate 

     */
    constructor(id, direction, orderType, riskType, asset, entryPrice, accountOpen, quantity, cash, cashQty, leverage,
        allowableCapitalLoss, stoplossType, stoplossPrice, takeProfitType, takeProfitPrice, exitPrice, tradeValue, createdBy,
        createdDate
    ) {
        this.id = id;
        this.direction = direction;
        this.orderType = orderType;
        this.riskType = riskType;
        this.asset = asset;
        this.entryPrice = entryPrice;
        this.accountOpen = accountOpen;
        this.quantity = quantity;
        this.cash = cash;
        this._cashQty = cashQty;
        this.leverage = leverage;
        this.allowableCapitalLoss = allowableCapitalLoss;
        this._notionalValue = 0;
        this.stoplossType = stoplossType;
        this._stoplossPrice = stoplossPrice;
        this.takeProfitType = takeProfitType;
        this._takeProfitPrice = takeProfitPrice;
        this._riskValue = 0;
        this._orderSLSpread = 0;
        this._orderTPSpread = 0;
        this.exitPrice = exitPrice;
        this.tradeValue = tradeValue;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }
    /**
     * SETTERS AND GETTERS
     */
    set cashQty(val) {
        this._cashQty = val;
    }
    get cashQty() {
        let calculatedQty = 0;
        if (this.orderType === "cash") {
            calculatedQty = this.calculatedQuantity;
        }
        return calculatedQty;
    }
    set notionalValue(val) {
        this._notionalValue = val;
    }
    get notionalValue() {
        return this.entryPrice * this.multiplier;
    }

    set stoplossPrice(val) {
        this._stoplossPrice = val;
    }
    get stoplossPrice() {
        return this._stoplossPrice;
    }
    set takeProfitPrice(val) {
        this._takeProfitPrice = val;
    }
    get takeProfitPrice() {
        return this._takeProfitPrice;
    }
    set riskValue(val) {
        this._riskValue = val;
    }
    get riskValue() {
        return this._riskValue;
    }
    set orderSLSpread(val) {
        this._orderSLSpread = val;
    }
    get orderSLSpread() {
        return 0;
    }
    set orderTPSpread(val) {
        this._orderTPSpread = val;
    }
    get orderTPSpread() {
        return 0;
    }
    /**
     * ONLY GETTERS
     */
    get calculatedQuantity() {
        let quantity = 0;
        if (this.orderType === "quantity") {
            quantity = this.quantity;
        } else {
            quantity = (this.cash * this.leverage) / this.entryPrice
        }
        return quantity;
    }
}

export class NullTrade extends Trade{
    constructor() {
        super(
            "",
            "long",
            "cash",
            "",
            "",
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            "risk",
            0,
            "riskreward",
            0,
            0,
            0,
            "",
            new Date()
        )
    }
}