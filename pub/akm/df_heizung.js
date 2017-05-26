/* 
 * AM2H V.2.0.0 (c)2017 
 */
/* global c, v, socket, bgImage, re, fo, cp */

var cp1 = function(a){
    var val = v.asF(a[0])-v.asF(a[1]);
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
    c.addDF({   topics: ["akm/d01/state/temp01"],
                style: "width: 56px; left: 54px; top: 325px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
            
    c.addDF({   topics: ["akm/d01/state/temp02"],
                style: "width: 56px; left: 452px; top: 332px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
            
    c.addDF({   topics: ["akm/d01/state/temp03"],
                style: "width: 56px; left: 452px; top: 399px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            }); 
            
    c.addDF({   topics: ["akm/d01/state/temp04"],
                style: "width: 56px; left: 632px; top: 388px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });         
            
    c.addDF({   topics: ["akm/d01/state/temp05"],
                style: "width: 48px; left: 310px; top: 459px;",
                unit: " °C",
                renderer: re.clickable,
                prescale: 10,
                fraction: 1
            });
            
    c.addDF({   topics: ["akm/d01/state/power01"],
               style: "width: 56px; left: 632px; top: 332px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 2,
                fraction: 1
            });        
            
    c.addDF({   topics: ["akm/d01/state/power02"],
                style: "width: 56px; left: 632px; top: 363px;",
                unit: " %",
                renderer: re.clickable,
                prescale: 1,
                fraction: 1
            });  

    c.addDF({   topics: ["akm/d01/state/state01"],
                style: "width: 20px; left: 573px; top: 407px;",
                unit: "",
                renderer: re.image,
                icons: ["/icons/Ventil_(Outline)_icon.svg","/icons/Ventil_(Heizen)_icon.svg","Ventil_(Befuellen)_icon","/icons/Ventil_(Wasser)_icon.svg"],                
                formatter: fo.none
    });  
            
    c.addDF({   topics: ["akm/d01/state/counter01"],
                style: "width: 56px; left: 632px; top: 307px;",
                unit: "",
                renderer: re.none,
                prescale: 1,
                fraction: 0
            });              
            
    c.addDF({   topics: ["akm/d01/state/counter02"],
                style: "width: 26px; left:  220px; top: 250px;",
                unit: "",
                renderer: re.none,
                prescale: 1,
                fraction: 0
            });  
    
    c.addDF({   topics: ["akm/m01/state/power01"],
                style: "width: 56px; left: 326px; top: 332px;",
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