import UserRepository from "../dao/UserRepository";
import firebase from "../firebase";
import User from "../models/User";
import appLogger from "../../assets/js/AppLogger";
import { OneToOneRelationshipError } from "../errors/RelationshipError";

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
     * @returns {Promise<Array<User> | null>}
     */
     async getBy(field, value){
        if(field === "uid"){
            return this.repository.getBy(field,value).then(function(results){
                if(!results){
                    throw new OneToOneRelationshipError("No User Detail was found.");
                }else{
                    if(results.length !== 1){
                        throw new OneToOneRelationshipError("Multiple User Detail was found for Authenticated user.")
                    }else{
                        return results;
                    }
                }
            })
        }
        return this.repository.getBy(field,value);
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

