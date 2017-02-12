<?php
date_default_timezone_set("Europe/Minsk");
$t = time();

function answer_for_bus_stop(){

}

function SendMessage ($text, $flag){
    global $user_id, $token;

    $request_params = array(
        'message' => $text,
        'user_id' => $user_id,
        'access_token' => $token,
        'v' => '5.0'
    );

    file_get_contents('https://api.vk.com/method/messages.send?'. http_build_query($request_params));
    if ($flag) echo('ok');
}

function array_change_key_case_unicode($arr, $c = CASE_LOWER) {
    $c = ($c == CASE_LOWER) ? MB_CASE_LOWER : MB_CASE_UPPER;
    foreach ($arr as $k => $v) {
        $ret[mb_convert_case($k, $c, "UTF-8")] = $v;
    }
    return $ret;
}




function try_to_find_stop($stop){

    global $stops_low;

    $found_res = array_filter($stops_low, function($el) use ($stop) {
        return ( mb_strpos($el, $stop) !== false );//удаляем все что не подходит
    });

    if (count($found_res) == 1) {

        //SendMessage("нашли по части " . $stop);
        return implode("", $found_res);
    }
    else return 0;

}

function isWeekend() {
    global $t;
    return (date('N', $t) >= 6);
}

function type_of_day_rus()
{
    if (isWeekend()) return "Выходной";
    else return "Рабочий";
}

function check_stop($stop){
    global $stops_low;

    if(!in_array($stop, $stops_low) && !try_to_find_stop($stop)){
        SendMessage("Нет такой остановки!", false);
        return 0;
    }
    else return 1;

}

function found_by_stop ($bus, $route, $stop){


    $second_route_to_check = "Туда";
    if ($route == "Туда") $second_route_to_check = "Обратно";

    $data = file_get_contents('bus/' . $bus . '.' . $route . '.' . type_of_day_rus() . '.json');
    $data_for_check = file_get_contents('bus/' . $bus . '.' . $second_route_to_check . '.' . type_of_day_rus() . '.json');

    return array_change_key_case_unicode(json_decode($data, true), CASE_LOWER)[mb_strtolower($stop)];

    /*if(array_key_exists($stop, json_decode($data)) && $data !== FALSE && array_key_exists($stop, json_decode($data_for_check)) && $data_for_check !== FALSE) return json_decode($data)-> $stop;

    else {

        return 0;
    }*/
}

function check_one_stop($bus, $route, $stop){

    $second_route_to_check = "Туда";
    if ($route == "Туда") $second_route_to_check = "Обратно";

    $data = file_get_contents('bus/' . $bus . '.' . $route . '.' . type_of_day_rus() . '.json');
    $data_for_check = file_get_contents('bus/' . $bus . '.' . $second_route_to_check . '.' . type_of_day_rus() . '.json');

    $data_map = array_change_key_case_unicode(json_decode($data), CASE_LOWER);
    $data_for_check_map = array_change_key_case_unicode(json_decode($data_for_check), CASE_LOWER);

    if(array_key_exists($stop, $data_map) && $data !== FALSE && !array_key_exists($stop, $data_for_check_map) && $data_for_check !== FALSE){
        SendMessage("Остановка есть только в одном направлении", false);
        return 1;

    }
    if(!array_key_exists($stop, $data_map) && $data !== FALSE && array_key_exists($stop, $data_for_check_map) && $data_for_check !== FALSE) {
        SendMessage("Остановка есть только в одном направлении", false);
        return 1;

    }
    if(array_key_exists($stop, $data_map) && $data !== FALSE && array_key_exists($stop, $data_for_check_map) && $data_for_check !== FALSE) return 1;

    else {
        SendMessage("На даном маршруте нет такой остановки или сегодня ничего уже нет", false);
        return 0;
    }


}

