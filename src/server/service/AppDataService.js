/**
 * Take note that AppData contains data that are used by the application based on each of the user's settings / activities.
 */
import firebase from "../firebase";
import AppDataRepository from "../dao/AppDataRepository";

class AppDataService{
    constructor(){
        this.repository = new AppDataRepository(firebase.firestore,"tra_appdata");
    }
    async get(docID){
        return this.repository.get(docID);
    }
    async getCurrentUserRecord(){
        return this.repository.getCurrentUserRecord();
    }
     async getBy(field, value){
        return this.repository.getBy(field,value);
    }
    async getAll(){
       return this.repository.getAll();
    }
     async save(docData){
        return this.repository.save(docData);
    }
     async saveAll(docList){
        return this.saveAll(docList)
    }
    setCurrentUser(currentUser){
        this.repository.setCurrentUser(currentUser)
    }
}

const appDataService = new AppDataService();
export default appDataService;

