<?php
include 'api.php';
<<<<<<< HEAD
include 'tr.php';
=======
>>>>>>> origin/master

date_default_timezone_set("Europe/Minsk");
$t = time();

<<<<<<< HEAD
function SortRightWay($message_ex){
    $bus_array = array_map('mb_strtolower', array(1,"2","3","5","6","7","8","9","10","11","12","13","14","16","17","18","19","20","21","22","23","24","25","26","27","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","46","11А","12А","13А","15А","15Б","15В","1А","1Т","21А","21Б","23А","23Б","24А","2А","2Т","37А","39А","39Б","3Т","44А","4Т","5Т","6Т","7Т","8Т"));

    foreach($message_ex as $key=>$value){
        if (array_search($value, $bus_array)){
            array_unshift($message_ex, $value);
            unset($message_ex[$key+1]);
            $message_ex = array_merge($message_ex);
            break;
        }
    }
    return $message_ex;

}

function BuStopResp ($current){

    global $t;
    if (get_route(mb_strtoupper($current[0]), "Туда")) {
        //дописать проверку пар
        $normal_stop = "";
        $rasp_checker = "";
        $current_bus = mb_strtoupper($current[0]);
        $current_date = date("G:i", $t);
        if (end($current) == "расписание")
            $rasp_checker = array_pop($current);
        if (strpos(end($current), ":")!== false)
            $current_date = array_pop($current);
        if ($normal_stop = try_to_find_stop(mb_strtolower(implode(" ", array_slice($current, 1))), $current_bus)) $normal_stop = GetUpperStopName($current_bus, $normal_stop);
        if (check_one_stop($current_bus, "Туда", $normal_stop) && $normal_stop != "") {
            $request_params = "";
            $rasp = 0;
            $shift = 0;

            if ($rasp_checker == "расписание") $rasp = 1; //проверка на одно направление, чиститм чтобы мусора не было, ибо добавляем в строку, а не присваеваем
            if ($time = closest_time_new($current_bus, "Туда", $normal_stop, $current_date, $rasp, $shift))
                $request_params = $current_bus . ". " . get_route($current_bus, "Туда") . " на остановке " . $normal_stop . " будет в " . $time . "\n";
            if ($time = closest_time_new($current_bus, "Обратно", $normal_stop, $current_date, $rasp, $shift))
                $request_params .= $current_bus . ". " . get_route($current_bus, "Обратно") . " на остановке " . $normal_stop . " будет в " . $time;
        }
    }

    return $request_params;


}

function re ($str){
    return str_replace("ё", "е", $str);
}

function RemoveKeyWord($keyword,$message){

    if ($message == "" || $keyword == "" ) return 0;
    $message = str_replace($keyword,"",$message);
    $fragments = array_filter(explode(" ", $message));

    return implode(" ", $fragments);

}

function deleteSpace($str){
    if ($str != "") return str_replace(" ","",$str);
    else return 0;
}

