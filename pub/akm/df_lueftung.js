/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

function drawChart(){}

function send(val) {
    socket.emit('set', 'akm/d05/state/mode02#'+val.replace(",", ".")*10);
}

function sendt(val) {
    socket.emit('set', 'akm/d05/state/mode01#'+val);
}

var bgImage = {
    "background-image": "url(\"http://clicca.de/LueftungV2_image.svg\")",
    "width": "1030px",
    "height": "620px",
    "background-size": "1030px 620px"
};
var re = function(id,val,style){
    if (parseInt(val)>0){
        style +="background-color: lightcoral;"
    } else {
        style +="background-color: lightblue;"
        //val = val.substr(1);
    }
    return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";
};

var cp = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    // if (val + v.asF(a[1])>0) val *=-1; 
    return val;
};
var fo = function(val,prescale,fraction,unit){
    // val =  (val+" ").replace(",", ".");
    val /= prescale;
    return val.toLocaleString('de-DE', {minimumFractionDigits: fraction, maximumFractionDigits: fraction}) + unit;
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage(bgImage);
    c.setDefaultValue("wait..");
    c.addDF(["akm/d04/state/temp1"],"width: 56px; left: 616px; top: 407px;"," °C" );
    c.addDF(["akm/d04/state/hum1"],"width: 56px; left: 616px; top: 431px;"," %" );
    c.addDF(["akm/d04/state/temp2"],"width: 56px; left: 616px; top: 341px;"," °C" );
    c.addDF(["akm/d04/state/hum2"],"width: 56px; left: 616px; top: 365px;"," %" );
    c.addDF(["akm/d04/state/temp1","akm/d04/state/temp2"],"width: 56px; left:  720px; top: 385px;"," °C",re,cp,null,10,1); 
    c.addDF(["akm/d05/state/temp01"],"width: 56px; left: 54px; top: 318px;"," °C" );
    c.addDF(["akm/d05/state/hum01"],"width: 56px; left: 54px; top: 342px;"," %" );
    c.addDF(["akm/d05/state/mode01"],"width: 10px; left: 215px; top: 398px;","",null,null,null,1,0 );
    c.addDF(["akm/d05/state/mode02"],"width: 10px; left: 215px; top: 440px;","",null,null,null,1,0 );
    c.addDF({   topics: ["akm/d05/state/mode01"],
                style: "width: 56px; left:  10px; top: 400px;",
                renderer: re.toggle,
                formatter: fo.none,        
                compute: cp.toggle,
                icons: ["replay","touch_app"]
                });

    c.addDF({   topics: ["akm/d05/state/mode02"],
                style: "width: 56px; left:  100px; top: 400px;",
                renderer: re.toggleImage,
                formatter: fo.none,        
                compute: cp.toggle,
                icons: ["/icons/Light_bulb_(yellow)_icon.svg","/icons/Light_bulb_(grey)_icon.svg"]
                });
                
    c.addDF({   topics: ["akm/d05/state/mode01"],
                style: "width: 120px; left:  100px; top: 320px;",
                renderer: re.input
                });
}    