/* 
Felddefinition
V2.0.3 vom 14.04.2017
*/
/* global Function, ds */

var socket = io();

$(document).ready(function () {
    initFields();
});

var re={},cp={},fo={};

const _l = new Map();
const _v = new Map();
const _o = new Map();

class V{
    asI(v){
        return parseInt(_v.get(v),10);
    }
    asF(v,defV=0){
        var val = _v.get(v);
        if (val===null) val=defV;
        return parseFloat(val.toString().replace(",", "."),10);
    }
    asS(v){
        return _v.get(v).toString();
    }
}
const v = new V();

class DF {
    constructor(args,style,renderer,compute,formatter,prescale=10,fraction=1,unit="",icons){
        this.id=null;
        this.status=0; // 0=not initialized, 1=initialized and valid, 2=initialized need redraw
        this.style=style;
        this.args=args;
        this.value=null;
        this.prescale=prescale;
        this.fraction=fraction;
        this.unit=unit;
        this.icons=icons;
        if (renderer instanceof Function){
            this.renderer=renderer;
        } else {
            this.renderer=function(id,val,style){return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";};
        }
        if (compute instanceof Function){
            this.compute=compute;
        } else {
            this.compute=function(args){return v.asF(args[0]);};
        }
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
                // console.log(this.id + " "+ this.status + " " + this.value);
                // throw new Error("stop!");
                $("#"+this.id).replaceWith(this.renderer(this.id,this.formatter(this.value,this.prescale,this.fraction,this.unit),this.style));
                this.status=1;
                break;
        }
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

var renderInProcess=false;
class Container {
    constructor(){
        this.id=0;
        this.defVal="wait...";
        this.context = null;
        this.bgImage="";
        this.container= new Set();
    }
    setContext(context){
        this.context=context;
    }
    setDefaultValue(defVal){
        this.defVal=defVal;
    }
    setBgImage(bgImage){
        this.bgImage=bgImage;
    }
    addDF(args,style,unit,renderer,compute,formatter,prescale,fraction){
        var icons;
        var topics=args;
        if(arguments.length<2){
            style = args.style;
            unit = args.unit;
            renderer = args.renderer;
            compute = args.compute;
            formatter = args.formatter;
            prescale = args.prescale;
            fraction = args.fraction;
            topics = args.topics;
            icons = args.icons;
            // console.log(icons);
        }
        var df = new DF(topics,style,renderer,compute,formatter,prescale,fraction,unit,icons);
        df.id="df"+this.id++;
        df.value=this.defVal;
        this.container.add(df);
        _o.set(df.id,df);
        for (var i = 0, len = topics.length; i < len; i++) {
            this.addTopic(topics[i],df);
        }
    }
    addTopic(topic,df){
        _v.set(topic,null);
        if ( _l.get(topic) ){
            _l.get(topic).addListener(df);
        } else {
            _l.set(topic, new Listener(df));
            socket.on(topic,this.updateValue);
            socket.emit('poll',topic);
        }
        c.render();
    }
    updateValue(topicvalue){
        // var split = topicvalue.split('#', 2);
        var topic = topicvalue.topic; // split[0];
        var value = topicvalue.message; //split[1];
        console.log("Listener "+topic+" : "+value);
        _v.set(topic,value);
        // console.log(_l.get(topic).listener);
        for (let df of _l.get(topic).listener){
            // console.log(df.id);
            // console.log(df.compute(df.args));
            df.value = df.compute(df.args);
            df.status=2;
            // console.log(_l);
        }
        c.render();
    }
    render(){
        if (!renderInProcess){
            renderInProcess=true;
            $(this.context).css(this.bgImage);

            for (let df of this.container) {
                // console.log("Render: "+df.id);
                df.update(this.context);
            }
            renderInProcess=false;
        }
    }
    send(topicmessage){
        //console.log(topicmessage);
        if (!isNaN(topicmessage.message)) topicmessage.message+="";
        //console.log(topicmessage);
        socket.emit('set',topicmessage);
    }
}
const c = new Container();

