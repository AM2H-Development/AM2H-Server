/* 
 * Templates for Renderers, Computes, Formatters
 */
/* global v, re, cp, fo, _o, socket */

/* Renderers */

re.clickable = function(id,val,style){
    return "<div class=\"df clickable\" id=\""+id+"\" style=\""+style+"\" onclick=\"openChart('" + id + "')\">"+val+"</div>";
};

re.input = function(id,val,style){
    var o= _o.get(id);
    var prescale= o.prescale*1;
    var onclick = "c.send({topic:'"+o.args[0]+"', message:($('#"+ id +"in').val().replace(',', '.')*" + prescale + ")});";
    var input = "<input type=\"text\" id=\""+id+"in\" style=\"width: 61px;\" name=\""+id+"\" value=\""+val+"\" \>";
    var button= "<button type=\"button\" onclick=\"" + onclick + "\">set</button>";
    return "<div style=\"position: absolute;"+style+"\" id=\""+id+"\">" + input + button + "</div>";
};

re.toggleIcon = function(id,val,style){
    var o= _o.get(id);
    var onclick = "c.send({topic:'"+o.args[0]+"', message:'"+val+"'});";
    var icon = "<i class=\"material-icons\" onclick=\""+ onclick +"\">"+ o.icons[val] +"</i>";
    return "<div style=\"position: absolute;"+style+"\" id=\""+id+"\">" + icon + "</div>";
};

re.toggleImage = function(id,val,style){
    var o= _o.get(id);
    var iconUrl = o.icons[val] !== undefined ? o.icons[val] : o.icons[2];
    var onclick = "c.send({topic:'"+o.args[0]+"', message:'"+val+"'});";
    var icon = "<img src=\"" + iconUrl + "\" onclick=\""+ onclick +"\">";
    return "<div style=\"position: absolute;"+style+"\" id=\""+id+"\">" + icon + "</div>";
};

re.image = function(id,val,style){
    var o= _o.get(id);
    var iconUrl = o.icons[val] !== undefined ? o.icons[val] : o.icons[0];
    //var onclick = "c.send({topic:'"+o.args[0]+"', message:'"+val+"'});";
    var icon = "<img src=\"" + iconUrl + "\" onclick=\""+ onclick +"\">";
    return "<div style=\"position: absolute;"+style+"\" id=\""+id+"\">" + icon + "</div>";
};

/* Computes */
cp.add = function(a){
    var res=0;
    for (var i=0;i<a.length;i++){res+=v.asF(a[i]);}
    return res;
};

cp.toggle = function(a){return v.asI(a[0])===0 ? 1:0;};

/* Formatters */
fo.none = function(val){return val;};

fo.fo2= function(val){
    return "fo2 "+val;
};