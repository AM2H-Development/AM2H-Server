/* global google, openWeather */

// scripts.js V0.908 v. 07.01.2017
// (c) 2016,2017 AMÂ²H
//
google.charts.load('current', {'packages':['corechart'], 'language': 'de'});
var scriptName = /([^\/\/]+)$/.exec($(location).attr('href'))[0].split(".")[0];


function loadData() {
  var jsoncalls=0;
  var tschannel=0;
  $("#cloudactive").data("cloudstate","cloud_done");
  $("#cloudactive").text("cloud_download");
  $("#cloudactive-tt").text("Cloud OK");
      
  $(".df").each(function() {
    if ( $( this ).data("ts-field") != null && $( this ).data("ts-channel") != null && $( this ).data("ts-apikey") != null){
      if (tschannel != $( this ).data("ts-channel")){
        cloudactive++;
        tschannel=$( this ).data("ts-channel");
        url = 'https://api.thingspeak.com/channels/' + $( this ).data("ts-channel") + '/feeds/last_data_age.json?callback=' + $( this ).data("ts-channel") + '"&apikey=' + $( this ).data("ts-apikey"); 
        if ($( this ).data("ts-nostatus") == null || $( this ).data("ts-nostatus") != true) {
           $.get( url, function(data) {                                                                                                                                                                           
            var dta = data.split('"');
            if (dta[4] > tsTimeout) {$("#cloudactive").data("cloudstate","cloud_off"); $("#cloudactive-tt").text(dta[0] + ":" + dta[4] + " s");}
          },"text");
        }          
      }
      
      // https://api.thingspeak.com/channels/210880/fields/1/last.txt?api_key=9E6JE4NK8AIKN402
      var basevalue=0;
      if ( $( this ).data("ts-basefield") != null && $( this ).data("ts-basechannel") != null && $( this ).data("ts-baseapikey") != null){
          jQuery.ajax({
                  url: 'https://api.thingspeak.com/channels/' + $( this ).data("ts-basechannel") + '/fields/' + $( this ).data("ts-basefield") + '/last.txt?api_key=' + $( this ).data("ts-baseapikey"),
                  success: function (result) {
                       basevalue=result;
                  },
                  async: false
              });         
      }
      var cmp = getValue($( this ).data("compute"), 'defaultCompute');
      var unit = getValue($( this ).data("ts-unit"),'');
      var fraction = getValue($( this ).data("ts-fraction"),1);
      var url  = 'https://api.thingspeak.com/channels/' + $( this ).data("ts-channel") + '/fields/' + $( this ).data("ts-field") + '/last.txt?';
      url += 'prepend={"id":"' + $( this ).attr('id') + '","compute":"' + cmp + '","unit":"' + encodeURI(unit) + '","fraction":"' + fraction + '","basevalue":"' + basevalue + '","value":"';
      url += '&append="}&apikey=' + $( this ).data("ts-apikey"); 
      jsoncalls++;

      $.get( url, function(data) {
        var res= parseFloat(compute[data.compute](data.value.replace(",", "."),data.basevalue.replace(",", "."))).toLocaleString('de-DE',{minimumFractionDigits:data.fraction, maximumFractionDigits:data.fraction}) + "&nbsp;" + data.unit;
        $("#"+data.id).html(res);
        jsoncalls--;
        if (jsoncalls < 1) $("#cloudactive").text($("#cloudactive").data("cloudstate"));
      },"json");
    }
  });
}

  
function initAll(){
  $.getScript( scriptName + "_compute.js", function () {
    compute['defaultCompute'] = function ( input, basevalue ) { return input; };

    Object.keys(chartScale).forEach(function(key) {
      child = '<li data-interval="' + key + '" class="mdl-menu__item" onclick="updateGraphInterval(this);$(\'#linechart_progressbar\').show(); drawChart();">' + chartScale[key].label + '</li>';
      $("#chartScale").append(child);
      $("#detailcard").data("interval",key);
    });

    loadBackground();

    activateDF();
    
    activateOW();

    $(".mdl-menu__item").each( function(){
      componentHandler.upgradeElement(this);      
    });

  });
}



