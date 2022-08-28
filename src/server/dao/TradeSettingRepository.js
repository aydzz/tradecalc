import { Firestore } from "firebase/firestore";

import TradeSetting from "../models/TradeSetting"
import FirestoreRepository from "./FirestoreRepository";

// Firestore data converter
const tradeSettingConverter = {
    /**
     * 
     * @param {TradeSetting} tradeSetting 
     * @returns 
     */
    toFirestore: (tradeSetting) => {
        return {
            portfolioValue: tradeSetting.portfolioValue,
            tradeCapital: tradeSetting.tradeCapital,
            tradePortCapital: tradeSetting.tradePortCapital,
            leverage: tradeSetting.leverage,
            range: tradeSetting.range,
            rangeMultiplier: tradeSetting.rangeMultiplier,
            riskScope: tradeSetting.riskScope,
            riskDeviationPercent: tradeSetting.riskDeviationPercent,
            acceptableSpread: tradeSetting.acceptableSpread,
            minSpread: tradeSetting.minSpread,
            portRiskTradingThreshold: tradeSetting.portRiskTradingThreshold,
            capRiskTradingThreshold: tradeSetting.capRiskTradingThreshold,
            capPortRiskPercent: tradeSetting.capPortRiskPercent,
            riskRewardMultiplier: tradeSetting.riskRewardMultiplier,
            userID: tradeSetting.userID
        };
    },
    fromFirestore: (snapshot, options) => {
        /**@type {TradeSetting} */
        const data = snapshot.data(options);
        return new TradeSetting(
            snapshot.id,
            data.portfolioValue,
            data.tradeCapital,
            data.tradePortCapital,
            data.leverage,
            data.range,
            data.rangeMultiplier,
            data.riskScope,
            data.riskDeviationPercent,
            data.acceptableSpread,
            data.minSpread,
            data.portRiskTradingThreshold,
            data.capRiskTradingThreshold,
            data.capPortRiskPercent,
            data.riskRewardMultiplier,
            data.userID
        );
    }
};

export default class TradeSettingRepository{
    /**
     * Data Access Object for document collection 
     * @param {Firestore} firestore 
     * @param {String} collection 
     */
    constructor(firestore, collection){
        /**@type {FirestoreRepository<TradeSetting>} */
        this._superRepository = new FirestoreRepository(firestore,collection,tradeSettingConverter);

        this._firestore = firestore;
        
        this._converter = tradeSettingConverter;
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
}

const sample = new TradeSettingRepository();