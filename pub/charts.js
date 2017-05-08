/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global google, _o, socket */
var chartReady=false;
var datatable;
google.charts.load('current', {'packages':['corechart'], 'language': 'de'});
google.charts.setOnLoadCallback(() => {
    socket.on('chartdata',addValue);
    chartReady=true;
});


function openChart(id){
    $('#detailcard').show( 'fast' );
    $('#linechart_progressbar').show();
    $('#detailcard').data('id',id);
    
    drawChart();
    
}
function drawChart(){
    if (!chartReady) return;
    var o= _o.get($('#detailcard').data('id'));
    console.log($('#detailcard').data('interval')+ " " + o.unit);

    var options = {
      vAxis: {format:'#.# ' + o.unit},
      legend: { position: 'bottom' },
      width: 600,
      height: 250
    };

    datatable = new google.visualization.DataTable();
    datatable.addColumn('datetime', 'Zeit');
    datatable.addColumn('number', 'Werte');
    datatable.setColumnLabel(1, o.label);
    
    socket.emit('chart',{topics:o.args,interval:$('#detailcard').data('interval')});

      // if ($("#detailcard").data("ts-unit")=="%"){ y /= 100.;}
      // if (!isNaN(parseInt(v))) { datatable.addRow([date,  y]);}

    var chart = new google.visualization.LineChart(document.getElementById('linechart_material'));
    chart.draw(datatable, options);
    $("#linechart_progressbar").hide();

}

function addValue(data){
    console.log(data);
}