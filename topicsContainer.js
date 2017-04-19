/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Topic : log [atLeast:interval,atMost:interval,every:interval,onEvent:[internal,external]], storageLife: interval, fireMqtt: [true,false]

const m = new Map();
var cnt =0;

class T {
    constructor(){
        console.log("T constructor: ");
    }
    add(topic,options){
        m.set(topic,options);

    }
    printM(){
        return m.size;
    }
    poll(){
        for (var topic of m){
            console.log(topic);
        }
    }
}

module.exports=new T();
