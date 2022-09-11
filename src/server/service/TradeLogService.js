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

    /**
     * 
     * @param {Object} options
     * @param {String} options.name
     * @param {"desc" | "asc"} options.direction
     */
    async getAllOrderedBy(options){
        return this.repository.getAllOrderedBy(options)
    }
    /**
     * 
     * @param {Object} options
     * @param {String} options.orderField
     * @param {"desc" | "asc"} options.orderDirection
     * @param {QuerySnapshot} options.lastSnapshot
     * @param {Number} options.limit
     */
     async getNextPage(options){
        return this.repository.getNextPage(options);
     }
}


const tradeService = new TradeService();

export default tradeService;

