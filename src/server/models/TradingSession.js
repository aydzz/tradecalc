/**
 * Trading Session where in the user will be able store aggregated data related to a specific session
 * - PLACEHOLDER for now. 
 *  - Reason for creating: to track activities and stuff with regards to the trading session.
 * 
 * CREATED: 20220904 - adzz
 * UPDATED: 20220904 - adzz
 */

export default class TradingSession{
    /**
     * 
     * @param {String} id 
     * @param {String} userID 
     * @param {String} tradeSettingsID 
     * @param {Number} realizedPnL 
     * @param {Number} unRealizedPnL 
     * @param {Array} trades
     */
    constructor(id, userID, tradeSettingsID, realizedPnL, unRealizedPnL, trades){
        this.id = id;
        this.userID = userID;
        this.tradeSettingsID = tradeSettingsID;
        this.realizedPnL = realizedPnL;
        this.unRealizedPnL = unRealizedPnL;
        this.trades = trades;
    }
}