/* 
 * Templates for Renderers, Computes, Formatters
 */


/* global v, re, cp, fo */

var bgImage = {
    "background-image": "url(\"http://qxf.de/HeizungV2_image.svg\")",
    "width": "1030px",
    "height": "620px",
    "background-size": "1030px 620px"
};

/* Renderers */
re.clickable = function(id,val,style){
    return "<div class=\"df clickable\" id=\""+id+"\" style=\""+style+"\" onclick=\"$('#detailcard').show( 'fast' ); $('#linechart_progressbar').show(); drawChart(this);\">"+val+"</div>";
};

re.input = function(id,val,style){
    var input = "<input type=\"text\" id=\""+id+"in\" style=\"width: 61px;\" name=\""+id+"\" value=\""+val+"\" \>";
    var button= "<button type=\"button\" onclick=\"send($('#"+ id +"in').val());\">set</button>";
    return "<div style=\""+style+"\" id=\""+id+"\">" + input + button + "</div>";
};

/* Computes */
cp.add = function(a){return v.asF(a[0])+v.asF(a[1]);};

/* Formatters */
fo.std = function(val,prescale,fraction,unit){
    // val =  (val+" ").replace(",", ".");
    val /= prescale;
    return val.toLocaleString('de-DE', {minimumFractionDigits: fraction, maximumFractionDigits: fraction}) + unit+"fo";
};
fo.fo2= function(val){
    return "fo2 "+val;
};
