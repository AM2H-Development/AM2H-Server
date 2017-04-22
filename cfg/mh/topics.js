/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const t = require('../../topicsLogger');
t.addLogger({topic:"mh/event/timer/seconds",condition:"every",interval:5});
t.addLogger({topic:"mh/event/timer/minutes",condition:"atLeast",interval:18});
t.addLogger({topic:"mh/location/raum1/state/temperature",condition:"all",newonly:true});
t.addLogger({topic:"mh/location/raum1/state/switch",condition:"atMost",interval:5});
t.addLogger({topic:"mh/location/raum1/state/humidity",condition:"onEvent",trigger:"mh/location/raum1/state/switch"});

t.addCleanup({topic:"mh/event/timer/seconds",unit:"seconds",lifespan:30});

//t.addReact(source:{topic:"mh/location/gas/state/counter"},targetTopic:"mh/location/gas/state/counterlastday",condition:"onEvent",trigger:"mh/event/timer/date"); 
//t.addReact(source:{topic:"mh/location/raum1/state/switch"},targetTopic:"mh/location/raum1/state/lamp",condition:"onEvent",trigger:"mh/event/timer/date"); 
//t.addReact(source:{message:"on"},targetTopic:"mh/location/raum1/state/lamp",condition:"onEvent",trigger:"mh/event/timer/date"); 
