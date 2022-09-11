/**
 * AppData stores data related to Application User that is  significant to some part of the application is not generally shown to the users.
 * 
 * 
 * CREATED: 20220909 - adzz
 * UPDATED: 20220909 - adzz
 */

import ThemeSettings, { NullThemeSettings } from "./ThemeSettings";

export default class AppData{
    /**
     * 
     * @param {String} id 
     * @param {String} uid 
     * @param {ThemeSettings} themeSettings 
     * @param {Number} totalTradeCount 
     */
    constructor(id, uid, themeSettings, totalTradeCount){
        this.id = id;
        this.uid = uid;
        this.themeSettings = themeSettings;
        this.totalTradeCount = totalTradeCount;
    }
    incrementTradeCount(){
        this.totalTradeCount = this.totalTradeCount + 1;
        return this;
    }
    decrementTradeCount(){
        this.totalTradeCount = this.totalTradeCount - 1;
        return this;
    }
}

export class NullAppData{
    constructor(){
        this.id = "";
        this.uid = "";
        this.themeSettings = new NullThemeSettings();
        this.totalTradeCount = 0;
    }
}