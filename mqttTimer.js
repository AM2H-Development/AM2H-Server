/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const mqtt = require('mqtt');
var mqttClient;
var moment = require('moment');
var SunCalc = require('suncalc');

class M {
    constructor(){
        this.cfg;
        this.sunTimes;
        this.timeout;
        this.root;
        this.oldSeconds;
        this.oldMinutes;
        this.oldHours;
        this.oldDay;
        this.oldDate;
        this.oldMonth;
        this.oldYear;
        this.oldWeekday;
        this.oldFullYear;
        this.oldDawn=true; // Morgendämmerung
        this.oldDusk=true; // Abenddämmerung
    }
    setMqtt(cfg){
        this.cfg=cfg;
        mqttClient= mqtt.connect('mqtt://' + cfg.host);
        this.root=cfg.database;        
    }
    start(){
        this.sunTimes = SunCalc.getTimes(new Date(),this.cfg.latitude, this.cfg.longitude);
        var date= new Date();
        if (this.sunTimes.dawn < date){
            this.oldDawn=false;
        }
        if (this.sunTimes.dusk < date){
            this.oldDusk=false;
        }
        
        // console.log(moment(this.sunTimes.sunset).format());
        console.log(this.sunTimes);
        console.log(this.sunTimes.dawn);
        console.log(this.sunTimes.dusk);
        console.log(new Date());
        
        this.oldSeconds=moment().seconds();
        this.oldMinutes=moment().minutes();
        this.oldHours=moment().hours();
        this.oldDay=moment().isoWeekday();
        this.oldDate=moment().date();
        this.oldMonth=moment().month();
        this.oldFullYear=moment().year();
        this.timeout = setInterval(this.poll,100,this);
    }
    stop(){
        clearInterval(this.timeout);
    }
    poll(obj){
        if (mqttClient !== undefined){
            if (moment().seconds() !== obj.oldSeconds) {
                mqttClient.publish(obj.root + "/event/timer/seconds",moment().format());
                obj.oldSeconds=moment().seconds();
            } else return;
            if (moment().minutes() !== obj.oldMinutes) {
                mqttClient.publish(obj.root + "/event/timer/minutes",moment().minutes().toString());
                obj.oldMinutes=moment().minutes();

                var date = new Date();
                if (obj.sunTimes.dawn < date && obj.oldDawn){
                    mqttClient.publish(obj.root + "/event/timer/dawn",moment().format());
                    obj.oldDawn=false;
                }
                if (obj.sunTimes.dusk < date && obj.oldDusk){
                    mqttClient.publish(obj.root + "/event/timer/dusk",moment().format());
                    obj.oldDusk=false;
                }
            }
            if (moment().hours() !== obj.oldHours) {
                mqttClient.publish(obj.root + "/event/timer/hours",moment().hours().toString());
                obj.oldHours=moment().hours();
            }
            if (moment().isoWeekday() !== obj.oldDay) {
                mqttClient.publish(obj.root + "/event/timer/day",moment().isoWeekday().toString());
                obj.oldDay=moment().isoWeekday();
                obj.sunTimes = SunCalc.getTimes(new Date(),this.cfg.latitude, this.cfg.longitude);
                obj.oldDawn=false;
                obj.oldDusk=false;
            }
            if (moment().date() !== obj.oldDate) {
                mqttClient.publish(obj.root + "/event/timer/date",moment().date().toString());
                obj.oldDate=moment().date();
            }
            if (moment().month() !== obj.oldMonth) {
                mqttClient.publish(obj.root + "/event/timer/month",moment().month().toString());
                obj.oldMonth=moment().month();
            }
            if (moment().year() !== obj.oldFullYear) {
                mqttClient.publish(obj.root + "/event/timer/year",moment().year().toString());
                obj.oldFullYear=moment().year();
            }

        }
    }
}

module.exports=new M();

