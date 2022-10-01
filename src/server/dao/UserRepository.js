import { Firestore, query, collection, where,getDocs } from "firebase/firestore";
import {UserInfo} from "firebase/auth";
import User from "../models/User";
import FirestoreRepository from "./FirestoreRepository";
import { MissingUserError } from "../errors/RuleQueryCompatError";

// Firestore data converter
const userConverter = {
    /**
     * 
     * @param {User} user 
     * @returns 
     */
    toFirestore: (user) => {
        return {
            uid: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            createdDate: user.createdDate,
            updatedDate: user.updatedDate
        };
    },
    fromFirestore: (snapshot, options) => {
        /**@type {User} */
        const data = snapshot.data(options);
        return new User(
            snapshot.id,
            data.uid,
            data.firstName,
            data.lastName,
            data.email,
            data.username,
            data.createdDate,
            data.updatedDate
        );
    }
};

export default class UserRepository{
    /**
     * Data Access Object for document collection 
     * @param {Firestore} firestore 
     * @param {String} collection 
     */
    constructor(firestore, collection){
        /**@type {FirestoreRepository<User>} */
        this._superRepository = new FirestoreRepository(firestore,collection,userConverter);

        this._firestore = firestore;
        this._converter = userConverter;
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
