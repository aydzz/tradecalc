import TradeRepository from "../dao/TradeRepository";
import firebase from "../firebase";

class TradeService{
    constructor(){
        this.repository = new TradeRepository(firebase.firestore,"tra_trade");
    }
     async get(docID){
        return this.repository.get(docID);
    }
     async getBy(field, value){
        return this.repository.getBy(field,value)   
    }
    async getAll(){
       return this.repository.getAll();
    }
     async save(docData){
        return this.repository.save(docData);
    }
     async saveAll(docList){
        return this.repository.saveAll(docList)
    }
    async delete(docID){
        return this.repository.delete(docID);
    }
}


const tradeService = new TradeService();

export default tradeService;

