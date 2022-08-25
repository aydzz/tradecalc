import { Firestore } from "firebase/firestore";
import User from "../models/User";
import FirestoreRepository from "./FirestoreRepository";

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
