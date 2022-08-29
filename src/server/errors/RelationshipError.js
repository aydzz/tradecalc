/**
 * RelationshipError/s
 *  - Checks data integrity based on the relationship defined in the the ERD
 * 
 * NOTES:
 *  - this is really unnecessary ( esp when we can use Firebase Rules) but I still want to check fetch side of relationship especially in development.
 *  - will mainly use OneToOneRelationshipError
 * 
 * CREATED: 20220830 - adzz
 * UPDATED: 20220830 - adzz
 */
export default class RelationshipError extends Error{
    /**
     * 
     * @param {String} relationship 
     * @param {String} message 
     */
    constructor(relationship, message){
        super(message);
        this.relationship = relationship;
        if(relationship === "one-to-one"){
            this.name = "OneToOneRelationshipError"
        }else if(relationship === "zero-to-many"){
            this.name = "ZeroToManyRelationshipError"
        }else if(relationship === "one-to-many"){
            this.name = "OneToManyRelationshipError"
        }else if(relationship === "many-to-many"){
            this.name = "ManyToManyRelationshipError";
        }else{
            this.name = "RelationshipError";
        }
    }
}

export class OneToOneRelationshipError extends RelationshipError{
    constructor(message){
        super("one-to-one",message);
    }
}

export class ZeroToManyRelationshipError extends RelationshipError{
    constructor(message){
        super("zero-to-many",message);
    }
}

export class OneToManyRelationshipError extends RelationshipError{
    constructor(message){
        super("one-to-many",message);
    }
}

export class ManyToManyRelationshipError extends RelationshipError{
    constructor(message){
        super("many-to-many",message);
    }
}