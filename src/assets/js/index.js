/**
 * 
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Boolean}
 */
function isEqualTo(obj1, obj2){
    const keys_1 = Object.keys(obj1);
    const keys_2 = Object.keys(obj2);

    //key tests
    const isEqualKey = keys_1.every(function(val,i){
        return  keys_2.includes(val);
    });
    
    if(!isEqualKey && (keys_1.length !== keys_2.length)){
        return false;   
    }else{
        //value checks
        const hasEqualValues = keys_1.every(function(key,i,arr){
            return obj1[key] === obj2[key]
        });
        if(!hasEqualValues){
            return false
        }
    }
    return true;
}

const obj1 = {val2: 1, val4: 3, val2: 2 };
const obj2 = {val1: 1, val2: 3, val3: 3};


console.log(isEqualTo(obj1, obj2));

