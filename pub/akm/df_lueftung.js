/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

function drawChart(){}

var re1 = function(id,val,style){
    if (parseInt(val)<0){
        style +="background-color: lightblue;"
    } else {
        style +="background-color: lightyellow;"
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
        "background-image": "url(\"http://clicca.de/LueftungV2_image.svg\")",
        "width": "1030px",
        "height": "620px",
        "background-size": "1030px 620px"
    });
    c.setDefaultValue("wait..");
    c.addDF({   topics: ["akm/d04/state/temp1"],
                style: "width: 56px; left: 689px; top: 407px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["akm/d04/state/hum1"],
                style: "width: 56px; left: 689px; top: 431px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["akm/d04/state/temp2"],
                style: "width: 56px; left: 689px; top: 341px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });      
    c.addDF({   topics: ["akm/d04/state/hum2"],
                style: "width: 56px; left: 689px; top: 365px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });          
    c.addDF({   topics: ["akm/d04/state/temp1","akm/d04/state/temp2"],
                style: "width: 56px; left:  795px; top: 385px;",
                unit: " °C",
                compute: cp1,
                renderer: re1,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["akm/d05/state/temp01"],
                style: "width: 56px; left: 54px; top: 318px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });    
    c.addDF({   topics: ["akm/d05/state/hum01"],
                style: "width: 56px; left: 54px; top: 342px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            }); 
    c.addDF({   topics: ["akm/d05/state/mode01"],
                style: "width: 10px; left: 186px; top: 415px;",
                renderer: re.toggleImage,
                formatter: fo.none,        
                compute: cp.toggle,
                icons: ["/icons/Zuluft_direkt_icon.svg","/icons/Zuluft_EWT_icon.svg"]
                });
    c.addDF({   topics: ["akm/d05/state/mode02"],
                style: "width: 10px; left: 391px; top: 428px;",
                renderer: re.toggleImage,
                formatter: fo.none,        
                compute: cp.toggle,
                icons: ["/icons/Bypass_offen_icon.svg","/icons/Bypass_geschlossen_icon.svg"]
            });
    c.addDF({   topics: ["akm/d05/state/mode02"],
                style: "width: 100px; left:  220px; top: 500px;",
                unit: " °C",
                renderer: re.input,
                prescale: 10,
                fraction: 1
            });
    c.addDF({   topics: ["akm/d05/state/temp01"],
                style: "width: 56px; left: 257px; top: 439px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            }); 
    c.addDF({   topics: ["akm/d05/state/temp01"],
                style: "width: 56px; left: 491px; top: 439px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });             
}