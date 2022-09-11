import { Firestore, DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";

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
            status: trade.status,
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
            data.status,
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

        this.getNextPage = this.getNextPage.bind(this);
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

    async getAllOrderedBy(options){
        return await this._superRepository.getAllOrderedBy(options)
    }
    /**
     * 
     * @param {Object} options
     * @param {String} options.orderField
     * @param {"desc" | "asc"} options.orderDirection
     * @param {QuerySnapshot} options.lastSnapshot
     * @param {Number} options.limit
     */
     async getNextPage(options){
        const lastDoc = options.lastSnapshot ? options.lastSnapshot.docs[options.lastSnapshot.docs.length - 1] : null;

        if(!lastDoc){
            return await this._superRepository.getTopOrderedBy({orderField: options.orderField, orderDirection: options.orderDirection, limit: options.limit});
        }
        const nextQuery = 
            query(collection(this._firestore, this.collection).withConverter(this._converter),
            orderBy(options.orderField, options.orderDirection),
            startAfter(lastDoc),
            limit(options.limit));
            
        return await this._superRepository.getDocs(nextQuery);
    }
}

const sample = new TradeRepository();