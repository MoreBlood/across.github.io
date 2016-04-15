var stop = new Array();
var request = "";


function callback (json) {

    for (var i = 0; i < json.results.length; i++) {
        stop[i] =  json.results[i]
    }

};
function parserfromserver(){
    stop = null;
    stop = new Array();
    var socket = new XMLHttpRequest();
    socket.open('POST', 'http://127.0.0.1', true);
    socket.onreadystatechange = function()
    {
        if (socket.readyState == 4) //Какая то фигня, которая грит о том, шо чота было получено
        {
            if(socket.status == 200) //Ну типа все ОК
            {
                //Тут разбор ответа и дальнейшие действия

                //$.getJSON(socket.responseText, callback);
                callback(JSON.parse(socket.responseText));
                socket = 0;
                draw_map();
                var times = new Array();  var transport_names = new Array();
                var types = new Array(); var start_transit_ends = new Array();
                var names = new Array();
                for (var i =0; i < stop.length; i++ ) {
                    times[i] = stop[i].time;
                    transport_names[i] = stop[i].transport_name;
                    types[i] = stop[i].type;
                    start_transit_ends[i] = stop[i].start_transit_end;
                    names[i] = stop[i].name;
                }
                draw_time_sidebar(times, transport_names, types, start_transit_ends, names);

            }
            else
            {
                //Когда сервак отваливается, вызывается это
                //alert('Some error');
            }
        }
    };
    socket.send('aCC: ' + send_requset +'\n');
    //alert(send_requset);
    
}
