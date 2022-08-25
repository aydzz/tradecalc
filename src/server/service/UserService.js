import UserRepository from "../dao/UserRepository";
import firebase from "../firebase";
import User from "../models/User";

class UserService{
    constructor(){
        this.repository = new UserRepository(firebase.firestore,"tra_user");
    }
    /**
     * Gets a single document instance
     * @param {String} docID 
     * @returns {Promise<User | undefined>}
     */
     async get(docID){
        return this.repository.get(docID);
    }

    /**
     * Queries document based on a specific field
     * @param {String} field 
     * @param {String} value 
     * @returns {Promise<Array<User> | undefined>}
     */
     async getBy(field, value){
        return this.repository.getBy(field,value)   
    }
    
    /**
     * Queries all of the documents.
     * @returns {Promise<Array<User>>}
     */
    async getAll(){
       return this.repository.getAll();
    }
    /**
     * Saves a single document instance
     * @param {User} docData 
     * @returns *
     */
     async save(docData){
        return this.repository.save(docData);
    }

    /**
     * Saves multiple document instance at once.
     * @param {Array<User>} docList 
     */
     async saveAll(docList){
        return this.saveAll(docList)
    }
}


const userService = new UserService();
export default userService;

