/* global __dirname */
'use strict';
var cfg = require('./config');
console.log(cfg.host);


var _ = require('underscore');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;

// Express Webserver
const server = express()
        .use(express.static(__dirname + '/pub'))
        .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);

// mySQL Client
var mysql = require('mysql');
var mysqlClient = mysql.createConnection({
  host     : cfg.host,
  user     : cfg.mysqlUser,
  password : cfg.mysqlPassword
});
mysqlClient.connect();

mysqlClient.query('CREATE DATABASE IF NOT EXISTS ' + cfg.database +';', function (error) {
    if (error) throw error;
}); 

mysqlClient.query("CREATE TABLE IF NOT EXISTS " + cfg.database + "." + cfg.database +" ("
                    + " id BIGINT AUTO_INCREMENT PRIMARY KEY,"
                    + " topic VARCHAR(255), message VARCHAR(255),"
                    + " ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                    + ");", function (error) {
    if (error) throw error;
}); 


// MQTT Client
var mqtt = require('mqtt');
var mqttClient  = mqtt.connect('mqtt://' + cfg.host);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('poll', (data) => respondPoll(data,socket));
    socket.on('set', (data) => respondSet(data,socket));    
    socket.on('disconnect', () => console.log('Client disconnected'));
});

function respondPoll(data,socket){
    console.log('Client ask for ' + data.toString() + ' on ' + socket.id);
    var query = mysqlClient.query('SELECT message FROM '+ cfg.database +'.' + cfg.database + ' WHERE topic = ? ORDER BY id DESC LIMIT 1', data.toString());
    // console.log(query.sql);
    
    query.on('error', (error) => {
        throw error;
    });
    
    query.on('result', (result) => {
        console.log(result.valueOf());
        socket.emit(data.toString(),data.toString() + "#" + result.message);
    });
}

function respondSet(data,socket){
    var split = data.split('#',2);
    mqttClient.publish(split[0],split[1]);
    console.log('Client sent ' + data.toString() + ' on ' + socket.id);
}

/*mysqlClient.query('SELECT * FROM mqtt LIMIT 1', function (error, results) {
    if (error) throw error;
    _.each(results, (row) => showRow(row));
   
}); */
 
mqttClient.on('connect', function () {
  mqttClient.subscribe(cfg.database + '/#');
  console.log("MQTT connected");
});
 
mqttClient.on('message', function (topic, message) {
    console.log(topic.toString() + "#" + message.toString());
    var post  = {message: message.toString(), topic: topic.toString()};
    mysqlClient.query('INSERT INTO '+ cfg.database +'.' + cfg.database + ' SET ?', post, function (error) {
        if (error) throw error;
    });
    io.emit(topic,topic + "#" + message.toString());
});


// setInterval(() => io.emit('time', new Date().toTimeString()), 10000);