/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global _v, c */

var bgImage = {
    "background-image": "url(\"http://qxf.de/HeizungV2_image.svg\")",
    "width": "1030px",
    "height": "620px",
    "background-size": "1030px 620px"
};
var re = function(id,val,style){return "<div id=\""+id+"\" style=\""+style+"\">Wert: "+val+"</div>";};
var cp = function(a){return _v.get(a[0])*1+_v.get(a[1])*1;};
var fo = function(val,prescale,fraction,unit){
    val =  (val+" ").replace(",", ".");
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
    c.addDF(["mh/location/raum1/state/temperature"],"display:inline;" );
    c.addDF(["mh/location/raum1/state/humidity"],"display:block",re,null,null,100,2 );
    c.addDF(["mh/location/raum1/state/humidity"],"display:block",re,null,fo2 );
    c.addDF(["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],"display:block",re,cp );
    c.addDF(["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],"display:block",re,cp,fo,10,2," °C" );
    c.render();
}    