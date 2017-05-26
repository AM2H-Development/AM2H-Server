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

// Heizung

t.addLogger({topic:"akm/d01/state/temp01",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/temp02",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/temp03",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/temp04",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/temp05",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/power01",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/power02",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/state01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/state02",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/counter01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d01/state/counter02",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});

t.addLogger({topic:"akm/m01/state/power01",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m01/state/counter01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m01/state/counter02",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});

t.addLogger({topic:"akm/d02/state/temp2",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d02/state/temp3",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});

// Lueftung

t.addLogger({topic:"akm/d04/state/temp1",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d04/state/hum1",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d04/state/temp2",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d04/state/hum2",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});

t.addLogger({topic:"akm/d05/state/temp01",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d05/state/hum01",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d05/state/mode01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/d05/state/mode02",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/location/buero/state/temp01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/location/buero/state/hum01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});

// Strom

t.addLogger({topic:"akm/m02/state/power01",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m02/state/counter01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m02/state/counter02",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m02/state/counterLastDay01",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m02/state/counterLastDay02",condition:"all",neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m03/state/counterLastDay01",condition:"all",newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m03/state/counterLastDay02",condition:"all",neonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m03/state/power01",condition:"every",interval:15}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m03/state/counter01",condition:"every",interval:15,newonly:true}).addCleanup({unit:"years",lifespan:10});
t.addLogger({topic:"akm/m03/state/counter02",condition:"every",interval:15,neonly:true}).addCleanup({unit:"years",lifespan:10});



/*

t.addLogger({   topic:"akm/m01/state/power01",      // Topic to log
                condition:"every",                  // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                interval:15,                        // for every, atLeast, atMost
                newonly:false                       // optional: log only new values
            }).addCleanup({ unit:"years",
                            lifespan:2
                        });
                        
t.addLogger({   topic:"akm/m01/state/counter01",    // Topic to log
                condition:"every",                  // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                interval:15,                        // for every, atLeast, atMost
                newonly:false                       // optional: log only new values
            }).addCleanup({ unit:"years",
                            lifespan:2
                        });

t.addLogger({   topic:"akm/m02/state/power01",      // Topic to log
                condition:"every",                  // Condition: all, every (s), atLeast (s), atMost(s), onEvent (trigger)
                interval:15,                         // for every, atLeast, atMost
                newonly:false                       // optional: log only new values
            }).addCleanup({ unit:"years",
                            lifespan:2
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

*/