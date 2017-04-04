/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 */
var bgImage = {
    "background-image": "url(\"http://qxf.de/HeizungV2_image.svg\")",
    "width": "1030px",
    "height": "620px",
    "background-size": "1030px 620px"
};

var df = {
    "mqtt-devices-esp1-state":{
        "type":"text",
        "style":"width: 56px; left:  10px; top: 10px;",
        "unit":"",
        "fraction":"1",
        "prescale":"10",
        "clickable":true,
        "images":{"on":"/bild1.svg","off":"bild-off.svg","auto":"auto.jpg"}
    },
    "mh-location-raum1-state-temperature":{
        "type":"df",
        "style":"width: 56px; left:  200px; top: 100px;",
        "unit":" %",
        "fraction":"1",
        "prescale":"10",
        "clickable":false,
        "compute":function (val){
            val *=1;
            return val;
        }
        
    },
    "mh-location-raum1-state-humidity":{
        "type":"df",
        "style":"width: 56px; left:  50px; top: 300px;",
        "unit":" &ordm;C",
        "fraction":"1",
        "prescale":"10",
        "clickable":true
    }
};

var cf = {
    "aaa":{
        "type":"df",
        "style":"width: 56px; left:  200px; top: 500px;",
        "unit":" %",
        "fraction":"1",
        "prescale":"10",
        "clickable":false,
        "compute":function (){
            var hum = $('#mh-location-raum1-state-humidity').data('value');
            var val = $('#mh-location-raum1-state-temperature').data('value');
            hum *=1;
            val *=1;
            console.log("compute " + val + hum);
            return val+hum;
        }
    },
    "bbb":{
        "type":"df",
        "style":"width: 56px; left:  100px; top: 500px;",
        "unit":" %",
        "fraction":"3",
        "prescale":"1",
        "clickable":false,
        "compute":function (){
            var hum = $('#mh-location-raum1-state-humidity').data('value');
            var val = $('#mh-location-raum1-state-temperature').data('value');
            hum *=1;
            val *=1;
            console.log("compute " + val + hum);
            return val/hum;
        }
    }    
};