/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * cleanup available units:
 * Key          Short
 * years	y
 * quarters	Q
 * months	M
 * weeks	w
 * days         d
 * hours	h
 * minutes	m
 * seconds	s
 */

const t = require('../../topicsLogger');

t.addLogger({topic:"mh/event/timer/seconds",condition:"every",interval:5})
        .addCleanup({unit:"seconds",lifespan:30});

t.addLogger({topic:"mh/event/timer/minutes",condition:"atLeast",interval:18})
        .addCleanup({unit:"seconds",lifespan:30});

t.addLogger({topic:"mh/location/raum1/state/temperature",condition:"all",newonly:true})
        .addCleanup({unit:"hours",lifespan:30});

t.addLogger({topic:"mh/location/raum1/state/switch",condition:"atMost",interval:5});

t.addLogger({topic:"mh/location/raum1/state/humidity",condition:"onEvent",trigger:"mh/location/raum1/state/switch"});
t.addCleanup({topic:"mh/event/timer/seconds",unit:"seconds",lifespan:30});

t.addLogger({topic:"mh/event/timer/dawn",condition:"all"});

t.addLogger({topic:"mh/event/timer/dusk",condition:"all"});

