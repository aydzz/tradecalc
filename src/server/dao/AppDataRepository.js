import { Firestore } from "firebase/firestore";
import AppData, { NullAppData } from "../models/AppData";
import FirestoreRepository from "./FirestoreRepository";
import { OneToOneRelationshipError } from "../errors/RelationshipError";

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

        this._firestore = firestore;
        this._converter = appDataConverter;
    }

    async get(docID){
       return await this._superRepository.get(docID);
    }
    async getBy(field, value){
        if(field === "uid"){
            return this._superRepository.getBy(field,value).then(function(results){
                if(!results){
                    throw new OneToOneRelationshipError("No AppData was found.");
                }else{
                    if(results.length !== 1){
                        throw new OneToOneRelationshipError("Multiple AppData was found for Authenticated user.")
                    }else{
                        return results;
                    }
                }
            })
        }
        return this._superRepository.getBy(field,value);
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
