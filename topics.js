/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const m = new Map();
var cnt =0;

class T {
    constructor(){
        console.log("T constructor: ");
    }
    hello(hello){
        console.log("Hello, "+hello);
                m.set(cnt++,"2");

    }
    printM(){
        return m.size;
    }
}

module.exports=new T();
