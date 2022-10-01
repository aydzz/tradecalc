/**
 * Firestore Rule to Query Incompatibility/ies
 * 
 * 
 * CREATED: 20221001 - adzz
 * UPDATED: 20221001 - adzz
 */


export default class RuleQueryCompatError extends Error{
    /**
     * 
     * @param {String} name 
     * @param {String} message 
     */
     constructor(name, message){
        super(message);
        this.name = name;
    }
}

export class MissingUserError extends RuleQueryCompatError{
    constructor(message="authenticated user instance was not found."){
        super("MissingUserError",message);
    }
}