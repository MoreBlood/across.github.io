var transport_name_arr = ["Автобус №","Троллейбус №", "Маршрутное такси №", "Метро линия", "Трамвай №", "Пройти пешком"];
var stop_divs_id = ["stop_start","trans_stop","last_stop","stop_from","stop_to"];
var dot_divs_id = ["dot_start","dot_trsp","dot_stop","dot_cross_out","dot_cross"];
var colors = ["#2ecc71","#3498db","#f1c40f"];
var transport_icons = ["bus_icon.png", "troll_icon.png", "taxi_icon.png"];
function draw_time_sidebar(time, number, tr_type, is_end, stops_names) {
    $("#trh_clear_new").remove();

    var divClone = document.getElementById("trh_clear");
    var div = divClone.cloneNode(true);
    div.id = "trh_clear_new";
    var div_stops = new Array();
    var header_first;
    var stop_headers =  new Array();
    var transport_before = number[0];
    var header_firstClone = document.getElementById("head_bus");
    var div_dots = new Array();
    var dots = new Array();
    var dots_header_clearfix = new Array();
    header_first = header_firstClone.cloneNode(true);
    div.children[1].appendChild(header_first);
    header_first.innerHTML = /*transport_name_arr[tr_type[0]]+*/  number[0];
    var first_icon = document.createElement('div'); //костыль для первой иконки, ибо дебил не смог сначала все норм сделать
    first_icon.id = "first_icon";
    first_icon.style.backgroundImage = 'url("images/' + transport_icons[tr_type[0]] +'")';

    header_first.style.color = colors[tr_type[0]];
    var fix =0;
    for (var i =0; i < stops_names.length; i++ ) {
        div_dots[i] = document.createElement('div');
        div_dots[i].id = stop_divs_id[is_end[i]-1];
        div.children[0].appendChild(div_dots[i]);
        var dot = document.getElementById(dot_divs_id[is_end[i]-1]);
        dots[i] = dot.cloneNode(true);
        if (is_end[i] == 2 ) dots[i].style.background = "#95a5a6" /*colors[tr_type[i]]*/  ;
        div.children[0].children[i+fix].appendChild(dots[i]);
        dots[0].appendChild(first_icon);
        var stopClone = document.getElementById(stop_divs_id[is_end[i]-1]);
        div_stops[i] = stopClone.cloneNode(true);

        div_stops[i].children[0].innerHTML = time[i];
        div_stops[i].children[1].innerHTML = stops_names[i];
        div.children[1].appendChild(div_stops[i]);
        if ((number[i+1] != transport_before) && i != stops_names.length - 1) {
            var headerClone = document.getElementById("head_bus");
            stop_headers[i] = headerClone.cloneNode(true);
            dots_header_clearfix[i] = headerClone.cloneNode(true);
            dots_header_clearfix[i].id = "header_dot_fix";
            dots_header_clearfix[i].style.backgroundImage = 'url("images/' + transport_icons[tr_type[i+1]] +'")';
            stop_headers[i].innerHTML = /*transport_name_arr[tr_type[i+1]] +*/ number[i+1];
            stop_headers[i].style.color = colors[tr_type[i+1]];
            div.children[1].appendChild(stop_headers[i]);
            div.children[0].appendChild(dots_header_clearfix[i]);
            fix++;
            transport_before = number[i+1];
        }
    }
    var lineClone = document.getElementById("draw_line");
    var linedraw = lineClone.cloneNode(true);


    $(div).prepend(linedraw);

    document.getElementById("sidebar_time").appendChild(div);

    linedraw.style.height = div.children[1].clientHeight  + 33 + "px";


}
$(document).ready(function() {

    // здесь будет скрытие промежуточных маршрутов



});