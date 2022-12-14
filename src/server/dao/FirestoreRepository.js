import { Firestore, Query, QuerySnapshot } from "firebase/firestore";
import { doc, setDoc, collection, writeBatch, getDoc, query, getDocs, where, deleteDoc, orderBy, DocumentSnapshot, limit} from "firebase/firestore"

/**
 * @template T
 */
export default class FirestoreRepository{
    /**
     * Data Access Object for document collection 
     * 
     * @param {Firestore} firestore 
     * @param {String} collection 
     * @param {*} converter 
     */
    constructor(firestore, collection, converter){
        this._firestore = firestore;
        this._converter = converter;
        this.collection = collection;
        this.save = this.save.bind(this);
        this.saveAll = this.saveAll.bind(this);
        this.get = this.get.bind(this);
        this.getBy = this.getBy.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.getDocuments = this.getDocuments.bind(this);
        this.getAllOrderedBy = this.getAllOrderedBy.bind(this);
        this.getTopOrderedBy = this.getTopOrderedBy.bind(this);
    }
    /**
     * Gets a single document instance
     * @param {String} docID 
     * @returns {Promise< T | undefined>}
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
     * @returns {Promise<Array<T> | null>}
     */
     async getBy(field, value, operator="=="){
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter), where(field, operator, value));

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
     * Queries all of the documents.
     * @param {Query} customQuery
     * @returns {Promise<{list:Array<T>, querySnapshot: QuerySnapshot}>}
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
     * Saves a single document instance
     * @param {T} docData 
     * @returns *
     */
    async save(docData){
        const ref = (docData.id ? 
            doc(collection(this._firestore, this.collection),docData.id).withConverter(this._converter): 
            doc(collection(this._firestore, this.collection)).withConverter(this._converter));
        const result = await setDoc(ref, docData);
        return result;
    }
    /**
     * Saves multiple document instance at once.
     * @param {Array<T>} docList 
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
     * @param {T} docData 
     * @returns *
     */
     async update(docID, docData){
        const ref = doc(collection(this._firestore, this.collection),docID).withConverter(this._converter);
        const result = await setDoc(ref, docData);
        return result;
    }

    /**
     * 
     * @param {String} docID 
     */
    async delete(docID){
        const docRef = doc(this._firestore, this.collection, docID).withConverter(this._converter);
        const docSnap = await deleteDoc(docRef);
        console.log(docSnap);
    }

    /**
     * 
     * @param {Object} options
     * @param {String} options.orderField
     * @param {"desc" | "asc"} options.orderDirection
     * @param {Number} options.limit
     */
    async getTopOrderedBy(options){
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter),orderBy(options.orderField, options.orderDirection), limit(options.limit));
        return await this.getDocs(q);
    }
    
    /**
     * 
     * @param {Object} options
     * @param {String} options.field
     * @param {"desc" | "asc"} options.direction
     */
    async getAllOrderedBy(options){
        const q = query(collection(this._firestore, this.collection).withConverter(this._converter),orderBy(options.name, options.direction));
        return await this.getDocs(q);
    }
}