import { Firestore } from "firebase/firestore";

import Trade from "../models/Trade"
import FirestoreRepository from "./FirestoreRepository";

// Firestore data converter
const tradeConverter = {
    /**
     * 
     * @param {Trade} trade 
     * @returns 
     */
    toFirestore: (trade) => {
        return {
            direction: trade.direction,
            orderType: trade.orderType,
            riskType: trade.riskType,
            asset: trade.asset,
            entryPrice: trade.entryPrice,
            accountOpen: trade.accountOpen,
            quantity: trade.quantity,
            cash: trade.cash,
            cashQty: trade.cashQty,
            leverage: trade.leverage,
            allowableCapitalLoss: trade.allowableCapitalLoss,
            notionalValue: trade.notionalValue,
            stoplossType: trade.stoplossType,
            stoplossPrice: trade.stoplossPrice,
            takeProfitType: trade.takeProfitType,
            takeProfitPrice: trade.takeProfitPrice,
            riskValue: trade.riskValue,
            orderSLSpread: trade.orderSLSpread,
            orderTPSpread: trade.orderTPSpread,
            exitPrice: trade.exitPrice,
            tradeValue: trade.tradeValue,
            createdBy: trade.createdBy,
            createdDate: trade.createdDate
        };
    },
    fromFirestore: (snapshot, options) => {
        /**@type {Trade} */
        const data = snapshot.data(options);
        return new Trade(
            snapshot.id,
            data.direction,
            data.orderType,
            data.riskType,
            data.asset,
            data.entryPrice,
            data.accountOpen,
            data.quantity,
            data.cash,
            data.cashQty,
            data.leverage,
            data.allowableCapitalLoss,
            data.stoplossType,
            data.stoplossPrice,
            data.takeProfitType,
            data.takeProfitPrice,
            data.exitPrice,
            data.tradeValue,
            data.createdBy,
            data.createdDate
        );
    }
};

export default class TradeRepository{
    /**
     * Data Access Object for document collection 
     * @param {Firestore} firestore 
     * @param {String} collection 
     */
    constructor(firestore, collection){
        /**@type {FirestoreRepository<Trade>} */
        this._superRepository = new FirestoreRepository(firestore,collection,tradeConverter);

        this._firestore = firestore;
        
        this._converter = tradeConverter;
        this.collection = collection;
    }
    async get(docID){
        return await this._superRepository.get(docID);
    }
     async getBy(field, value){
       return await this._superRepository.getBy(field, value);
    }
     async getAll(){
       return await this._superRepository.getAll();
    }
    async save(docData){
        return await this._superRepository.save(docData);
    }
    async saveAll(docList){
       return await this._superRepository.saveAll(docList);
    }
     async update(docID, docData){
        return await this._superRepository.update(docID, docData);
    }
    async delete(docID){
        return await this._superRepository.delete(docID);
    }
}

const sample = new TradeRepository();