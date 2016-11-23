var stop = new Array();
var request = "";
var demo_json = ["LT","OL","KC"];


function callback (json) {

    for (var i = 0; i < json.results.length; i++) {
        stop[i] =  json.results[i]
    }

};
function parserfromserver(){

    stop = new Array();
    var socket = new XMLHttpRequest();
    socket.open('POST', 'http://127.0.0.1', true);
    socket.onreadystatechange = function()
    {
        if (socket.readyState == 4)
        {
            if(socket.status == 200)
            {
                //Тут разбор ответа и дальнейшие действия

                callback(JSON.parse(socket.responseText));
                socket = 0;
                draw_map(false);
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
                console.log('Сервер не отвечает...');
            }
        }
    };
     socket.send('aCC: ' + send_requset +'\n');
    
}

var counter = 0;

function DemoMode() {

    stop = new Array();

    $.when( $.getJSON("data/demo/" + demo_json[counter % demo_json.length] + ".json", callback)).then(function() {

        draw_map(false); //без пасхалки :(

        var times = new Array(),
        transport_names = new Array(),
        types = new Array(),
        start_transit_ends = new Array(),
        names = new Array();

        for (var i =0; i < stop.length; i++ ) {
            times[i] = stop[i].time;
            transport_names[i] = stop[i].transport_name;
            types[i] = stop[i].type;
            start_transit_ends[i] = stop[i].start_transit_end;
            names[i] = stop[i].name;
        }

        $('#top_input').val(stop[0].name);
        $('#bottom_input').val(stop[stop.length - 1].name);
        draw_time_sidebar(times, transport_names, types, start_transit_ends, names);
        counter++;
});






}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}