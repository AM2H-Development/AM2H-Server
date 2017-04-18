/* 
 * Templates for Renderers, Computes, Formatters
 */
/* global v, re, cp, fo, _o */

/* Renderers */
re.clickable = function(id,val,style){
    return "<div class=\"df clickable\" id=\""+id+"\" style=\""+style+"\" onclick=\"$('#detailcard').show( 'fast' ); $('#linechart_progressbar').show(); drawChart(this);\">"+val+"</div>";
};

re.input = function(id,val,style){
    var input = "<input type=\"text\" id=\""+id+"in\" style=\"width: 61px;\" name=\""+id+"\" value=\""+val+"\" \>";
    var button= "<button type=\"button\" onclick=\"send($('#"+ id +"in').val());\">set</button>";
    return "<div style=\""+style+"\" id=\""+id+"\">" + input + button + "</div>";
};

re.toggle = function(id,val,style){
    var o= _o.get(id);
    var onclick = "socket.emit('set', '"+o.args[0]+"#"+val+"');";
    var icon = "<i class=\"material-icons\" onclick=\""+ onclick +"\">"+ o.icons[val] +"</i>";
    return "<div style=\""+style+"\" id=\""+id+"\">" + icon + "</div>";
};

re.toggleImage = function(id,val,style){
    var o= _o.get(id);
    var onclick = "socket.emit('set', '"+o.args[0]+"#"+val+"');";
    var icon = "<img src=\""+o.icons[val]+"\" onclick=\""+ onclick +"\">";
    return "<div style=\""+style+"\" id=\""+id+"\">" + icon + "</div>";
};

/* Computes */
cp.add = function(a){
    var res=0;
    for (var i=0;i<a.length;i++){res+=v.asF(a[i]);}
    return res;
};

cp.toggle = function(a){console.log(a); return v.asI(a[0])===0 ? 1:0;};

/* Formatters */
fo.none = function(val){return val;};

fo.fo2= function(val){
    return "fo2 "+val;
};