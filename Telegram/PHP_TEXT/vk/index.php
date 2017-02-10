<?php
date_default_timezone_set("Europe/Minsk");
$t = time();

function isWeekend($date) {
    return (date('N', strtotime($date)) >= 6);
}

function type_of_day_rus($date)
{
    if (isWeekend($date)) return "Выходной";
    else return "Рабочий";
}

function found_by_stop ($bus, $route, $stop){
    global $t;
    $data = json_decode(file_get_contents('17.Север.' . type_of_day_rus($t) . '.json'));
    return $data -> $stop;

}

function all_stops ($bus, $route){
    global $t;
    $data = json_decode(file_get_contents($bus . '.Север.' . type_of_day_rus($t) . '.json'), true);
    return array_keys($data);

}

function get_route($bus){
    global $t;
    $data = json_decode(file_get_contents($bus . '.Север.' . type_of_day_rus($t) . '.json'), true);
    return current(array_keys($data)) . " - " . end(array_keys($data));
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
    'АП ',
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
    'Завод Цветотрон',
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
        $comma_separated = implode(",", $messages_history);
            //*/
        $last_message = $comma_separated;

        //даешь номер -- получаешь список остановок, туда и обратно
        //даешь остановку -- получаешь список автобусов, туда и обратно
        //либо пары номер + остановка, остановка + номер, номер + время + остановка, и т.д.





        /*
            default : $responce_for_message = "{$user_name}, проверьте правильность ввода";
        }*/




        $found_res = array_filter($stops_low, function($el) use ($user_message) {
            return ( mb_strpos($el, $user_message) !== false );//удаляем все что не подходит
        });

        $found_res_up = array();
        foreach ($found_res as $value) array_push($found_res_up, strval(array_search($value, $stops_low)) . ". " . strval($stops[array_search($value, $stops_low)])); // добавляем в массив красивые
        /*$search_stop = 0;
         * if (($search_stop = array_search($user_message, $stops_low)) != false)
            $responce_for_message = "Нашли остановку под номером {$search_stop} - {$stops[$search_stop]}";*/
        $responce_for_message = implode(", ",$found_res_up);//клеим

        switch ($user_message) {
            case 'ты пидор':
                $responce_for_message = "Сам ты пидор, {$user_name}! ";
                break;
            case 'time':
                $responce_for_message = date("G:i:s", $t);
                break;
            case 'привет':
                $responce_for_message = "Привет, {$user_name}!";
                break;
        }


//С помощью messages.send и токена сообщества отправляем ответное сообщение
        $request_params = array(
            'message' => " {$responce_for_message}",

            'user_id' => $user_id,
            'access_token' => $token,
            'v' => '5.0'
        );
        if ($responce_for_message == "")$request_params['message']= 'Хз';
        //если в предыдущем сообщении бота только один ответ, проверям количество точек после номера остановки
        if ($user_message == 'да' && substr_count($messages_history_bot[0], ',') == 0 && substr_count($messages_history_bot[0], '.') == 1)
            $request_params['message']= get_route("17") .  " на остановке " . explode('.', $messages_history_bot[0])[0] . ". " . $stops[explode('.', $messages_history_bot[0])[0]] . " будет в " . closest_time(found_by_stop("17", "Север", $stops[explode('.', $messages_history_bot[0])[0]]), date("G:i", $t));

        //для условия, когда остановок много, а ответ да, т.е. точек после номеров много
        if ($user_message == 'да' && substr_count($messages_history_bot[0], ',') != 0)$request_params['message']= "Что значит да?";

        //all stops for bus
        if (strpos($user_message, 'остановки') !== false) $request_params['message'] = implode(", ", all_stops(explode(' ', $user_message, 2)[1],"1"));

        //если пользователь написал номер остановки, сразу предлагаем транспорт
        if (is_numeric($user_message)) $request_params['message'] =  get_route("17") .  " на остановке " . $user_message . ". " . $stops[$user_message] . " будет в " . closest_time(found_by_stop("17", "Север", $stops[$user_message]), date("G:i", $t));

        //если есть одно точное совпадение введенной пользователем остановки
        if ($found_fast = array_search(mb_strtolower($user_message), $stops_low)) $request_params['message'] = get_route("17") .  " на остановке " . $found_fast . ". " . $stops[$found_fast] . " будет в " . closest_time(found_by_stop("17", "Север", $stops[$found_fast]), date("G:i", $t));

        if ($user_message == 'кинь музыку'){
            $request_params['attachment'] = 'audio179667459_456239214';
            $request_params['message']= 'Держи!';
        }
        if ($user_message == 'кинь мем'){
            $request_params['attachment'] = 'photo-139467761_456239018';
            $request_params['message']= 'Наканецта мемыыыы';
        }


        if($responce_for_message == "") $responce_for_message = "Даже не знаю, что ответить";

        if ($data->object->attachments[0]->type == "sticker") $request_params['message'] = "Классный стикер, жаль я не умею их кидать :(";

        $get_params = http_build_query($request_params);

        file_get_contents('https://api.vk.com/method/messages.send?'. $get_params);

//Возвращаем "ok" серверу Callback API
        echo('ok');

        break;
}
?>
