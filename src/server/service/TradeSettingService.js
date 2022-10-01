import appLogger from "../../assets/js/AppLogger";
import TradeSettingRepository from "../dao/TradeSettingRepository";
import { OneToOneRelationshipError } from "../errors/RelationshipError";
import firebase from "../firebase";

class TradeSettingService{
    constructor(){
        this.repository = new TradeSettingRepository(firebase.firestore,"tra_trade_setting");
    }
     async get(docID){
        return this.repository.get(docID);
    }
     async getBy(field, value){
        if(field === "uid"){
            return this.repository.getBy(field, value).then(function(results){
                if(!results){
                    appLogger.warn("APP: (TradeSettingService): Trading Settings is unset")
                }else{
                    if(results.length !== 1){
                        throw new OneToOneRelationshipError("Multiple Trade Setting was found for the current user.")
                    }else{
                        return results;
                    }
                }
            })
        }
        return this.repository.getBy(field,value);
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
    setCurrentUser(currentUser){
        this.repository.setCurrentUser(currentUser);
    }
}


const tradeSettingService = new TradeSettingService();

export default tradeSettingService;

