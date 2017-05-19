/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

function initFields(){
    c.setContext("#contentlayer");
    c.setBgImage({
        "background-image": "url(\"http://clicca.de/WasserV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
            });
    c.setDefaultValue("wait..");
    c.addDF({   topics: ["akm/d01/state/temp01"],
                style: "width: 56px; left: 54px; top: 325px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["akm/d01/state/temp05"],
                style: "width: 48px; left: 633px; top: 440px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["akm/d01/state/state02"],
                style: "width: 26px; left: 497px; top: 392px;",
                unit: "",
                renderer: re.clickable,
                prescale: 1,
                fraction: 0
            });
}    