/* 
Felddefinition
V1.0.0 vom 10.04.2017
*/
/* global Function, ds */

var socket = io();

$(document).ready(function () {
    initFields();
});

const _l = new Map();
const _v = new Map();

class DF {
    constructor(args,style,renderer,compute,formatter,prescale=1,fraction=0,unit=""){
        this.id=null;
        this.status=0; // 0=not initialized, 1=initialized and valid, 2=initialized need redraw
        this.style=style;
        this.args=args;
        this.value=null;
        this.prescale=prescale;
        this.fraction=fraction;
        this.unit=unit;
        if (renderer instanceof Function){
            this.renderer=renderer;
        } else {
            this.renderer=function(id,val,style){return "<div id=\""+id+"\" style=\""+style+"\">"+val+"</div>";};
        }
        if (compute instanceof Function){
            this.compute=compute;
        } else {
            this.compute=function(args){return _v.get(args[0]);};
        }
        console.log("formatter: " + formatter);
        if (formatter instanceof Function){
            this.formatter=formatter;
        } else {
            this.formatter=function(val,prescale,fraction,unit){
                val =  (val+" ").replace(",", ".");
                val /= prescale;
                return val.toLocaleString(
                        'de-DE', 
                        {minimumFractionDigits: fraction, maximumFractionDigits: fraction}
                        ) + unit;
            };
        }
    }
    
    update(context){
        switch (this.status){
            case 0:
                $(context).append(this.renderer(this.id,this.value,this.style));
                this.status=1;
                break;
            case 2:
                $("#"+this.id).html(this.renderer(this.id,this.formatter(this.value,this.prescale,this.fraction,this.unit),this.style));
                this.status=1;
                break;
        }
        // this.value = this.compute(arguments);
    }    
}

class Listener{
    constructor(id){
        this.listener= new Set();
        this.listener.add(id);
    }
    addListener(id){
        this.listener.add(id);
    }
}

class Container {
    constructor(){
        this.id=0;
        this.defVal="wait...";
        this.context = null;
        this.container= new Set();
    }
    setContext(context){
        this.context=context;
    }
    setDefaultValue(defVal){
        this.defVal=defVal;
    }
    addDF(args,style,renderer,compute,formatter,prescale,fraction,unit){
        var df = new DF(args,style,renderer,compute,formatter,prescale,fraction,unit);
        df.id="df"+this.id++;
        df.value=this.defVal;
        this.container.add(df);
        for (var i = 0, len = args.length; i < len; i++) {
            this.addTopic(args[i],df);
        }
    }
    addTopic(topic,df){
        _v.set(topic,null);
        if ( _l.get(topic) ){
            _l.get(topic).addListener(df);
        } else {
            _l.set(topic, new Listener(df));
            socket.on(topic,this.updateValue);
            console.log("poll "+topic);
            socket.emit('poll',topic);
        }
    }
    updateValue(topicvalue){
        var split = topicvalue.split('#', 2);
        var topic = split[0];
        var value = split[1];
        console.log("Listener "+topic+" : "+value);
        _v.set(topic,value);
        console.log(_l.get(topic).listener);
        for (let df of _l.get(topic).listener){
            console.log(df.id);
            console.log(df.compute(df.args));
            df.value = df.compute(df.args);
            df.status=2;
        }
        c.init();
    }
    init(){
        for (let df of this.container) {
            console.log(df.id);
            df.update(this.context);
        }
    }
}
const c = new Container();

