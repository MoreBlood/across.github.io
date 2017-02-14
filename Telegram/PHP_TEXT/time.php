<?php
date_default_timezone_set("Europe/Minsk");
$t=time();

function type_of_day_rus($shift)
{
    global $t;
    echo date("G:i", $t);
    if ((date('N', $t - strtotime('+' .$shift . 'day', strtotime($t))) >= 6)) return "Выходной";

    else return "Рабочий";
}


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

echo convert_time("00:00");


?>