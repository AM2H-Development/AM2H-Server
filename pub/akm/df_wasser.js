/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v */

var bgImage = {
    "background-image": "url(\"http://clicca.de/WasserV2_image.svg\")",
    "width": "1030px",
    "height": "620px",
    "background-size": "1030px 620px"
};
var re = function(id,val,style){
    if (parseInt(val)>0){
        style +="background-color: lightgreen;"
    } else {
        style +="background-color: lightyellow;"
        val = val.substr(1);
    }
    return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";
};
var re1 = function(id,val,style){
    if (parseInt(val)<0){
        style +="background-color: lightgreen;"
    } else {
        style +="background-color: lightyellow;"
           }
    return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";
};
var re2 = function(id,val,style){
    if (parseInt(val)<0){
        style +="background-color: lightgreen;"
    } else {
        style +="background-color: lightyellow;"
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
    c.addDF(["akm/d05/state/temp01"],"width: 56px; left: 54px; top: 331px;"," °C" );
}    