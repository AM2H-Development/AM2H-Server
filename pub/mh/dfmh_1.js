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
                style: "width: 120px; left:  10px; top: 320px;",
                renderer: re.input
            });
    c.addDF({   topics: ["mh/location/raum1/state/switch"],
            style: "width: 120px; left:  10px; top: 320px;",
            renderer: re.toggle,
            formatter: fo.none,        
            compute: cp.toggle,
            icons: ["replay","touch_app"]
            });

}