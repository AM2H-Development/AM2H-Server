/* Node-Server Startpunkt
 * (c) 2017
 * V.2.0.2
 */
/* global __dirname */
'use strict';

// Logging
require('./logger');
var mainLog = require('winston').loggers.get('main');
var httpLog = require('winston').loggers.get('http');
var socketsLog = require('winston').loggers.get('sockets');
var mqttLog = require('winston').loggers.get('mqtt');

// Load Main Configuration
var cfg = require('./cfg/config');
mainLog.info(cfg.host);

// Topics Logger
const t = require('./topicsLogger');
t.setCfg(cfg);
require('./cfg/'+cfg.database+'/topics');
t.list();
t.start();

// MQTT React
const r = require('./mqttReact');
require('./cfg/'+cfg.database+'/react');

// Load Dynamic Pages Structure
var menu    = require('./cfg/'+cfg.database+'/menu');
var diagram = require('./cfg/'+cfg.database+'/diagram');

// Express Webserver and Socket.io
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname + '/pub'));
app.use(express.static(__dirname + '/pub/' + cfg.database));
app.set('view engine', 'ejs');
const server = app.listen(PORT, () => httpLog.info(`Listening on ${ PORT }`));
const io = socketIO(server);

app.get('/', (req, res) => {
    httpLog.info("REQ:" + req.query.view);
    var page = req.query.view;
    if (page === undefined || menu[page] === undefined) page='default';
    res.render('pages/index',{active:page, menu:menu, diagram:diagram });
});

// MQTT Client
const mqtt = require('mqtt');
const mqttClient  = mqtt.connect('mqtt://' + cfg.host);

mqttClient.on('connect', () => {
    mqttClient.subscribe(cfg.database + '/#');
    mqttLog.info("MQTT connected");
});
 
mqttClient.on('message', (topic, message, pg) => {
    mqttLog.debug("Received from MQTT: " + topic.toString() + " value: " + message.toString());
    var post  = {message: message.toString(), topic: topic.toString()};
    t.trigger(topic,message);
    io.emit(topic,post);
});

io.on('connection', (socket) => {
    socketsLog.info('Client connected');
    socket.on('poll', (data) => {
        socketsLog.debug('Client ask for ' + data.toString() + ' on ' + socket.id);
        var query = t.query(data);
        query.on('result', (result) => {
            socketsLog.debug("Send to client " + data.toString() + " value: " + result.message);
            socket.emit(data.toString(),{topic:data.toString(),message:result.message});
        });
    });
    socket.on('set', (data) => {
        mqttClient.publish(data.topic,data.message);
        mqttLog.debug('Client sent ' + data.topic + ' with value: ' + data.message + ' on ' + socket.id);
    });    
    socket.on('disconnect', () => socketsLog.info('Client disconnected'));
});

// MQTT Timer
const timer = require('./mqttTimer');
timer.setMqtt(cfg);
timer.start();
