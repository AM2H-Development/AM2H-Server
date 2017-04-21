/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */


function drawChart(){}

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://qxf.de/HeizungV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
    });
    c.setDefaultValue("wait..");
    c.addDF(["mh/location/raum1/state/temperature"],"width: 80px; left:  10px; top: 175px;" );
    c.addDF(["mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 200px;","",re.std,null,null,100,2 );
    c.addDF(["mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 225px;","",re.std,null,fo.fo2 );
    c.addDF(["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 250px;","",re.std,cp.add );
    c.addDF(["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],"width: 80px; left:  10px; top: 275px;"," °C",re.std,cp.add,fo.std,10,2 );
    c.addDF({   topics: ["mh/location/raum1/state/temperature","mh/location/raum1/state/humidity"],
                style: "width: 80px; left:  10px; top: 300px;",
                unit: " °C",
                renderer: re.clickable,
                compute: cp.add,
                formatter: fo.fo2,
                prescale: 1000,
                fraction: 2
            });
    c.addDF({   topics: ["mh/location/raum1/state/temperature"],
                style: "width: 120px; left:  10px; top: 325px;",
                renderer: re.input
            });
    c.addDF({   topics: ["mh/location/raum1/state/switch"],
            style: "width: 120px; left:  10px; top: 350px;",
            renderer: re.toggleIcon,
            formatter: fo.none,        
            compute: cp.toggle,
            icons: ["replay","touch_app"]
            });
    c.addDF({   topics: ["mh/location/raum1/state/switch"],
            style: "width: 120px; left:  10px; top: 420px;",
            renderer: re.toggleImage,
            formatter: fo.none,        
            compute: cp.toggle,
            icons: ["/icons/Light_bulb_(yellow)_icon.svg","/icons/Light_bulb_(outline)_icon.svg","/icons/Light_bulb_(grey)_icon.svg"]
            });
    c.addDF({   topics: ["mh/event/timer/seconds"],
            style: "width: 120px; left:  10px; top: 450px;",
            formatter: fo.none        
            });
}