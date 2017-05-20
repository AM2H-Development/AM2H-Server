/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var cp1 = function(a){
  if (v.asI(a[1]==1)) return "-";    
    return v.asI(a[0]);
};

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
                style: "width: 48px; left: 633px; top: 459px;",
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
    c.addDF({   topics: ["akm/d01/state/state02"],
                style: "width: 26px; left: 497px; top: 392px;",
                unit: "",
                renderer: re.clickable,
                prescale: 1,
                fraction: 0
            });
    c.addDF({   topics: ["akm/d01/state/temp03","akm/d01/state/state01"],
                style: "width: 56px; left: 765px; top: 460px;",
                unit: " °C",
                compute: cp1,            
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["akm/d01/state/temp04","akm/d01/state/state01"],
                style: "width: 56px; left: 765px; top: 551px;",
                unit: " °C",
                //compute: cp1,            
                //formatter: fp1,
                renderer: re.clickable,                
                prescale: 10,
                fraction: 1
            });            
}    