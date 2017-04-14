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
var re = function(id,val,style){return "<div id=\""+id+"\" style=\""+style+"\">Wert: "+val+"</div>";};
var cp = function(a){return v.asF(a[0])-v.asF(a[1]);};
var fo = function(val,prescale,fraction,unit){
    // val =  (val+" ").replace(",", ".");
    val /= prescale;
    return val.toLocaleString('de-DE', {minimumFractionDigits: fraction, maximumFractionDigits: fraction}) + unit+"fo";
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage(bgImage);
    c.setDefaultValue("wait..");
    c.addDF(["akm/d04/state/temp1"],"width: 56px; left:  10px; top: 200px;" );
    c.addDF(["akm/d04/state/hum1"],"width: 56px; left:  10px; top: 225px;" );
    c.addDF(["akm/d04/state/temp2"],"width: 56px; left:  10px; top: 250px;" );
    c.addDF(["akm/d04/state/hum2"],"width: 56px; left:  10px; top: 275px;" );
    c.addDF(["akm/m02/state/power01"],"width: 86px; left:  10px; top: 120px;" );
    c.addDF(["akm/m03/state/power01"],"width: 86px; left:  10px; top: 150px;" );
    c.addDF(["akm/m02/state/power01","akm/m03/state/power01"],"width: 86px; left:  10px; top: 175px;",null,cp,null,10,2," °C" ); 
     
}    