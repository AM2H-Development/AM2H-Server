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

t.addLogger({   topic:"mh/l/h1/state/t01",  // Topic to log
                condition:"every", // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                interval:5, // for every, atLeast, atMost
                newonly:false // optional: log only new values
            }).addCleanup({ unit:"seconds",
                            lifespan:30
                        });

t.addLogger({   topic:"mh/l/h1/state/t02",  // Topic to log
                condition:"atLeast", // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                interval:5, // for every, atLeast, atMost
                newonly:false // optional: log only new values
            }).addCleanup({ unit:"seconds",
                            lifespan:30
                        });

t.addLogger({   topic:"mh/l/m01/state/c01",  // Topic to log
                condition:"onEvent", // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                trigger:"mh/event/timer/",
                newonly:false // optional: log only new values
            }).addCleanup({ unit:"seconds",
                            lifespan:30
                        });


t.addLogger({topic:"mh/location/raum1/state/humidity",condition:"onEvent",trigger:"mh/location/raum1/state/switch"});
t.addCleanup({topic:"mh/event/timer/seconds",unit:"seconds",lifespan:30});

t.addLogger({topic:"mh/event/timer/dawn",condition:"all"});

t.addLogger({topic:"mh/event/timer/dusk",condition:"all"});

