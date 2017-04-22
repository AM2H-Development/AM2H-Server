/* 
 * Topic Logger Filter
 */
const _m = new Map();
const _t = new Map();

class LogContainer{
    constructor(options){
        this.topic=options.topic;
        // this.client;
        this.message;
        this.newMessage=false;
        this.last= 0;
        this.condition =options.condition === undefined ? "none" : options.condition;
        this.interval  =options.interval  === undefined ? 0 : options.interval;
        this.trigger   =options.trigger  === undefined ? "" : options.trigger;
    }
};

class T {
    constructor(){
        this.mysqlClient;
        this.timeout;
        this.cfg;
        console.log("T constructor: ");
    }
    setMysqlClient(client){
        this.mysqlClient=client;
    }
    setCfg(cfg){
        this.cfg=cfg;
    }
    addLogger(options){
        // Topic : log [atLeast:interval,atMost:interval,every:interval,all:[],onEvent:[internal,external]], 
        // storageLife: interval, fireMqtt: [true,false]
        if (!this["log_"+options.condition]){
            console.error("Error adding " + options.topic + " with option " + options.condition + " " + options.interval  + " s");
            return;
        }
        console.log("adding " + options.topic + " with option " + options.condition + " " + options.interval  + " s");
        _m.set(options.topic,new LogContainer(options));
    }
    start(){
        if (this.mysqlClient === undefined ) return false;
        this.timeout = setInterval(this.poll,100,this);
        return true;
    }
    trigger(topic,message){
        _t.set(topic,true);
        // console.log("topic logger received " + topic + " " + message);
        var item = _m.get(topic);
        if (item){
            item.message=message;
            item.newMessage=true;
        } else {
            _m.set(topic,new LogContainer({topic:topic,message:message,newMessage:true}));
        }
    }
    poll(obj){
        for (var item of _m){
            if (obj["log_"+item[1].condition]){
                obj["log_"+item[1].condition](item);
            }
        }
        _t.clear(); // .set(item[1].trigger,false);
    }
    log_none(){
        return false;
    }
    log_every(item){
        if (!item[1].message) return false;
        var date = Date.now();
        if (item[1].last + (item[1].interval*1000) < date){
            console.log("logger::::every " + item[0] + " " + item[1].message);
            this.logToMysql(item[0],item[1].message);
            item[1].last=date;
            return true;
        }
        return false;
    }
    log_atMost(item){
        if (!item[1].message) return false;
        var date = Date.now();
        if (item[1].last + (item[1].interval*1000) < date && item[1].newMessage){
            console.log("logger::::atMost " + item[0] + " " + item[1].message);
            this.logToMysql(item[0],item[1].message);
            item[1].last=date;
            item[1].newMessage=false;
            return true;
        }
        item[1].newMessage=false;
        return false;
    }
    log_atLeast(item){
        if (!item[1].message) return false;
        var date = Date.now();
        if (item[1].last + (item[1].interval*1000) < date || item[1].newMessage){
            console.log("logger::::atLeast " + item[0] + " " + item[1].message);
            this.logToMysql(item[0],item[1].message);
            item[1].last=date;
            item[1].newMessage=false;
            return true;
        }
        return false;
    }
    log_all(item){
        if (!item[1].message || !item[1].newMessage) return false;
        console.log("logger::::all " + item[0] + " " + item[1].message);
        this.logToMysql(item[0],item[1].message);
        item[1].newMessage=false;
        return true;
    }
    log_onEvent(item){
        if (!item[1].message){
            _t.set(item[1].trigger,false);
            return false;
        }
        if (_t.get(item[1].trigger)){
            console.log("logger::::onEvent " + item[0] + " " + item[1].message);
            this.logToMysql(item[0],item[1].message);
            return true;
        }
        return false;
    }
    logToMysql(topic,message){
        //console.log("Received from MQTT: " + topic.toString() + " value: " + message.toString());
        var post  = {message: message.toString(), topic: topic.toString()};
        this.mysqlClient.query('INSERT INTO '+ this.cfg.database +'.' + this.cfg.database + ' SET ?', post, (error) =>{
            if (error) throw error;
        });   
    }
    stop(){
        clearInterval(this.timeout);
    }
    list(){
        for (var topic of _m){
            console.log(topic);
        }        
    }
}
var t = new T();
module.exports=t;