export default class ThemeSettings{
    constructor(darkMode){
        this.darkMode = darkMode
    }
}

export class NullThemeSettings{
    constructor(){
        this.darkMode = false;
    }
}