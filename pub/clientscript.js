/* global df, cf, bgImage */

var socket = io();

$(document).ready(function () {
    initMDL();
    initAll();
});

function send() {
    socket.emit('set', 'mqtt/location/lueftung/set/waermetauscher/status#on');
}

function initAll() {
    $("#contentlayer").css(bgImage);
    
    var topic;
    for (topic in df) {
        var clickable = df[topic].clickable ? ' clickable' : '';
        var html =
                "<div id=\"" + topic + "\" class=\"df" + clickable + "\" " +
                "style=\"" + df[topic].style + "\" " +
                "data-unit=\"" + df[topic].unit + "\" " +
                "data-fraction=\"" + df[topic].fraction + "\" " +
                "data-prescale=\"" + df[topic].prescale + "\" " +
                "data-compute=\"" + df[topic].compute + "\" " +
                "data-topic=\"" + topic + "\" " +                
                "data-value=\""  + 0.0 + "\" " +                
                "data-type=\"" + df[topic].type + "\" " +
                ">wait...</div>";
        $("#contentlayer").append(html);
       
        socket.on(topic.replace(/-/g, '/'), function (message) {
            var split = message.split('#', 2);
            var id = "#" + split[0].replace(/\//g, '-');

            var value = split[1].replace(",", ".");

            $(id).data({'value':value});

            if ($(id).data('compute') != 'undefined'){
                value = df[$(id).attr('id')].compute(value);
            }

            if ($(id).data('type') == "df") {
                value /= $(id).data('prescale');
                value = value.toLocaleString('de-DE', {minimumFractionDigits: $(id).data('fraction'), maximumFractionDigits: $(id).data('fraction')}) +
                        $(id).data('unit');
            }
            console.log(id, value);

            $(id).text(value);
        });
        socket.emit('poll', topic.replace(/-/g, '/'));
    };
    
    for (topic in cf) {
        var clickable = cf[topic].clickable ? ' clickable' : '';
        var html =
                "<div id=\"" + topic + "\" class=\"df" + clickable + "\" " +
                "style=\"" + cf[topic].style + "\" " +
                "data-unit=\"" + cf[topic].unit + "\" " +
                "data-fraction=\"" + cf[topic].fraction + "\" " +
                "data-prescale=\"" + cf[topic].prescale + "\" " +
                "data-compute=\"" + cf[topic].compute + "\" " +
                "data-topic=\"" + topic + "\" " +                
                // "data-value=\""  + 0.0 + "\" " +                
                "data-type=\"" + cf[topic].type + "\" " +
                ">wait...</div>";
        $("#contentlayer").append(html);
       
        setInterval(function (id) {
            console.log(id);
            var value=0;
            if ($(id).data('compute') != 'undefined'){
                value = cf[$(id).data('topic')].compute(value);
            }

            if ($(id).data('type') == "df") {
                value /= $(id).data('prescale');
                value = value.toLocaleString('de-DE', {minimumFractionDigits: $(id).data('fraction'), maximumFractionDigits: $(id).data('fraction')}) +
                        $(id).data('unit');
            }
            console.log(id, value);
            $(id).data({'value':value});

            $(id).text(value);
        },1000,'#'+topic);
    };    
}

function initMDL(){
    
}