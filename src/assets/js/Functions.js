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