/**
 * Firestore Collection: tra_user
 * User  is a an entity DataModel that where we store data details per authenticated user.
 * 
 * UPDATED: 20220829 - adzz
 * CREATED: 202208xx - adzz
 */

export default class User{
    /**
     *  
     * 
     * 
     * 
     * @param {String} id 
     * @param {String} uid firestore auth.uid
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

export class NullUser {
    constructor() {
        this.id = "";
        this.uid = "";
        this.firstName = "John";
        this.lastName = "Doe";
        this.email = "johndoe@mailinator.com";
        this.username = "jdoe";
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }
}