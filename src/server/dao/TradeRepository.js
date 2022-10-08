import { AuthCredential } from "firebase/auth";
import { Firestore, DocumentSnapshot, QuerySnapshot, endBefore, where, serverTimestamp } from "firebase/firestore";
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";

import Trade from "../models/Trade"
import FirestoreRepository from "./FirestoreRepository";

import { UserInfo } from "firebase/auth";
import { MissingUserError } from "../errors/RuleQueryCompatError";

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
            new Date(data.createdDate.toDate())
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
        /**@type {UserInfo} */
        this._currentUser = null;

        this.collection = collection;

        this.getNextPage = this.getNextPage.bind(this);
    }
    async get(docID){
        return await this._superRepository.get(docID);
    }
     async getBy(field, value, operator="=="){
        if(this._currentUser == null){
            throw new MissingUserError();
        }
           
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter), where(field, operator, value), where("createdBy", "==", this._currentUser.uid));

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
     * @param {orderBy} orderBy
     * @returns {Promise<Array<Trade>>}
     */
     async getAll(){
        if(this._currentUser == null){
            throw new MissingUserError();
        }

        const q = query(collection(this._firestore, this.collection).withConverter(this._converter), orderBy("createdDate", "desc"), where("createdBy","==", this._currentUser.uid));

        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((item) => {
            const doc = (item.data());
            doc.id = item.id;
            list.push(doc);
        });
        return list;
    }
    /**
     * Queries all of the documents.
     * @param {Query} customQuery
     * @returns {Promise<{list:Array<Trade>, querySnapshot: QuerySnapshot}>}
     */
     async getDocuments(customQuery){
        if(!customQuery){
            return await this.getAll();
        }
        const q = customQuery;

        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((item) => {
            const doc = (item.data());
            doc.id = item.id;
            list.push(doc);
        });
        return {
            list: list,
            querySnapshot: querySnapshot
        };
    }
    /**
     * 
     * @param {Trade} docData 
     * @returns 
     */
    async save(docData){
        if(docData.id){
            docData.lastUpdatedDate = serverTimestamp()
        }else{
            docData.createdDate = serverTimestamp()
        }
        return await this._superRepository.save(docData);
    }
    /**
     * 
     * @param {Array<Trade>} docList 
     * @returns 
     */
    async saveAll(docList){
        const newDocList = docList.map(function(doc){
            if(doc.id){
                doc.lastUpdatedDate = serverTimestamp();
            }else{
                doc.createdDate = serverTimestamp();
            }
            return doc;
        })
       return await this._superRepository.saveAll(newDocList);
    }
    /**
     * 
     * @param {String} docID 
     * @param {Trade} docData 
     * @returns 
     */
     async update(docID, docData){
        docData.lastUpdatedDate = serverTimestamp();
        return await this._superRepository.update(docID, docData);
    }
    async delete(docID){
        return await this._superRepository.delete(docID);
    }

    /**
     * 
     * @param {Object} options
     * @param {String} options.field
     * @param {"desc" | "asc"} options.direction
     */
     async getAllOrderedBy(options){
        if(this._currentUser == null){
            throw new MissingUserError();
        }

        const q = query(collection(this._firestore, this.collection).withConverter(this._converter),orderBy(options.name, options.direction), where("createdBy","==", this._currentUser.uid));
        return await this.getDocuments(q);
    }

    /**
     * 
     * @param {Object} options
     * @param {String} options.orderField
     * @param {"desc" | "asc"} options.orderDirection
     * @param {Number} options.limit
     */
     async getTopOrderedBy(options){
        if(this._currentUser == null){
            throw new MissingUserError();
        }

        const q = query(collection(this._firestore, this.collection).withConverter(this._converter),orderBy(options.orderField, options.orderDirection), limit(options.limit), where("createdBy","==", this._currentUser.uid));
        return await this.getDocuments(q);
    }

    /**
     * 
     * @param {Object} option
     * @param {String} options.orderField
     * @param {"desc" | "asc"} options.orderDirection
     * @param {QuerySnapshot} options.lastSnapshot
     * @param {Number} options.limit
     */
     async getNextPage(options){
        if(this._currentUser == null){
            throw new MissingUserError();
        }

        const lastDoc = options.lastSnapshot ? options.lastSnapshot.docs[options.lastSnapshot.docs.length - 1] : null;

        if(!lastDoc){
            return await this.getTopOrderedBy({orderField: options.orderField, orderDirection: options.orderDirection, limit: options.limit});
        }
        const nextQuery = 
            query(collection(this._firestore, this.collection).withConverter(this._converter),
            orderBy(options.orderField, options.orderDirection),
            startAfter(lastDoc),
            limit(options.limit),
            where("createdBy","==", this._currentUser.uid));
            
        return await this.getDocuments(nextQuery);
    }
    /**
     * 
     * @param {Object} option
     * @param {String} options.orderField
     * @param {"desc" | "asc"} options.orderDirection
     * @param {QuerySnapshot} options.lastSnapshot
     * @param {Number} options.limit
     */
    async getPrevPage(options){
        if(this._currentUser == null){
            throw new MissingUserError();
        }

        const firstDoc = options.lastSnapshot ? options.lastSnapshot.docs[0] : null;

        if(!firstDoc){
            return await this.getTopOrderedBy({orderField: options.orderField, orderDirection: options.orderDirection, limit: options.limit});
        }
        const prevQuery = 
            query(collection(this._firestore, this.collection).withConverter(this._converter),
            orderBy(options.orderField, options.orderDirection),
            endBefore(firstDoc),
            limit(options.limit),
            where("createdBy","==", this._currentUser.uid));
            
        return await this.getDocuments(prevQuery);
    }
    /**
      * Sets the user instance to adhere to the firestore rule that requires the Auth instance.
      * @param {UserInfo} currentUser 
      */
     setCurrentUser(currentUser){
        this._currentUser = currentUser;
     }
}

const sample = new TradeRepository();