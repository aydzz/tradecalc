import { Firestore, query, collection, getDocs, where } from "firebase/firestore";
import {UserInfo} from "firebase/auth";

import TradeSetting from "../models/TradeSetting"
import FirestoreRepository from "./FirestoreRepository";
import MissingUserError from "../errors/RuleQueryCompatError";

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
            realizedPnL: tradeSetting.realizedPnL,
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
            userID: tradeSetting.userID,
            uid: tradeSetting.uid
        };
    },
    fromFirestore: (snapshot, options) => {
        /**@type {TradeSetting} */
        const data = snapshot.data(options);
        return new TradeSetting(
            snapshot.id,
            data.portfolioValue,
            data.realizedPnL,
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
            data.userID,
            data.uid
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

        /**@type {UserInfo} */
        this._currentUser = null;

        this.collection = collection;
    }
    async get(docID){
        return await this._superRepository.get(docID);
    }
    /**
     * Queries document based on a specific field
     * @param {String} field 
     * @param {String} value 
     * @returns {Promise<Array<T> | null>}
     */
     async getBy(field, value, operator="=="){
        if(this._currentUser == null){
            throw new MissingUserError();
        }
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter), where("uid", "==", this._currentUser.uid), where(field, operator, value));

        const querySnapshot = await getDocs(q);
        const list = [];
        if(querySnapshot.size > 0){
            querySnapshot.forEach((item) => {
                const doc = (item.data());
                doc.id = item.id;
                list.push(doc);
            });
        }else{
            return null;
        }
        return list;
    }
    /**
     * Queries all of the documents.
     * @returns {Promise<Array<T>>}
     */
     async getAll(){
        if(this._currentUser == null){
            throw new MissingUserError();
        }
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter), where("uid", "==", this._currentUser.uid));

        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((item) => {
            const doc = (item.data());
            doc.id = item.id;
            list.push(doc);
        });
        return list;
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
    
    setCurrentUser(currentUser){
        this._currentUser = currentUser;
    }
}

const sample = new TradeSettingRepository();