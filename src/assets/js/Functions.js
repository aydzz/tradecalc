/**
 * Returns a valid Unsplash Image URL string.
 * @param {String} imageID 
 * @param {Number} width 
 * @param {Number} height 
 * @returns 
 */
export function getUnsplashURL(imageID, width, height){
    return `https://source.unsplash.com/${imageID}/${width}x${height}`;
}

/**
 * Make sure to set the classNames.prototype.cssModule in your component first before use.
 * @param {String} string 
 * @returns {String}
 */
 export function classNames(string){
    const moduleClassNames = string.split(" ").map(function(className){
        if(classNames.prototype.cssModule === undefined){
            return string;
        }else{
            return classNames.prototype.cssModule[className];
        }
    });
    
    return moduleClassNames.join(" ");
}

/**
 * Paginate an array.
 * @param {Array} list
 * @param {Number} recPerPage
 */
export function paginateList(list, perPageCount){
    const newList = list;
    const temp = [];
    const recCount = list.length;
    const pageCount = Math.ceil(recCount/perPageCount);

    for(let i=0; i<pageCount;i++){
        const records = newList.splice(0,perPageCount);
        temp.push([...records]);
    }

    return temp;
}
/**
 * 
 * @param {*} formik formik props (from Formik)
 * @param {String} fieldName 
 * @returns 
 */
export function inputValidationString(formik,fieldName){
    return `${(formik.touched[fieldName] && formik.errors[fieldName]) ? "is-invalid" : (formik.touched[fieldName] && !formik.errors[fieldName]) ? "is-valid" : ""}`
}


/**
 * 
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Boolean}
 */
export function isEqualTo(obj1, obj2){
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

const Functions = {
    getUnsplashURL: getUnsplashURL,
    classNames: classNames,
    paginateList: paginateList,
    inputValidationString: inputValidationString,
    inputValidationString: inputValidationString,
    isEqualTo: isEqualTo
}
export default Functions
