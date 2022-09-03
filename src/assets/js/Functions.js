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