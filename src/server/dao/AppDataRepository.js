import { Firestore, query, collection, where, getDocs } from "firebase/firestore";
import AppData, { NullAppData } from "../models/AppData";
import FirestoreRepository from "./FirestoreRepository";
import { OneToOneRelationshipError } from "../errors/RelationshipError";
import { MissingUserError } from "../errors/RuleQueryCompatError";

// Firestore data converter
const appDataConverter = {
    /**
     * 
     * @param {AppData} appData 
     * @returns 
     */
    toFirestore: (appData) => {
        return {
            uid: appData.uid,
            themeSettings:  {
                darkMode: appData.themeSettings.darkMode
            },
            totalTradeCount: appData.totalTradeCount
        };
    },
    fromFirestore: (snapshot, options) => {
        /**@type {AppData} */
        const data = snapshot.data(options);
        return new AppData(
            snapshot.id,
            data.uid,
            data.themeSettings,
            data.totalTradeCount
        );
    }
};

export default class AppDataRepository{
    /**
     * Data Access Object for document collection 
     * @param {Firestore} firestore 
     * @param {String} collection 
     */
    constructor(firestore, collection){
        /**@type {FirestoreRepository<AppData>} */
        this._superRepository = new FirestoreRepository(firestore,collection,appDataConverter);
        this.collection = collection;
        this._firestore = firestore;
        this._converter = appDataConverter;
        this._currentUser = null;
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
