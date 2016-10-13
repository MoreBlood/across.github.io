// рисуем правый бар с интервалами и вообще всем-всем

var transport_name_arr = ["Автобус №","Троллейбус №", "Маршрутное такси №", "Метро линия", "Трамвай №", "Пройти пешком"],
stop_divs_id = ["stop_start","trans_stop","last_stop","stop_from","stop_to"],
dot_divs_id = ["dot_start","dot_trsp","dot_stop","dot_cross_out","dot_cross"],
colors = ["#2ecc71","#3498db","#f1c40f"],
transport_icons = ["bus_icon.png", "troll_icon.png", "taxi_icon.png"];

function draw_time_sidebar(time, number, tr_type, is_end, stops_names) {

    $("#trh_clear_new").remove(); //чистим перед новой отрисовкой

    var divClone = document.getElementById("trh_clear"),
    div = divClone.cloneNode(true),
    div_stops = new Array(),
    header_first,
    stop_headers =  new Array(),
    transport_before = number[0],
    header_firstClone = document.getElementById("head_bus"),
    div_dots = new Array(),
    dots = new Array(),
    dots_header_clearfix = new Array();

    div.id = "trh_clear_new";

    header_first = header_firstClone.cloneNode(true); //костыль для первой иконки и названия, ибо дебил не смог сначала все норм сделать
    div.children[1].appendChild(header_first);
    header_first.innerHTML = /*transport_name_arr[tr_type[0]]+*/  number[0];
    var first_icon = document.createElement('div');
    first_icon.id = "first_icon";
    first_icon.style.backgroundImage = 'url("images/' + transport_icons[tr_type[0]] +'")';

    header_first.style.color = colors[tr_type[0]];
    var fix =0; //из-за того, что добавляем разделитель, нужно перескочить на один в массиве

    for (var i =0; i < stops_names.length; i++ ) {

        div_dots[i] = document.createElement('div');
        div_dots[i].id = stop_divs_id[is_end[i]-1];
        div.children[0].appendChild(div_dots[i]);

        var dot = document.getElementById(dot_divs_id[is_end[i]-1]);
        dots[i] = dot.cloneNode(true);

        if (is_end[i] == 2 ) dots[i].style.background = "#95a5a6" /*colors[tr_type[i]]*/  ; //средняя остановка
        div.children[0].children[i+fix].appendChild(dots[i]);
        dots[0].appendChild(first_icon); //ставим иконку из костыля

        var stopClone = document.getElementById(stop_divs_id[is_end[i]-1]);
        div_stops[i] = stopClone.cloneNode(true);

        div_stops[i].children[0].innerHTML = time[i];
        div_stops[i].children[1].innerHTML = stops_names[i];

        div.children[1].appendChild(div_stops[i]);
        if ((number[i+1] != transport_before) && i != stops_names.length - 1) { //отрисовка, если изменяется транспорт, т.е. пересадка

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