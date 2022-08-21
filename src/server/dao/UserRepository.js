import User from "../models/User";
import { doc, setDoc, collection, writeBatch, getDoc, query, getDocs, where } from "firebase/firestore"

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
     * @param {*} firestore 
     * @param {String} collection 
     */
    constructor(firestore, collection){
        this._firestore = firestore;
        this._converter = userConverter;
        this.collection = collection;
        this.save = this.save.bind(this);
        this.saveAll = this.saveAll.bind(this);
        this.get = this.get.bind(this);
        this.getBy = this.getBy.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
    }
    /**
     * Gets a single document instance
     * @param {String} docID 
     * @returns {Promise<User | undefined>}
     */
    async get(docID){
        const docRef = doc(this._firestore, this.collection, docID).withConverter(this._converter);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }else {
            return docSnap.data();//undefined
        }     
    }
    /**
     * Queries document based on a specific field
     * @param {String} field 
     * @param {String} value 
     * @returns {Promise<Array<User> | undefined>}
     */
     async getBy(field, value){
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter), where(field, "==", value));

        const querySnapshot = await getDocs(q);
        const list = [];
        if(querySnapshot.size > 0){
            querySnapshot.forEach((item) => {
                const doc = (item.data());
                doc.id = item.id;
                list.push(doc);
            });
        }else{
            return undefined;
        }
        return list;
    }
    /**
     * Queries all of the documents.
     * @returns {Promise<Array<User>>}
     */
     async getAll(){
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter));

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
     * Saves a single document instance
     * @param {User} docData 
     * @returns *
     */
    async save(docData){
        const ref = doc(collection(this._firestore, this.collection)).withConverter(this._converter);
        const result = await setDoc(ref, docData);
        return result;
    }
    /**
     * Saves multiple document instance at once.
     * @param {Array<User>} docList 
     */
    async saveAll(docList){
        const batch = writeBatch(this._firestore);
        const collection = this.collection;
        const converter = this._converter;
        const firestore = this._firestore;
        docList.forEach(function(item){
            const docRef = doc(firestore, collection, item.id).withConverter(converter);
            batch.set(docRef,item);
        });
        return await batch.commit();
    }
    /**
     * Updates document by docID and a new instance
     * @param {String} docID 
     * @param {User} docData 
     * @returns *
     */
     async update(docID, docData){
        const ref = doc(collection(this._firestore, this.collection),docID).withConverter(this._converter);
        const result = await setDoc(ref, docData);
        return result;
    }
}