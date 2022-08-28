class AppLogger{
    constructor(){
        if(process.env.REACT_APP_ENABLE_LOGGING === "Y"){
            this._enabled = true;
        }else{
            this._enabled = false;
        }

        this.log = this.log.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
    }
    log(text){
        if(this._enabled){
            console.log(text);
        }
    }
    warn(text){
        if(this._enabled){
            console.warn(text);
        }
    }
    error(text){
        if(this._enabled){
            console.error(text);
        }
    }
}

const appLogger = new AppLogger();


export default appLogger;
