export default class User{
    /**
     * 
     * @param {String} id 
     * @param {String} uid 
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} email 
     * @param {String} username 
     * @param {Date} createdDate 
     * @param {Date} updatedDate 
     */
    constructor(id, uid, firstName, lastName, email, username, createdDate, updatedDate){
        this.id = id;
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}