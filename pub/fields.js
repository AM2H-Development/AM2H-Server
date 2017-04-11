/* 
Felddefinition
V1.0.0 vom 10.04.2017
*/
/* global Function, NaN */

$(document).ready(function () {
    initAll();
});

class DF {
    constructor(args,style,renderer,compute){
        this.id=null;
        this.status=0; // 0=not initialized, 1=initialized and valid, 2=initialized need redraw
        this.style=style;
        this.args=args;
        this.value=null;
        if (renderer instanceof Function){
            this.renderer=renderer;
        } else {
            this.renderer=function(id,val,style){return "<div id=\""+id+"\" style=\""+style+"\">"+val+"</div>";};
        }
        if (compute instanceof Function){
            this.compute=compute;
        } else {
            this.compute=function(){return arguments[0];};
        }
    }
    
    update(context){
        switch (this.status){
            case 0:
                $(context).append(this.renderer(this.id,this.value,this.style));
                this.status=1;
                break;
            case 2:
                $(context).html(this.renderer(this.id,this.value,this.style));
                this.status=1;
                break;
        }
        // this.value = this.compute(arguments);
    }    
}

var df = function(id,val,style){return "<div id=\""+id+"\" style=\""+style+"\">Wert: "+val+"</div>";};
var cp = function(){return arguments[0]*2;};

class Value{
    constructor(id){
        this.value= new Set();
        this.value.add(id);
    }
}

class Values{
    constructor(){
        this.values = new Map();
    }    
    addTopic(topic,id){
        if ( this.values.get(topic) ){
            this.values.get(topic).value.add(id);
        } else {
            this.values.set(topic, new Value(id));
        }
    }
}
class Container {
    constructor(context){
        this.id=0;
        this.context = context;
        this.container= new Set();
        this.values= new Values();
    }
    addDF(args,style,renderer,compute){
        var df = new DF(args,style,renderer,compute);
        df.id="df"+this.id++;
        df.value="wait...";
        this.container.add(df);
        this.values.addTopic(df.args,df.id);
    }
    update(){
        for (let item of this.container) {
            console.log(item.id);
            item.update(this.context);
        }
    }
    
}

var c = new Container("#contentlayer");

c.addDF("/mh/location","display:inline;" );
c.addDF("/mh/location","",df );
c.addDF("/mh/location","",df,cp );

function initAll(){
    c.update();
}
