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
var re = function(id,val,style){
    if (parseInt(val)>0){
        style +="background-color: lightgreen;"
    } else {
        style +="background-color: lightyellow;"
        val = val.substr(1);
    }
    return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";
};
var cp = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    if (val + v.asF(a[1])>0) val *=-1; 
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
    c.addDF(["akm/d04/state/temp1"],"width: 56px; left:  10px; top: 200px;"," °C" );
    c.addDF(["akm/d04/state/hum1"],"width: 56px; left:  10px; top: 225px;"," °C" );
    c.addDF(["akm/d04/state/temp2"],"width: 56px; left:  10px; top: 250px;"," °C" );
    c.addDF(["akm/d04/state/hum2"],"width: 56px; left:  10px; top: 275px;"," °C" );
    c.addDF(["akm/m02/state/power01"],"width: 86px; left:  10px; top: 120px;"," W",null,null,null,100,1);
    c.addDF(["akm/m03/state/power01"],"width: 86px; left:  10px; top: 150px;"," W",null,null,null,100,1);
    c.addDF(["akm/m02/state/power01","akm/m03/state/power01"],"width: 86px; left:  10px; top: 175px;"," W",re,cp,null,100,1); 
     
}    