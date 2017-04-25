/* 
 * Topic Logger Filter
 */
var moment = require('moment');

var tLog = require('winston').loggers.get('topicsLogger');
const _m = new Map(); // Logger (topic,LogContainer)
const _t = new Map(); // Triggers (topic, timestamp)
const _c = new Map(); // Cleanups (topic, CleanupContainer)

class LogContainer{
    constructor(options){
        this.topic=options.topic;
        // this.client;
        this.message;
        this.loggedMessage="";
        this.newMessage=false;
        this.last= 0;
        this.newonly   =options.newonly ? options.newonly: false;
        this.condition =options.condition === undefined ? "none" : options.condition;
        this.interval  =options.interval  === undefined ? 0 : options.interval;
        this.trigger   =options.trigger  === undefined ? "" : options.trigger;
    }
};

class CleanupContainer{
    constructor(options){
        this.topic=options.topic;
        this.last= 0;
        this.lifespan =options.lifespan === undefined ? -1 : options.lifespan;
        this.unit  =options.unit  === undefined ? "none" : options.unit;
    }
};

class T {
    constructor(){
        this.pollFrequency=100; // ms
        this.cleanupFrequency=30*60*1000; //ms
        this.mysqlClient;
        this.logTimer;
        this.cleanupTimer;
        this.cfg;
        this.lastTopic;
    }
    setMysqlClient(client){
        this.mysqlClient=client;
    }
    setCfg(cfg){
        this.cfg=cfg;
        // mySQL Client
        var mysql = require('mysql');
        var mysqlClient = mysql.createConnection({
          host     : cfg.host,
          user     : cfg.mysqlUser,
          password : cfg.mysqlPassword
        });
        mysqlClient.connect();
        this.mysqlClient=mysqlClient;
        
        mysqlClient.query('CREATE DATABASE IF NOT EXISTS ' + cfg.database +';', (error) => {
            if (error) tLog.error("Error: connect ETIMEDOUT at CREATE DATABASE");
        }); 

        mysqlClient.query("CREATE TABLE IF NOT EXISTS " + cfg.database + "." + cfg.database +" ("
                            + " id BIGINT AUTO_INCREMENT PRIMARY KEY,"
                            + " topic VARCHAR(255), message VARCHAR(255),"
                            + " ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                            + ");", (error) => {
            if (error) tLog.error("Error: connect ETIMEDOUT at CREATE TABLE");
        }); 

        return this;
    }
    addCleanup(options){
        if (!options.topic){
            if (!this.lastTopic) throw "Error, no last topic available";
            options.topic=this.lastTopic;
        }
        tLog.info("cleaning " + options.topic + " with option " + options.lifespan + " " + options.unit);
        _c.set(options.topic,new CleanupContainer(options));
        return this;
    }
    addLogger(options){
        if (!this["log_"+options.condition]){
            throw "Error adding " + options.topic + " with option " + options.condition;
        }
        tLog.info("adding " + options.topic + " with option " + options.condition + " " + options.interval  + " s | newonly=" + options.newonly);
        _m.set(options.topic,new LogContainer(options));
        this.lastTopic=options.topic;
        return this;
    }
    start(){
        if (this.mysqlClient === undefined ) return false;
        this.logTimer = setInterval(this.poll,this.pollFrequency,this);
        this.logTimer = setInterval(this.cleanup,this.cleanupFrequency,this);
        return true;
    }
    trigger(topic,message){
        _t.set(topic,Date.now());
        // console.log("topic logger received " + topic + " " + message);
        var item = _m.get(topic);
        if (item){
            item.message=message;
            item.newMessage=true;
        } else {
            _m.set(topic,new LogContainer({topic:topic,message:message,newMessage:true}));
        }
    }
    cleanup(obj){
        for (var item of _c){
            var timestamp = moment().subtract(item[1].lifespan, item[1].unit).format("YYYY-MM-DD HH:mm:ss.S");
            tLog.info(moment().format("YYYY-MM-DD HH:mm:ss.S") + " cleaning " + item[0] + " to " + timestamp);
            obj.cleanupMysql(item[0],timestamp);
        }        
    }
    poll(obj){
        for (var item of _m){
            if (obj["log_"+item[1].condition]){
                obj["log_"+item[1].condition](item);
            }
        }
    }
    log_none(){
        return false;
    }
    log_every(item){
        if (!item[1].message) return false;
        var date = Date.now();
        if (item[1].last + (item[1].interval*1000) < date){
           if(!item[1].newonly || (item[1].newonly && (item[1].loggedMessage.toString() !== item[1].message.toString()))){
                tLog.debug("every " + item[0] + " " + item[1].message);
                this.logToMysql(item[0],item[1].message);
                item[1].loggedMessage=item[1].message;
            }
            item[1].last=date;
            return true;
        }
        return false;
    }
    log_atMost(item){
        if (!item[1].message) return false;
        var date = Date.now();
        if (item[1].last + (item[1].interval*1000) < date && item[1].newMessage){
            if(!item[1].newonly || (item[1].newonly && (item[1].loggedMessage.toString() !== item[1].message.toString()))){
                tLog.debug("atMost " + item[0] + " " + item[1].message);
                this.logToMysql(item[0],item[1].message);
                item[1].loggedMessage=item[1].message;
            }
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
            if(!item[1].newonly || (item[1].newonly && (item[1].loggedMessage.toString() !== item[1].message.toString()))){
                tLog.debug("atLeast " + item[0] + " " + item[1].message);
                this.logToMysql(item[0],item[1].message);
                item[1].loggedMessage=item[1].message;
            }
            item[1].last=date;
            item[1].newMessage=false;
            return true;
        }
        return false;
    }
    log_all(item){
        if (!item[1].message || !item[1].newMessage) return false;
        if (!item[1].newonly || (item[1].newonly && (item[1].loggedMessage.toString() !== item[1].message.toString()))){
            if(!item[1].newonly || (item[1].newonly && (item[1].loggedMessage.toString() !== item[1].message.toString()))){
                tLog.debug("all " + item[0] + " " + item[1].message);
                this.logToMysql(item[0],item[1].message);
                item[1].loggedMessage=item[1].message;
            }
        }
        item[1].newMessage=false;
        return true;
    }
    log_onEvent(item){
        if (!item[1].message){
            _t.set(item[1].last,Date.now());
            return false;
        }
        if (_t.get(item[1].trigger)>item[1].last){
            item[1].last=Date.now();
            if(!item[1].newonly || (item[1].newonly && (item[1].loggedMessage.toString() !== item[1].message.toString()))){
                tLog.debug("onEvent " + item[0] + " " + item[1].message);
                this.logToMysql(item[0],item[1].message);
                item[1].loggedMessage=item[1].message;
            }
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
    cleanupMysql(topic,timestamp){
        this.mysqlClient.query('DELETE FROM '+ this.cfg.database +'.' + this.cfg.database + ' WHERE topic = ? and ts < ?', [topic,timestamp], (error) =>{
            if (error) throw error;
        });
    }
    query(data){
        var query = this.mysqlClient.query('SELECT message FROM '+ this.cfg.database +'.' + this.cfg.database + ' WHERE topic = ? ORDER BY id DESC LIMIT 1', data.toString());

        query.on('error', (error) => {
            throw error;
        });
        
        return query;
    }
    queryChart(data){
        // todo
        var query = this.mysqlClient.query('SELECT message FROM '+ this.cfg.database +'.' + this.cfg.database + ' WHERE topic = ? ORDER BY id DESC LIMIT 1', data.toString());

        query.on('error', (error) => {
            throw error;
        });
        
        return query;
    }
    stop(){
        clearInterval(this.logTimer);
        clearInterval(this.cleanupTimer);
    }
    list(){
        for (var topic of _m){
            tLog.info(topic);
        }        
    }
}
var t = new T();
module.exports=t;




/*
    var _ = require('underscore');
    mysqlClient.query('SELECT * FROM mqtt LIMIT 1', function (error, results) {
    if (error) throw error;
    _.each(results, (row) => showRow(row));
   
}); */





