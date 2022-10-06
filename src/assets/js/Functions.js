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