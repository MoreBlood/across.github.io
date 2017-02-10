<?php
date_default_timezone_set("Europe/Minsk");
$t=time();

function convert_time ($time){

     return strtotime("1970-01-01 $time UTC");


}
$bus_times = array("6:30", "7:30", "21:22");

function type_of_message($mesage){
    $words = explode($mesage);
    if (count($words) == 1) return "one";// остановка (поиск), номер остановки, автобус, да
    if (count($words) == 2) return "two";// пары остановка и номер автобуса, автобус остановка,
    if (count($words) == 3) return "three";// точное задание параметров о:а:в и вариации

}

function closest_time($time_array, $requested_time){

    $offset = 100000000;
    $offset_return = "23:59";

    foreach ($time_array as $key){
        if (convert_time($key) - convert_time($requested_time) < $offset && convert_time($key) > convert_time($requested_time)){
            $offset_return = $key;
            $offset = convert_time($key) - convert_time($requested_time);
        }

    }
    return $offset_return;
}




?>