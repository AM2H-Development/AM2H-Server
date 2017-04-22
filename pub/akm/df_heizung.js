/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var cp1 = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
    // if (val + v.asF(a[1])>0) val *=-1; 
    return val;
};

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/HeizungV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
            });
    c.setDefaultValue("wait..");
    c.addDF({   topics: ["akm/m01/state/power01"],
                style: "width: 56px; left: 325px; top: 332px;",
                unit: " kW",
                renderer: re.clickable,
                prescale: 100,
                fraction: 1
            });
    c.addDF({   topics: ["akm/m01/state/counter01"],
                style: "width: 78px; left:  203px; top: 362px;",
                unit: " m³/d",
                renderer: re.clickable,
                prescale: 100,
                fraction: 2
            });    
    c.addDF({   topics: ["akm/m01/state/counter02"],
                style: "width: 78px; left:  203px; top: 386px;",
                unit: " m³/m",
                renderer: re.clickable,
                prescale: 100,
                fraction: 1
            }); 
    c.addDF({   topics: ["akm/d02/state/temp2"],
                style: "width: 56px; left: 801px; top: 460px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["akm/d02/state/temp3"],
                style: "width: 56px; left: 801px; top: 551px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            }); 
    c.addDF({   topics: ["akm/d02/state/temp2","akm/d02/state/temp3"],
                style: "width: 42px; left:  759px; top: 506px;",
                unit: " °C",
                renderer: re.none,
                compute: cp1,
                prescale: 10,
                fraction: 1
            });    
           
}