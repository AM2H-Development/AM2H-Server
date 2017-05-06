/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const t = require('../../topicsLogger');
t.addLogger({topic:"akm/event/timer/seconds",condition:"every",interval:5});
t.addLogger({topic:"akm/event/timer/minutes",condition:"atLeast",interval:18});
t.addLogger({topic:"akm/location/raum1/state/humidity",condition:"all"});
t.addLogger({topic:"akm/location/raum1/state/switch",condition:"atMost",interval:5});
t.addLogger({topic:"akm/location/raum1/state/temperature",condition:"onEvent",trigger:"mh/location/raum1/state/switch"});

//t.addReact(source:{topic:"akm/location/gas/state/counter"},targetTopic:"mh/location/gas/state/counterlastday",condition:"onEvent",trigger:"mh/event/timer/date"); 
//t.addReact(source:{topic:"akm/location/raum1/state/switch"},targetTopic:"mh/location/raum1/state/lamp",condition:"onEvent",trigger:"mh/event/timer/date"); 
//t.addReact(source:{message:"on"},targetTopic:"akm/location/raum1/state/lamp",condition:"onEvent",trigger:"mh/event/timer/date"); 
