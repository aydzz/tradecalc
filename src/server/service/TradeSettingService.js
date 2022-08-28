import TradeSettingRepository from "../dao/TradeSettingRepository";
import firebase from "../firebase";

class TradeSettingService{
    constructor(){
        this.repository = new TradeSettingRepository(firebase.firestore,"tra_trade_setting");
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
}


const tradeSettingService = new TradeSettingService();

export default tradeSettingService;

