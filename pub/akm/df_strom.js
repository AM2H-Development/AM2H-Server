/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var re1 = function(id,val,style){
    if (parseInt(val)<0){
        style +="background-color: lightgreen;";
    } else {
        style +="background-color: lightyellow;";
           }
    return "<div class=\"df\" id=\""+id+"\" style=\""+style+"\">"+val+"</div>";
};

var cp1 = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    // if (val + v.asF(a[1])>0) val *=-1; 
    return val;
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/StromV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
    });
    c.setDefaultValue("wait..");
    c.addDF({   topics: ["akm/m02/state/power01"],
                style: "width: 78px; left:  204px; top: 355px;",
                unit: " W",
                renderer: re1,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["akm/m02/state/counter01"],
                style: "width: 88px; left:  194px; top: 388px;",
                unit: " kWh",
                renderer: re.clickable,
                prescale: 10000,
                fraction: 2
            });    
    c.addDF({   topics: ["akm/m02/state/counter02"],
                style: "width: 88px; left:  194px; top: 412px;",
                unit: " kWh",
                renderer: re.clickable,
                prescale: 10000,
                fraction: 1
            });      
    c.addDF({   topics: ["akm/m03/state/power01"],
                style: "width: 78px; left:  418px; top: 355px;",
                unit: " W",
                renderer: re1,
                prescale: 10,
                fraction: 1
            });          
    c.addDF({   topics: ["akm/m03/state/counter01"],
                style: "width: 88px; left:  408px; top: 388px;",
                unit: " kWh",
                renderer: re.clickable,
                prescale: 10000,
                fraction: 2
            });
    c.addDF({   topics: ["akm/m03/state/counter02"],
                style: "width: 88px; left:  408px; top: 412px;",
                unit: " kWh",
                renderer: re.clickable,
                prescale: 10000,
                fraction: 1
            });  
    c.addDF({   topics: ["akm/m02/state/power01","akm/m03/state/power01"],
                style: "width: 78px; left:  204px; top: 298px;",
                unit: " W",
                renderer: re.clickable,
                compute: cp1,
                prescale: 10,
                fraction: 1
            });    
    
}
