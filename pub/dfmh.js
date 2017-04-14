/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v */

var bgImage = {
    "background-image": "url(\"http://qxf.de/HeizungV2_image.svg\")",
    "width": "1030px",
    "height": "620px",
    "background-size": "1030px 620px"
};
var re = function(id,val,style){return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";};
var cp = function(a){return v.asF(a[0])+v.asF(a[1]);};
var fo = function(val,prescale,fraction,unit){
    // val =  (val+" ").replace(",", ".");
    val /= prescale;
    return val.toLocaleString('de-DE', {minimumFractionDigits: fraction, maximumFractionDigits: fraction}) + unit+"fo";
};
var fo2= function(val){
    return "fo2 "+val;
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage(bgImage);
    c.setDefaultValue("wait..");
    c.addDF(["mh/location/raum1/state/temperature"],"width: 80px; left:  10px; top: 175px;" );
    c.addDF(["mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 200px;","",re,null,null,100,2 );
    c.addDF(["mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 225px;","",re,null,fo2 );
    c.addDF(["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 250px;","",re,cp );
    c.addDF(["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 275px;"," °C",re,cp,fo,10,2 );
    c.addDF({   topics: ["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],
                style: "width: 80px; left:  10px; top: 300px;",
                unit: " °C",
                renderer: re,
                compute: cp,
                formatter: fo,
                prescale: 1000,
                fraction: 2
            });
}