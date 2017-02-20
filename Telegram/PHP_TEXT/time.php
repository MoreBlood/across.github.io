<?php
include 'index.php';
date_default_timezone_set("Europe/Minsk");
$t=time();
<<<<<<< HEAD
=======

function type_of_day_rus($shift)
{
    global $t;
    echo date("G:i", $t);
    if ((date('N', $t - strtotime('+' .$shift . 'day', strtotime($t))) >= 6)) return "Выходной";

    else return "Рабочий";
}
>>>>>>> origin/master

function ConvertToASCII ($str){
    $str_ascii = "";
    for ($i = 0; $i < mb_strlen($str); $i++){
        $str_ascii .= ord($str[$i]) . " ";

    }
    return $str_ascii;
}




<<<<<<< HEAD


echo answer_for_bus_stop(try_to_find_from_all(RemoveKeyWord("транспорт", "цум транспорт")),"Туда", type_of_day_rus_now());
=======
function type_of_message($mesage){
    $words = explode($mesage);
    if (count($words) == 1) return "one";// остановка (поиск), номер остановки, автобус, да
    if (count($words) == 2) return "two";// пары остановка и номер автобуса, автобус остановка,
    if (count($words) == 3) return "three";// точное задание параметров о:а:в и вариации

}

echo convert_time("00:00");
>>>>>>> origin/master


?>