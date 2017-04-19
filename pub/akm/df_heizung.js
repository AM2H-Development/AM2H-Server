/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v */

var bgImage = {
    "background-image": "url(\"http://clicca.de/HeizungV2_image.svg\")",
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

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage(bgImage);
    c.setDefaultValue("wait..");
    c.addDF(["akm/m01/state/power01"],"width: 56px; left: 325px; top: 332px;"," kW",null,null,null,100,1 );
    c.addDF(["akm/m01/state/counter01"],"width: 78px; left: 203px; top: 362px;"," m³/d",null,null,null,100,2  );
    c.addDF(["akm/m01/state/counter02"],"width: 78px; left:  203px; top: 386px;"," m³/m",null,null,null,100,1 );
    // c.addDF(["akm/m01/state/counter03"],"width: 86px; left:  10px; top: 425px;"," m³",null,null,null,100,2 );
    c.addDF(["akm/d02/state/temp2"],"width: 56px; left: 801px; top: 460px;"," °C" );
    c.addDF(["akm/d02/state/temp3"],"width: 56px; left: 801px; top: 551px;"," °C" );
    c.addDF(["akm/d02/state/temp2","akm/d02/state/temp3"],"width: 56px; left:  825px; top: 505px;"," °C",null,cp,null,10,1); 
}    