function all_stops ($bus, $route){
    global $t;

        $data_one = file_get_contents('bus/' . $bus . '.Туда.Рабочий.json');
        $data_two = file_get_contents('bus/' . $bus . '.Обратно.Рабочий.json');
    if($data_one !== FALSE || $data_two !== FALSE) return array_unique(array_merge(array_keys(json_decode($data_one, true)), array_keys(json_decode($data_two, true))));
    else return array("Нет такого автобуса!");

}

function get_route($bus, $route){
    global $t;
    $data = file_get_contents('bus/' . $bus . '.' . $route . '.Рабочий.json');
    if($data === FALSE) {
        SendMessage("Нет такого автобуса!(", false);
        return 0;
    }
    return current(array_keys(json_decode($data, true))) . " - " . end(array_keys(json_decode($data, true)));
}

function convert_time ($time){ //returns time in seconds

    return strtotime("1970-01-01 $time UTC");
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
    if ($offset ==  100000000) return "завтравшем дне, или не будет, мало кто может это знать";
    return $offset_return;
}

if (!isset($_REQUEST)) {
    return;
}


$stops = array('28 июля',
    '4-й Форт',
    'Абрикосовая',
    'Автобаза связи',
    'Автовокзал',
    'Автолюбителей',
    'Авторынок',
    'Автошкола',
    'Агротранс',
    'Адамковская',
    'Амбулатория',
    'АП',
    'Аркадия',
    'Аэродромная',
    'Аэроклуб',
    'Б.Космонавтов',
    'Б.Шевченко',
    'база «Рыбторг»',
    'Бауманская',
    'Безымянная',
    'Беларусбанк',
    'Беловежская',
    'Белорусская',
    'Белтранс Ойл',
    'Березовая роща',
    'Березовка',
    'Бернады',
    'Благовещенского',
    'Боброва',
    'Богдановича',
    'Богданчука',
    'Брест Восточный',
    'Брест Западный',
    'Брестглавснаб',
    'Брестоблавтотранс',
    'Брестсельстрой',
    'Брестских дивизий',
    'БТИ',
    'БТК',
    'БЭТЗ',
    'ВамРад',
    'Варшавский рынок',
    'Варшавское шоссе',
    'Веселая',
    'Ветлечебница',
    'Ветренная',
    'Внештранс',
    'Водозабор',
    'Водоканал',
    'Волгоградская',
    'Волынка',
    'Восточная',
    'Восточный микрорайон',
    'Вторцветмет',
    'Вульковская',
    'Высокая',
    'Гаврилова',
    'Гагарина',
    'Гаражи ОПC',
    'Гастелло',
    'Гвардейская',
    'Георгиевская',
    'Гершоны',
    'Гефест-Кварц',
    'Гоголя',
    'Городская',
    'Городская больница №1',
    'ГОРТОП',
    'Гостиница Беларусь',
    'Гостиница Дружба',
    'Гостиница Юность',
    'Гребной канал',
    'Грибоедова',
    'Гузнянская',
    'Д.П. Южный городок',
    'Дворец спорта Виктория',
    'Дворникова',
    'Дворцовая',
    'деревня Плоска',
    'Детский городок',
    'Добрая',
    'Дом ветеранов',
    'ДСУ',
    'Дубровка',
    'Екельчика',
    'Есенина',
    'Ж/Д техникум',
    'Жукова',
    'Завод',
    'Завод бытовой химии',
    'Завод Газоаппарат',
    'Цветотрон',
    'Загородная',
    'Загороднева',
    'Заречная',
    'Защитников Отечества',
    'Зеленая',
    'Зона отдыха',
    'Зубачёва',
    'Инволюкс',
    'Инко Фуд',
    'Интертранс',
    'Интурист',
    'К.Боярская',
    'Калиновая',
    'Карасева',
    'Картодром',
    'Карьерная',
    'Катин бор',
    'Кедровая',
    'Киевская',
    'Кирпичная',
    'Кл.Северное',
    'Кладбище',
    'кладбище Плоска',
    'Клары Цеткин',
    'Клейники',
    'Ковалево',
    'Ковельская',
    'Ковры Бреста',
    'Колесника',
    'Колледж торговли',
    'Кольцевая',
    'Комсомольская',
    'Костюшко',
    'Красногвардейская',
    'Краснознаменная',
    'Краснознамённая',
    'Красный двор',
    'Крепость',
    'Криштофовича',
    'Крушинская',
    'Купальская',
    'Лейтенанта Акимочкина',
    'Ленина',
    'Ленинградская',
    'Летная',
    'Лицей',
    'л-та Рябцева',
    'Луцкая',
    'Лысая гора',
    'М. р-н Южный',
    'М. р-н Южный  ',
    'Маг. Северный',
    'Магазин',
    'Магазин Продтовары',
    'Махновича',
    'Маш.строит. завод',
    'Маяковского',
    'Медицинская',
    'Микрорайон Вулька',
    'Митьки',
    'Мицкевича',
    'Молодёжная',
    'МОПРа',
    'Московское шоссе',
    'Мостовая',
    'Мошенского',
    'м-рн Заречный',
    'Музей Ж/д техники',
    'Музей спасенн.ценностей',
    'Мухавецкая',
    'Мясокомбинат',
    'Новая',
    'Новосельская',
    'Новые Задворцы',
    'ОАО Агротранс',
    'ОАО Брестское пиво',
    'Обл.больница',
    'Обсерватория',
    'Овощебаза',
    'Озёрная',
    'Озеро',
    'Октябрьской революции',
    'Орловская',
    'Осипенко',
    'Остановка',
    'Парк 1 МАЯ',
    'Парк Воинов-интернац-ов',
    'Партизанский проспект',
    'Пер. Есенина',
    'пер. Калиновый',
    'Перекресток',
    'Переулок',
    'Пионерская',
    'Площадь Ленина',
    'Пов.Ковердяки',
    'Пов.Козловичи',
    'Поворот Жемчужина',
    'Подгородская',
    'Подсобное хозяйство',
    'Пожарное депо',
    'Поликлиника',
    'Почта',
    'Прибужская',
    'Пригородная',
    'Пригородный вокзал',
    'Приграничная',
    'Промтехника',
    'Пронягина',
    'Проспект Машерова',
    'Проспект Республики',
    'Профсоюзная',
    'ПСО',
    'Пугачево',
    'Пункт подготовки вагонов',
    'Пушкинская',
    'Радужная',
    'Рембыттехника',
    'Республиканская',
    'Речицкая',
    'Рокоссовского',
    'Рынок ЛАГУНА',
    'Рыньковка',
    'Рябиновая',
    'С/т Жемчужина',
    'С/т Светлячок',
    'С/т Южное 1',
    'С/т Южное 2',
    'Садовая',
    'Сальникова',
    'Санта Бремор',
    'Санта-53',
    'Санта-54',
    'Светлая',
    'Сев. Кольцо',
    'Сикорского',
    'Сиреневая',
    'Сквер Иконникова',
    'Скрипникова',
    'Славнефть',
    'Смирнова',
    'Советская',
    'Советской конституции',
    'Сосновая',
    'Спортшкола',
    'Средняя Школа №1',
    'Стадион Брестский',
    'Стадион Локомотив',
    'Стадион Строитель',
    'Станция юннатов',
    'Старые Задворцы',
    'Стафеева',
    'Стимово',
    'СТО-2',
    'Строительная',
    'Строительный рынок',
    'СЭЗ Брест',
    'Т.Д.ИДЕАЛ',
    'Театр',
    'Тельмы',
    'Тенистая',
    'Технический университет',
    'Тихая',
    'Торговый центр Восток',
    'Транспортная',
    'Троллейбусный парк',
    'Трудовая',
    'ТЭЦ',
    'Тюхиничи',
    'ул. Вересковая',
    'ул.Ландшафтная',
    'Университет',
    'Училище олимпийского резерва',
    'Учительская',
    'ФОК',
    'Фомина',
    'Форт',
    'Хлебпром',
    'ЦГБ',
    'Центральная',
    'ЦМТ',
    'ЦУМ',
    'Чернинская',
    'Чулочный комбинат',
    'Шафрановая',
    'Школа',
    'Школьная',
    'Шоссейная',
    'Электросети',
    'Юбилейная',
    'Я. Купалы',
    'Ямно',
    'Ясеневая',
    'Орджоникидзе','К.Маркса','Гимназия №1','Промстройбанк','Свердлова');