function activateDF(){
  $.get( scriptName + "_df.html", function(html){
    $( "#contentlayer" ).append(html);
    $( ".df" ).append("wait...");
        
    $( ".clickable" ).click(function () {$("#detailcard").show( "fast" ); $("#linechart_progressbar").show(); drawChart(this);});
    loadData();
    setInterval('loadData()', 15000);
  } );
}


function updateGraphInterval(obj){
  $("#detailcard").data("interval",$(obj).data("interval"));
}


function drawChart(obj) {
  if (obj != null){
    $("#detailcard").data("ts-channel",$(obj).data("ts-channel"));
    $("#detailcard").data("ts-field",$(obj).data("ts-field"));
    $("#detailcard").data("ts-apikey",$(obj).data("ts-apikey"));    
    $("#detailcard").data("ts-unit",$(obj).data("ts-unit"));
    cmp = 'defaultCompute';
    if ( $(obj).data("compute") != null ) {cmp = $(obj).data("compute");}
    $("#detailcard").data("compute",cmp);        
  }  
                                                                                                     
  var options = {
    vAxis: {format:'#.# ' + $("#detailcard").data("ts-unit")},
    legend: { position: 'bottom' },
    width: 600,
    height: 250
  };

  var datatable = new google.visualization.DataTable();
  datatable.addColumn('datetime', 'Zeit');
  datatable.addColumn('number', 'Werte');
  
  url =  'https://thingspeak.com/channels/' + $("#detailcard").data("ts-channel") +'/field/' + $("#detailcard").data("ts-field") + '.json?api_key=' + $("#detailcard").data("ts-apikey");
  url += '&amp;offset=0&amp;';
  url += chartScale[$("#detailcard").data("interval")].url;
  
  $.getJSON(url, function(data) {
    if (data == '-1') {
      alert('Fehler: keine Daten');
      return;
    }

    $.each(data.feeds, function() {
      var v;
      
      for (i=1; i<9; i++){
        if (!isNaN(parseInt(this['field'+i]))) {
          v = this['field'+i];
          datatable.setColumnLabel(1, data.channel['field'+i]);
        }
      }
      var x = Date.parse(this.created_at);
      var date = new Date();
      date.setTime(x);
      
      var y = compute[$("#detailcard").data("compute")](parseFloat(v.replace(",", ".")),0);
      if ($("#detailcard").data("ts-unit")=="%"){ y /= 100.;}
      if (!isNaN(parseInt(v))) { datatable.addRow([date,  y]);}
    });
        
    var chart = new google.visualization.LineChart(document.getElementById('linechart_material'));
    chart.draw(datatable, options);
    $("#linechart_progressbar").hide();
  });
}


$( document ).ready(function() {
  initAll();
});


// Utility fuctions

function getValue(val, defaultValue){
  var retVal = defaultValue;
  if ( val != null ){retVal= val;}
  return retVal;                                                                                                                                                                        
}

function getJsonValue(jsonVal, searchString){
  return getJsonValueFromArray(jsonVal, searchString.split('.'));
}

function getJsonValueFromArray(jsonVal, searchArray){
  if (searchArray.length > 1) {
    return getJsonValueFromArray(jsonVal[searchArray.shift()], searchArray);
  } else {
    return jsonVal[searchArray.shift()]; 
  } 
}


function getTranslation(translated, fallback){
  return (translated != null) ? translated : fallback;
}

function separatePrefix(str){
  if (str.split("Light ")[1] != null) { return ["Light ", str.split("Light ")[1]]; }
  if (str.split("Heavy ")[1] != null) { return ["Heavy ", str.split("Heavy ")[1]]; }
  return ['',str];
}