function GetUpperStopName($bus, $stop)
{
    $all_stops_for_bus = all_stops($bus);
=======
function GetUpperStopName($bus, $stop)
{
    $all_stops_for_bus = all_stops($bus, "");
>>>>>>> origin/master
    //SendMessage("зашли", false);
    foreach ($all_stops_for_bus as $key) {
        if (mb_strtolower($key) == $stop) {
            //SendMessage("нашли" . $key, false);
            return $key;
        }
    }
    return 0;
}

<<<<<<< HEAD
function answer_for_bus_stop($stop, $route, $day)
{
    if ($stop === 0) return "Нет такой остановки";
    $bus_array = array();

    $path = array_diff(scandir("bus/"), array('..', '.'));
    //echo  $route, $day;

    foreach ($path as $key){
        $cur_file = explode(".", $key);
        $cur_bus = $cur_file[0];
        $cur_route = $cur_file[1];
        $cur_day = $cur_file[2];
        if (array_search(re($stop), all_stops_by_route_no_error($cur_bus, $cur_route, $day)))
            array_push($bus_array, $cur_bus);
    }
    return implode(", ",array_unique($bus_array));
}

function CmpWithOffset($first, $second, $type, $offset){
    if ($type == "less"){
        if (abs($first - $second) <= $offset) return 1;
        else return 0;
    }
    else {
        if (abs($first - $second) >= $offset) return 1;
        else return 0;
    }
=======
function answer_for_bus_stop()
{
>>>>>>> origin/master

}

function SendMessage($text, $flag)
{
    global $user_id, $token;

    $request_params = array(
        'message' => $text,
        'user_id' => $user_id,
        'access_token' => $token,
        'v' => '5.0'
    );

    file_get_contents('https://api.vk.com/method/messages.send?' . http_build_query($request_params));
    if ($flag) echo('ok');
}

function array_change_key_case_unicode($arr, $c = CASE_LOWER)
{
    $c = ($c == CASE_LOWER) ? MB_CASE_LOWER : MB_CASE_UPPER;
    foreach ($arr as $k => $v) {
        $ret[mb_convert_case($k, $c, "UTF-8")] = $v;
    }
    return $ret;
}

function try_to_find_stop($stop, $bus)
{

<<<<<<< HEAD
    $stops_low = array_map('mb_strtolower', all_stops($bus));
=======
    $stops_low = array_map('mb_strtolower', all_stops($bus, ""));
>>>>>>> origin/master

    $found_res = array_filter($stops_low, function ($el) use ($stop) {
        return (mb_strpos($el, $stop) !== false);//удаляем все что не подходит
    });

    if (count($found_res) == 1) {
        //SendMessage("нашли по части " . implode(", ", $found_res), false);
        return implode("", $found_res);
    } else return 0;

}

function type_of_day_rus_now()
{
    global $t;
    if ((date('N', $t) >= 6)) return "Выходной";
    else return "Рабочий";
}

function type_of_day_rus($shift)
{
    global $t;
    if ((date('N', $t + strtotime('+' . $shift . 'day', strtotime($t))) >= 6)) return "Выходной";
    else return "Рабочий";
}

function found_by_stop_by_date($bus, $route, $stop, $shift)
{

<<<<<<< HEAD
    $data = @file_get_contents('bus/' . $bus . '.' . $route . '.' . type_of_day_rus($shift) . '.json');
    if ($data === FALSE) return 0;
    if (json_decode($data, true)[$stop] == NULL) return 0;
=======
    $data = file_get_contents('bus/' . $bus . '.' . $route . '.' . type_of_day_rus($shift) . '.json');
    if (array_filter(json_decode($data, true)[$stop]) == NULL) return 0;
>>>>>>> origin/master
    return array_filter(json_decode($data, true)[$stop]);

}

function check_one_stop($bus, $route, $stop)
{

    if ($stop == "") {
        SendMessage("На даном маршруте нет такой остановки", false);
        return 0;
    }
    $second_route_to_check = "Туда";
    if ($route == "Туда") $second_route_to_check = "Обратно";

<<<<<<< HEAD
    $data = @file_get_contents('bus/' . $bus . '.' . $route . '.Рабочий.json');
    $data_for_check = @file_get_contents('bus/' . $bus . '.' . $second_route_to_check .  '.Рабочий.json');
=======
    $data = file_get_contents('bus/' . $bus . '.' . $route . '.' . type_of_day_rus_now() . '.json');
    $data_for_check = file_get_contents('bus/' . $bus . '.' . $second_route_to_check . '.' . type_of_day_rus_now() . '.json');
>>>>>>> origin/master

    $data_map = json_decode($data);
    $data_for_check_map = json_decode($data_for_check);

    if ((array_key_exists($stop, $data_map) && $data !== FALSE && !array_key_exists($stop, $data_for_check_map) && $data_for_check !== FALSE) ||
        (!array_key_exists($stop, $data_map) && $data !== FALSE && array_key_exists($stop, $data_for_check_map) && $data_for_check !== FALSE)
    ) {
        SendMessage("Остановка есть только в одном направлении", false);
        return 1;
    }
    if (array_key_exists($stop, $data_map) && $data !== FALSE && array_key_exists($stop, $data_for_check_map) && $data_for_check !== FALSE) return 1;

    else {
        SendMessage("На даном маршруте нет такой остановки", false);
        return 0;
    }
}

<<<<<<< HEAD
function all_stops($bus)
{
    $data_one = @file_get_contents('bus/' . $bus . '.Туда.Рабочий.json');
    $data_two = @file_get_contents('bus/' . $bus . '.Обратно.Рабочий.json');
=======
function all_stops($bus, $route)
{
    $data_one = file_get_contents('bus/' . $bus . '.Туда.Рабочий.json');
    $data_two = file_get_contents('bus/' . $bus . '.Обратно.Рабочий.json');
>>>>>>> origin/master
    if ($data_one !== FALSE || $data_two !== FALSE) return array_unique(array_merge(array_keys(json_decode($data_one, true)), array_keys(json_decode($data_two, true))));
    else return array("Нет такого транспорта");

}

<<<<<<< HEAD
function all_stops_by_route($bus, $route, $day)
{
    $data= file_get_contents('bus/' . $bus . '.' . $route . '.' . $day . '.json');
    if ($data !== FALSE) return array_keys(json_decode($data, true));
    else return array("Нет такого транспорта");

}

function all_stops_by_route_no_error($bus, $route, $day)
{
    $data= @file_get_contents('bus/' . $bus . '.' . $route . '.' . $day . '.json');
    if ($data !== FALSE) return array_keys(json_decode($data, true));
    else return array();

}

function get_route($bus, $route)
{
    $data = @file_get_contents('bus/' . $bus . '.' . $route . '.Рабочий.json');
=======
function get_route($bus, $route)
{
    $data = file_get_contents('bus/' . $bus . '.' . $route . '.Рабочий.json');
>>>>>>> origin/master
    if ($data === FALSE) {
        SendMessage("Нет такого транспорта", false);
        return 0;
    }
<<<<<<< HEAD
    $data = array_keys(json_decode($data, true));

    return current($data) . " - " . end($data) ;
=======
    return current(array_keys(json_decode($data, true))) . " - " . end(array_keys(json_decode($data, true)));
>>>>>>> origin/master
}

function convert_time($time)
{ //returns time in seconds

    return strtotime("1970-01-01 $time UTC");
}

<<<<<<< HEAD
function closest_time_new($bus, $route, $stop, $requested_time, $type, $shift)
{
    //реализовать выдачу нескольких результатов, с переходом на нектс день
=======
function closest_time_new($bus, $route, $stop, $requested_time, $type)
{

>>>>>>> origin/master
    $shift_array = array("", " завтра", " послезавтра", " через два дня", " через три дня");
    global $t;
    $offset = INF;
    $offset_return = "23:59";
<<<<<<< HEAD
    $counter = $shift;
    //if (convert_time($requested_time))
    $time_array = array();
    $error = 1; // тек. 16:47 автобус 16:44 - выведет 16:44, а не след
    while ($offset == INF && $counter < 7) {

        if ($bus == "33" && ((date('N', $t) + $counter) % 7 == 0)) $counter++; //придумать фикс для 33
        if ($time_array = found_by_stop_by_date($bus, $route, $stop, $counter))
        foreach ($time_array as $key) {
            if (convert_time($key) - convert_time($requested_time) <= $offset && convert_time($key) >= (convert_time($requested_time) - $error * 60)  ) {
=======
    $counter = 0;
    $time_array = array();
    while ($offset == INF && $counter < 7) {

        if ($bus == "33" && ((date('N', $t) + $counter) % 7 == 0)) $counter++; //придумать фикс для 33
        if (!$time_array = found_by_stop_by_date($bus, $route, $stop, $counter)) return 0;
        foreach ($time_array as $key) {
            if (convert_time($key) - convert_time($requested_time) <= $offset && convert_time($key) >= convert_time($requested_time)) {
>>>>>>> origin/master
                $offset_return = $key;
                $offset = convert_time($key) - convert_time($requested_time);
                break;
            }
        }
        if ($offset !== INF) break;
        $counter++;
<<<<<<< HEAD
        if ($requested_time == date("G:i", $t)) $requested_time = "00:00"; // так себе фикс
=======
        $requested_time = "00:00";
>>>>>>> origin/master
    }

    if ($offset == INF) return 0;
    if ($type) return implode(", ", array_filter($time_array));
    $shift_mes = "";
    if ($counter != 0) $shift_mes = $shift_array[$counter];
    return $offset_return . $shift_mes;
}

function GetLastMessages($author, $count)
{

    global $user_id, $token;

    $request_mess = array(
        'count' => $count * 2,
        'user_id' => $user_id,
        'access_token' => $token,
        'v' => '5.62'
    );
    $get_mess = http_build_query($request_mess);
<<<<<<< HEAD
    $prev_messages = @file_get_contents('https://api.vk.com/method/messages.getHistory?' . $get_mess);
=======
    $prev_messages = file_get_contents('https://api.vk.com/method/messages.getHistory?' . $get_mess);
>>>>>>> origin/master

    if ($prev_messages == FALSE) return 0;
    $prev_messages = json_decode($prev_messages);

    $messages_history = array();
    $messages_history_bot = array();

    foreach ($prev_messages->response->items as $key => $value) {
        if ($value->from_id == $user_id) array_push($messages_history, $value->body);
        else array_push($messages_history_bot, $value->body);
    }
    unset($value);

    if ($author == $user_id) return $messages_history;
    else return $messages_history_bot;

}

<<<<<<< HEAD
function try_to_find_from_all($user_message){
    global $stops_low, $stops;

    $found_res = array_filter($stops_low, function ($el) use ($user_message) {
        return (mb_strpos(re($el), $user_message) !== false);//удаляем все что не подходит если просто ввод остановки
    });

    $found_res_up = array();
    foreach ($found_res as $value) array_push($found_res_up, strval($stops[array_search($value, $stops_low)])); // добавляем в массив красивые

    if (count($found_res) == 1) {
        //SendMessage("нашли по части " . implode(", ", $found_res), false);
        return implode(", ", $found_res_up);
    } else return 0;




}

=======
>>>>>>> origin/master
if (!isset($_REQUEST)) {
    return;
}

$stops = array("28 июля", "4-й Форт", "Абрикосовая", "Автобаза связи", "Автовокзал", "Автолюбителей", "Авторынок", "Автошкола", "Агротранс", "Адамковская", "Амбулатория", "АП", "АП ", "Аркадия", "Аэродромная", "Аэроклуб", "Б.Космонавтов", "Б.Шевченко", "база «Рыбторг»", "Бауманская", "Безымянная", "Беларусбанк", "Беловежская", "Белорусская", "Белтранс Ойл", "Березовая роща", "Березовка", "Бернады", "Благовещенского", "Боброва", "Богдановича", "Богданчука", "Брест Восточный", "Брест Западный", "Брестглавснаб", "Брестоблавтотранс", "Брестсельстрой", "Брестских дивизий", "БТИ", "БТК", "БЭТЗ", "ВамРад", "Варшавский рынок", "Варшавское шоссе", "Веселая", "Ветлечебница", "Ветренная", "Внештранс", "Водозабор", "Водоканал", "Волгоградская", "Волынка", "Восточная", "Восточный микрорайон", "Вторцветмет", "Вульковская", "Гаврилова", "Гагарина", "Газоаппарат", "Гаражи ОПC", "Гастелло", "Гвардейская", "Георгиевская", "Гершоны", "Гефест-Кварц", "Гоголя", "Городская", "Городская больница №1", "ГОРТОП", "Гостиница Беларусь", "Гостиница Дружба", "Гостиница Юность", "Гребной канал", "Грибоедова", "Гузнянская", "Д.П. \"Южный городок\"", "Дворец спорта Виктория", "Дворникова", "Дворцовая", "деревня Плоска", "Детский городок", "Добрая", "Дом ветеранов", "ДСУ", "Дубровка", "Екельчика", "Есенина", "Ж/Д техникум", "Жукова", "Завод", "Завод бытовой химии", "Загородная", "Загороднева", "Заречная", "Защитников Отечества", "Зеленая", "Зона отдыха", "Зубачёва", "Инволюкс", "Инко Фуд", "Интертранс", "Интурист", "К.Боярская", "Калиновая", "Карасева", "Картодром", "Карьерная", "Катин Бор", "Кедровая", "Киевская", "Кирпичная", "Кл.Северное", "Кладбище", "кладбище Плоска", "Клары Цеткин", "Клейники", "Ковалево", "Ковельская", "Ковры Бреста", "Колесника", "Колледж торговли", "Кольцевая", "Комсомольская", "Костюшко", "Красногвардейская", "Краснознаменная", "Краснознамённая", "Красный двор", "Крепость", "Криштофовича", "Крушинская", "Купальская", "л-та Рябцева", "Лейтенанта Акимочкина", "Ленина", "Ленинградская", "Летная", "Лицей", "Луцкая", "Лысая гора", "М.р-н Заречный", "М.р-н Южный", "М.р-н Южный  ", "Маг. \"Северный\"", "Магазин", "Магазин \"Продтовары\"", "Махновича", "Маш.строит. завод", "Маяковского", "Мед. Центр \"ЛОДЭ\"", "Медицинская", "Микрорайон Вулька", "Митьки", "Мицкевича", "Молодёжная", "МОПРа", "Московское шоссе", "Мостовая", "Мошенского", "Музей Ж/д техники", "Музей спасенн.ценностей", "Мухавецкая", "Мясокомбинат", "Новая", "Новосельская", "Новые Задворцы", "ОАО Брестское пиво", "Обл.больница", "Обсерватория", "Овощебаза", "Озёрная", "Озеро", "Октябрьской революции", "Орловская", "Осипенко", "Остановка", "Парк 1 МАЯ", "Парк Воинов-интернац-ов", "Партизанский проспект", "Пер. Есенина", "пер. Калиновый", "Перекресток", "Переулок", "Пионерская", "Площадь Ленина", "Пов.Ковердяки", "Пов.Козловичи", "Поворот Жемчужина", "Подгородская", "Подсобное хозяйство", "Пожарное депо", "Поликлиника", "Почта", "Прибужская", "Пригородная", "Пригородный вокзал", "Приграничная", "Промтехника", "Пронягина", "Проспект Машерова", "Проспект Республики", "Профсоюзная", "ПСО", "Пугачево", "Пункт подготовки вагонов", "Пушкинская", "Радужная", "Рембыттехника", "Республиканская", "Речицкая", "Рокоссовского", "Рынок \"ЛАГУНА\"", "Рыньковка", "Рябиновая", "С/т Жемчужина", "С/т Светлячок", "С/т Южное 1", "С/т Южное 2", "Садовая", "Сальникова", "Санта Бремор", "Санта-53", "Санта-54", "Светлая", "Сев. Кольцо", "Сикорского", "Сиреневая", "Сквер Иконникова", "Скрипникова", "Славнефть", "Смирнова", "Советская", "Советской конституции", "Сосновая", "Спортшкола", "Средняя Школа №1", "Стадион Брестский", "Стадион Локомотив", "Стадион Строитель", "Станция юннатов", "Старые Задворцы", "Стафеева", "Стимово", "СТО-2", "Строительная", "Строительный рынок", "СЭЗ Брест", "Т.Д.ИДЕАЛ", "Театр", "Тельмы", "Тенистая", "Технический университет", "Тихая", "Торговый центр Восток", "Транспортная", "Троллейбусный парк", "Трудовая", "ТЭЦ", "Тюхиничи", "ул. Вересковая", "ул.Ландшафтная", "Университет", "Училище олимпийского резерва", "Учительская", "ФОК", "Фомина", "Форт", "Хлебпром", "Цветотрон", "ЦГБ", "Центральная", "ЦМТ", "ЦУМ", "Чернинская", "Чулочный комбинат", "Шафрановая", "Школа", "Школьная", "Шоссейная", "Электросети", "Юбилейная", "Я. Купалы", "Ямно", "Ясеневая", 'Орджоникидзе', 'К.Маркса', 'Гимназия №1', 'Промстройбанк', 'Свердлова');
<<<<<<< HEAD
$stops = array_unique(array_merge($stops, $stops_tr));
=======
>>>>>>> origin/master
$stops_low = array_map('mb_strtolower', $stops);

//Получаем и декодируем уведомление
$data = json_decode(file_get_contents('php://input'));

<<<<<<< HEAD
switch (@$data->type) {
=======
switch ($data->type) {
>>>>>>> origin/master
    //Если это уведомление для подтверждения адреса сервера...
    case 'confirmation':
        //...отправляем строку для подтверждения адреса
        echo $confirmation_token;
        break;

//Если это уведомление о новом сообщении...
    case 'message_new':
        //...получаем id его автора
        $user_id = $data->object->user_id;
        //затем с помощью users.get получаем данные об авторе
        $user_info = json_decode(file_get_contents("https://api.vk.com/method/users.get?user_ids={$user_id}&v=5.0&lang=0"));

//и извлекаем из ответа его имя
        $user_name = $user_info->response[0]->first_name;
<<<<<<< HEAD
        $user_message = re(mb_strtolower($data->object->body));
=======
        $user_message = mb_strtolower($data->object->body);
>>>>>>> origin/master
        $response_for_message = "";

        $found_res = array_filter($stops_low, function ($el) use ($user_message) {
            return (mb_strpos($el, $user_message) !== false);//удаляем все что не подходит если просто ввод остановки
        });

        $found_res_up = array();
        foreach ($found_res as $value) array_push($found_res_up, strval($stops[array_search($value, $stops_low)])); // добавляем в массив красивые

<<<<<<< HEAD
        if (strpos($user_message, '_') !== false){
            echo('ok');
            break;

        }

=======
>>>>>>> origin/master
        $response_for_message = implode(", ", $found_res_up);//клеим


//С помощью messages.send и токена сообщества отправляем ответное сообщение
        $request_params = array(
            'message' => "{$response_for_message}",
<<<<<<< HEAD
=======

>>>>>>> origin/master
            'user_id' => $user_id,
            'access_token' => $token,
            'v' => '5.62'
        );

        if ($user_message == 'кинь музыку') {
            $request_params['attachment'] = 'audio179667459_456239214';
            $request_params['message'] = 'Держи!';
        }
        if ($user_message == 'кинь мем') {
            $memes = array("_456239018", "_456239021", "_456239022", "_456239023", "_456239024", "_456239025");
            $request_params['attachment'] = 'photo-139467761' . $memes[array_rand($memes)];
            $request_params['message'] = 'Мемыыыы, наканецтааааа';
        }
        if ($user_message == 'привет') $request_params['message'] = "Привет, {$user_name}!";
<<<<<<< HEAD
        if (strpos($user_message, 'спасибо') !== false || $user_message == 'спс' || $user_message == 'красава') $request_params['message'] = "Пожалуйста, {$user_name} 😌";
        if (strpos($user_message, 'как дела') !== false || $user_message == 'как сам?') $request_params['message'] = "Все отлично, а ты как, {$user_name}?";
        if ($user_message == 'нормально' || $user_message == 'хорошо' || $user_message == 'збс' || $user_message == 'отлично' || $user_message == 'норм') $request_params['message'] = "Круто!";
        if ($user_message == 'time') $request_params['message'] = type_of_day_rus_now();
        if ($user_message == 'помощь' || $user_message == 'что ты умеешь') $request_params['message'] = "Что я умею: \n - Поиск с текущим временем: АВТОБУС ОСТАНОВКА \n - Поиск всех остановок: ОСТАНОВКИ АВТОБУС \n - Расписание на остановке: АВТОБУС ОСТАНОВКА РАСПИСАНИЕ \n- Остановки необязательно дописывать, если части хватает, то выведется ответ \n Примеры: \n остановки 17\n 1Т цум (для троллейбуса допиши Т)\n 5 стадион бре расписание\n 17 цум 21:00\n Регистр не важен";
        if ($user_message == 'ты пидор') $request_params['message'] = "Только пидора могли назвать таким именем -  {$user_name}. ";
        if (strpos($user_message, 'кто тебя ') !== false) $request_params['message'] = "Authors: \nvk.com/googlebox - code, idea\nvk.com/evgen_vagabund  - database, debug ";
=======
        if ($user_message == 'спасибо' || $user_message == 'спс') $request_params['message'] = "Пожалуйста, {$user_name} 😌";
        if ($user_message == 'как дела' || $user_message == 'как сам' || $user_message == 'как дела?' || $user_message == 'как сам?') $request_params['message'] = "Все отлично, а ты как, {$user_name}?";
        if ($user_message == 'нормально' || $user_message == 'хорошо' || $user_message == 'збс' || $user_message == 'отлично' || $user_message == 'норм') $request_params['message'] = "Круто!";
        if ($user_message == 'time') $request_params['message'] = type_of_day_rus_now();
        if ($user_message == 'помощь') $request_params['message'] = "Что я умею: \n - Поиск с текущим временем по BUS_NUM STOP_NAME \n - Поиск всех остановок ОСТАНОВКИ BUS_NUM \n - Расписание на остановке BUS_NUM STOP_NAME РАСПИСАНИЕ \n- Остановки необязательно дописывать, если части хватает, то выведется ответ \n Примеры: \n остановки 17\n 6 цум\n 5 стадион бре расписание\n Регистр не важен";
        if ($user_message == 'ты пидор') $request_params['message'] = "Только пидора могли назвать таким именем -  {$user_name}. ";
        if ($user_message == 'кто тебя сделал') $request_params['message'] = "Authors: \nvk.com/googlebox - code, idea\nvk.com/evgen_vagabund  - database, debug ";
>>>>>>> origin/master
        //if ($user_message == 'да' && substr_count($messages_history_bot[0], ',') != 0) $request_params['message'] = "Что значит да?";
        if ($data->object->attachments[0]->type == "sticker") {
            $request_params['message'] = "Классный стикер, жаль я не умею их кидать :(";
            //$request_params['sticker_id'] = "12";
        }
<<<<<<< HEAD
            if (strpos($user_message, 'остановки') !== false) $request_params['message'] = implode(", ", all_stops(mb_strtoupper(RemoveKeyWord("остановки", $user_message))));
        if (strpos($user_message, 'транспорт') !== false){

            $request_params['message'] = answer_for_bus_stop(try_to_find_from_all(RemoveKeyWord("транспорт", $user_message)),"Туда", type_of_day_rus_now());
        }
        if ((count($current = explode(' ', $user_message)) >= 2) && $request_params['message'] == "") {

            $request_params['message'] = BuStopResp(SortRightWay($current));
        }

        if ($request_params['message'] == "" ) $request_params['message'] = "Если нужна помощь, напиши: помощь";
=======
        if (strpos($user_message, 'остановки') !== false) $request_params['message'] = implode(", ", all_stops(mb_strtoupper(explode(' ', $user_message, 2)[1]), "1"));
        if ((count($current = explode(' ', $user_message)) >= 2) && $request_params['message'] == "") {
            if (get_route(mb_strtoupper($current[0]), "Туда")) {
                //дописать проверку пар, а еще разобраться с маршрутами, что ездят только в субботу, кавычки
                $normal_stop = "";
                $rasp_checker = "";
                $current_bus = mb_strtoupper($current[0]);
                if (end($current) == "расписание")
                    $rasp_checker = array_pop($current);
                if ($normal_stop = try_to_find_stop(mb_strtolower(implode(" ", array_slice($current, 1))), $current_bus)) $normal_stop = GetUpperStopName($current_bus, $normal_stop);
                if (check_one_stop($current_bus, "Туда", $normal_stop) && $normal_stop != "") {
                    $request_params['message'] = "";
                    $rasp = 0;
                    $current_date = date("G:i", $t);

                    if ($rasp_checker == "расписание") $rasp = 1; //проверка на одно направление, чиститм чтобы мусора не было, ибо добавляем в строку, а не присваеваем
                    if ($time = closest_time_new($current_bus, "Туда", $normal_stop, $current_date, $rasp))
                        $request_params['message'] = $current_bus . ". " . get_route($current_bus, "Туда") . " на остановке " . $normal_stop . " будет в " . $time . "\n";
                    if ($time = closest_time_new($current_bus, "Обратно", $normal_stop, $current_date, $rasp))
                        $request_params['message'] .= $current_bus . ". " . get_route($current_bus, "Обратно") . " на остановке " . $normal_stop . " будет в " . $time;
                }
            }
        }

        if ($request_params['message'] == "") $request_params['message'] = "Если нужна помощь напиши: помощь";
>>>>>>> origin/master

        file_get_contents('https://api.vk.com/method/messages.send?' . http_build_query($request_params));


//Возвращаем "ok" серверу Callback API
        echo('ok');

        break;
}

