/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global google, _o */

google.charts.load('current', {'packages':['corechart'], 'language': 'de'});

function openChart(id){
    $('#detailcard').show( 'fast' );
    $('#linechart_progressbar').show();
    $('#detailcard').data('id',id);
    
    drawChart();
    
}
function drawChart(){
    var o= _o.get($('#detailcard').data('id'));


    console.log($('#detailcard').data('interval'),o.unit);
    var options = {
      vAxis: {format:'#.# ' + $('#detailcard').data('ts-unit')},
      legend: { position: 'bottom' },
      width: 600,
      height: 250
    };

    var datatable = new google.visualization.DataTable();
    datatable.addColumn('datetime', 'Zeit');
    datatable.addColumn('number', 'Werte');

}