$stops_low  =  array_map('mb_strtolower', $stops);
//Строка для подтверждения адреса сервера из настроек Callback API
$confirmation_token = '0b455572';

//Ключ доступа сообщества
$token = '74303386834fbb2e15939e6b0d242c03463c047df94b5a365d2f0797c0e9e3c8fb37d15fd97b3b24bbd22';

//Получаем и декодируем уведомление
$data = json_decode(file_get_contents('php://input'));

//Проверяем, что находится в поле "type"
switch ($data->type) {
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
        $user_message = mb_strtolower($data->object->body);
        $responce_for_message = "";

        //работа с предыдущими сообщениями
        $request_mess = array(
            'count' => '6',
            'user_id'=> $user_id,
            'access_token' => $token,
            'v' => '5.62'
        );
        $get_mess = http_build_query($request_mess);
        $prev_messages = json_decode(file_get_contents('https://api.vk.com/method/messages.getHistory?'. $get_mess));

        $messages_history = array();
        $messages_history_bot = array();

        foreach ($prev_messages->response->items as $key => $value){
            if ($value->from_id == $user_id) array_push($messages_history,  $value->body);
            else array_push($messages_history_bot,  $value->body);
        }
        unset($value);
        $comma_separated = implode(",", $messages_history); // ненужное  и снизу тоже
            //*/
        $last_message = $comma_separated;




        $found_res = array_filter($stops_low, function($el) use ($user_message) {
            return ( mb_strpos($el, $user_message) !== false );//удаляем все что не подходит
        });

        $found_res_up = array();
        foreach ($found_res as $value) array_push($found_res_up, strval(array_search($value, $stops_low)) . ". " . strval($stops[array_search($value, $stops_low)])); // добавляем в массив красивые

        $responce_for_message = implode(", ",$found_res_up);//клеим




//С помощью messages.send и токена сообщества отправляем ответное сообщение
        $request_params = array(
            'message' => " {$responce_for_message}",

            'user_id' => $user_id,
            'access_token' => $token,
            'v' => '5.0'
        );
        if($responce_for_message == "") $request_params['message'] = "Даже не знаю, что ответить";
        if ($user_message == 'кинь музыку'){
            $request_params['attachment'] = 'audio179667459_456239214';
            $request_params['message']= 'Держи!';
        }
        if ($user_message == 'кинь мем'){
            $memes = array("_456239018", "_456239021", "_456239022", "_456239023", "_456239024", "_456239025");
            $request_params['attachment'] = 'photo-139467761' . $memes[array_rand($memes)];
            $request_params['message']= 'Мемыыыы, наканецтааааа';
        }

        if($user_message == 'привет') $request_params['message'] = "Привет, {$user_name}!";
        if($user_message == 'спасибо' || $user_message == 'спс') $request_params['message'] = "Пожалуйста, {$user_name} 😌";
        if($user_message == 'как дела' || $user_message == 'как сам' || $user_message == 'как дела?' || $user_message == 'как сам?') $request_params['message'] = "Все отлично, а ты как, {$user_name}?";
        if($user_message == 'нормально' || $user_message == 'хорошо' || $user_message == 'збс' || $user_message == 'отлично'|| $user_message == 'норм') $request_params['message'] = "Круто!";
        if($user_message == 'time') $request_params['message']= type_of_day_rus();
        if($user_message == 'помощь') $request_params['message']= "Что я умею: \n - Поиск по BUS_NAME STOP_NAME \n - Поиск всех остановок ОСТАНОВКИ BUS_NAME \n - Остановки необязательно дописывать, если вхождения хватает, то выведется ответ \n Примеры: \n остановки 17\n 6 цум\n 5 стадион бре\n Регистр не важен!";
        if($user_message == 'ты пидор') $request_params['message'] = "Только пидора могли назвать таким именем -  {$user_name}. ";

        if($user_message == 'кто тебя сделал') $request_params['message'] = "Authors: \nvk.com/googlebox - code, idea\nvk.com/evgen_vagabund  - database, debug ";



        //если в предыдущем сообщении бота только один ответ, проверям количество точек после номера остановки
        //if ($user_message == 'да' && substr_count($messages_history_bot[0], ',') == 0 && substr_count($messages_history_bot[0], '.') == 1)
            //$request_params['message']= get_route("17") .  " на остановке " . explode('.', $messages_history_bot[0])[0] . ". " . $stops[explode('.', $messages_history_bot[0])[0]] . " будет в " . closest_time(found_by_stop("17", "Север", $stops[explode('.', $messages_history_bot[0])[0]]), date("G:i", $t));

        //для условия, когда остановок много, а ответ да, т.е. точек после номеров много
        if ($user_message == 'да' && substr_count($messages_history_bot[0], ',') != 0)$request_params['message']= "Что значит да?";

        //all stops for bus


        if ((count($current = explode(' ', $user_message)) >= 2) && ($current[0] != 'остановки')&& ($current[0] != 'кинь') && ($current[0] != 'ты') && ($current[0] != 'как') && $user_message != 'кто тебя сделал' && $user_message != 'ты пидор') {
            if (get_route(mb_strtoupper($current[0]), "Туда")) {
                //if (!check_stop(mb_strtolower(implode(" ", array_slice($current, 1))))) break;

                //дописать проверку пар, а еще разобраться с маршрутами, что ездят только в субботу добавить возможность посмотреть все расписание еще переход на следующий день и нормальный вывод когда нет результатаяя
                $normal_stop = try_to_find_stop(mb_strtolower(implode(" ", array_slice($current, 1))));
                if (check_one_stop(mb_strtoupper($current[0]), "Туда", $normal_stop)) $request_params['message'] = mb_strtoupper($current[0]) . ". " . get_route(mb_strtoupper($current[0]), "Туда") . " на остановке " . $stops[array_search($normal_stop, $stops_low)] . " будет в " . closest_time(found_by_stop(mb_strtoupper($current[0]), "Туда", $stops[array_search($normal_stop, $stops_low)]), date("G:i", $t)) . " &#10145;" . "\n" . mb_strtoupper($current[0]) . ". " . get_route(mb_strtoupper($current[0]), "Обратно") . " на остановке " . $stops[array_search($normal_stop, $stops_low)] . " будет в " . closest_time(found_by_stop(mb_strtoupper($current[0]), "Обратно", $stops[array_search($normal_stop, $stops_low)]), date("G:i", $t)) . " &#11013;";
            }
        }
        if (strpos($user_message, 'остановки') !== false) $request_params['message'] = implode(", ", all_stops(mb_strtoupper(explode(' ', $user_message, 2)[1]),"1"));
        //если пользователь написал номер остановки, сразу предлагаем транспорт
        //if (is_numeric($user_message)) $request_params['message'] =  get_route("17") .  " на остановке " . $user_message . ". " . $stops[$user_message] . " будет в " . closest_time(found_by_stop("17", "Туда", $stops[$user_message]), date("G:i", $t));

        //если есть одно точное совпадение введенной пользователем остановки
        //if ($found_fast = array_search(mb_strtolower($user_message), $stops_low)) $request_params['message'] = get_route("17") .  " на остановке " . $found_fast . ". " . $stops[$found_fast] . " будет в " . closest_time(found_by_stop("17", "Север", $stops[$found_fast]), date("G:i", $t));



        if ($data->object->attachments[0]->type == "sticker") $request_params['message'] = "Классный стикер, жаль я не умею их кидать :(";



        file_get_contents('https://api.vk.com/method/messages.send?'. http_build_query($request_params));


//Возвращаем "ok" серверу Callback API
        echo('ok');

        break;
}
?>
