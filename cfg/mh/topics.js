/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const t = require('../../topicsLogger');
t.addLogger({topic:"mh/event/timer/seconds",condition:"every",interval:5});
t.addLogger({topic:"mh/event/timer/minutes",condition:"atLeast",interval:18});
t.addLogger({topic:"mh/location/raum1/state/humidity",condition:"all"});
t.addLogger({topic:"mh/location/raum1/state/switch",condition:"atMost",interval:5});
t.addLogger({topic:"mh/location/raum1/state/temperature",condition:"onEvent",trigger:"mh/location/raum1/state/switch"});

//t.addReact(); 