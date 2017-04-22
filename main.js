/* Node-Server Startpunkt
 * (c) 2017
 * V.2.0.0
 */
/* global __dirname */
'use strict';

// Load Main Configuration
var cfg = require('./cfg/config');
console.log(cfg.host);

// Topics Logger
const t = require('./topicsLogger');
t.setCfg(cfg);
require('./cfg/'+cfg.database+'/topics');
t.list();

// MQTT React
const r = require('./mqttReact');
require('./cfg/'+cfg.database+'/react');


// Load Dynamic Pages Structure
var menu = require('./cfg/'+cfg.database+'/menu');

// Express Webserver and Socket.io
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname + '/pub'));
app.use(express.static(__dirname + '/pub/' + cfg.database));
app.set('view engine', 'ejs');
const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);

app.get('/', (req, res) => {
    console.log("REQ:" + req.query.view);
    var page = req.query.view;
    if (page === undefined || menu[page] === undefined) page='default';
    res.render('pages/index',{active:page, menu : menu });
});

// mySQL Client
var mysql = require('mysql');
var mysqlClient = mysql.createConnection({
  host     : cfg.host,
  user     : cfg.mysqlUser,
  password : cfg.mysqlPassword
});
mysqlClient.connect();
t.setMysqlClient(mysqlClient);
t.start();

mysqlClient.query('CREATE DATABASE IF NOT EXISTS ' + cfg.database +';', (error) => {
    if (error) throw error;
}); 

mysqlClient.query("CREATE TABLE IF NOT EXISTS " + cfg.database + "." + cfg.database +" ("
                    + " id BIGINT AUTO_INCREMENT PRIMARY KEY,"
                    + " topic VARCHAR(255), message VARCHAR(255),"
                    + " ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                    + ");", (error) => {
    if (error) throw error;
}); 

/*
    var _ = require('underscore');
    mysqlClient.query('SELECT * FROM mqtt LIMIT 1', function (error, results) {
    if (error) throw error;
    _.each(results, (row) => showRow(row));
   
}); */


// MQTT Client
const mqtt = require('mqtt');
const mqttClient  = mqtt.connect('mqtt://' + cfg.host);

mqttClient.on('connect', () => {
    mqttClient.subscribe(cfg.database + '/#');
    console.log("MQTT connected");
});
 
mqttClient.on('message', (topic, message, pg) => {
    //console.log("Received from MQTT: " + topic.toString() + " value: " + message.toString());
    var post  = {message: message.toString(), topic: topic.toString()};
    /* mysqlClient.query('INSERT INTO '+ cfg.database +'.' + cfg.database + ' SET ?', post, (error) =>{
        if (error) throw error;
    });*/
    t.trigger(topic,message);
    io.emit(topic,post);
});

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('poll', (data) => {
        console.log('Client ask for ' + data.toString() + ' on ' + socket.id);
        var query = mysqlClient.query('SELECT message FROM '+ cfg.database +'.' + cfg.database + ' WHERE topic = ? ORDER BY id DESC LIMIT 1', data.toString());
        query.on('error', (error) => {
            throw error;
        });
        query.on('result', (result) => {
            console.log("Send to client " + data.toString() + " value: " + result.message);
            socket.emit(data.toString(),{topic:data.toString(),message:result.message});
        });
    });
    socket.on('set', (data) => {
        mqttClient.publish(data.topic,data.message);
        console.log('Client sent ' + data.topic + ' with value: ' + data.message + ' on ' + socket.id);
    });    
    socket.on('disconnect', () => console.log('Client disconnected'));
});

// MQTT Timer
const timer = require('./mqttTimer');
timer.setMqtt(cfg);
timer.start();
