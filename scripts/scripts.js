// JavaScript Document




var send_requset;
var flag = false;




$(function load_clear_buttons () {

    $( "#top_input" ).jQueryClearButton(); // вызов крестика для очистки полей
    $( "#bottom_input" ).jQueryClearButton();
    $( "#cost_input" ).jQueryClearButton();
    //$( "#time_input" ).jQueryClearButton();

})


function GetSavedCookies() { // ставим cookie в формы


    var radio_mass = ["r1", "r2", "r3"];

    for (var i=0; i < radio_mass.length; i++ ){
        if (getCookie("transp_" + (i+1)) == "not_active") document.getElementById(radio_mass[i]).checked = "checked";
    }



    $('#top_input').val(getCookie("form_first"));
    $('#bottom_input').val(getCookie("form_second"));
    $('#cost_input').val(getCookie("form_cost"));
    //$('#time_input').val(getCookie("time_cost"));

    if (getCookie("choise_1") == "active") document.getElementById("c1").checked = "checked";
    if (getCookie("choise_2") == "active") {
        document.getElementById("c2").checked = "checked";
        $("#cost_time").slideToggle("slow", function () {
        });
    }
    if (getCookie("choise_3") == "active") document.getElementById("c3").checked = "checked";
}

function SaveCookies() { // заносим cookie в память (пока без срока хранения)
    var time = "/";
    var cookies_mass = ["r1", "r2", "r3", "c1", "c2", "c3"];

    setCookie("form_first",$('#top_input').val(),time);
    setCookie("form_second",$('#bottom_input').val(),time);
    setCookie("form_cost",$('#cost_input').val(),time);
    //setCookie("time_cost",$('#time_input').val(),time);

    for (var i=0; i < cookies_mass.length / 2; i++ ){

        if (document.getElementById(cookies_mass[i]).checked) setCookie("transp_" + (i+1),"not_active",time); else setCookie("transp_" + (i+1),"active",time);
        if (document.getElementById(cookies_mass[i+3]).checked) setCookie("choise_" + (i+1),"active",time); else setCookie("choise_" + (i+1),"not_active",time);

    }

}
//var stops = new Array();

var availableTags = new Array();

  $(function() {
      /*$.getJSON("data/stops.json",function (json) {

          for (var i = 0; i < json.results.length; i++) {
              stops[i] =  json.results[i].name
          }

      });*/
       availableTags = ["28 июля",
          "4-й Форт",
          "Абрикосовая",
          "Автобаза связи",
          "Автовокзал",
          "Автолюбителей",
          "Авторынок",
          "Автошкола",
          "Агротранс",
          "Адамковская",
          "Амбулатория",
          "АП ",
          "Аркадия",
          "Аэродромная",
          "Аэроклуб",
          "Б.Космонавтов",
          "Б.Шевченко",
          "база «Рыбторг»",
          "Бауманская",
          "Безымянная",
          "Беларусбанк",
          "Беловежская",
          "Белорусская",
          "Белтранс Ойл",
          "Березовая роща",
          "Березовка",
          "Бернады",
          "Благовещенского",
          "Боброва",
          "Богдановича",
          "Богданчука",
          "Брест Восточный",
          "Брест Западный",
          "Брестглавснаб",
          "Брестоблавтотранс",
          "Брестсельстрой",
          "Брестских дивизий",
          "БТИ",
          "БТК",
          "БЭТЗ",
          "ВамРад",
          "Варшавский рынок",
          "Варшавское шоссе",
          "Веселая",
          "Ветлечебница",
          "Ветренная",
          "Внештранс",
          "Водозабор",
          "Водоканал",
          "Волгоградская",
          "Волынка",
          "Восточная",
          "Восточный микрорайон",
          "Вторцветмет",
          "Вульковская",
          "Высокая",
          "Гаврилова",
          "Гагарина",
          "Гаражи ОПC",
          "Гастелло",
          "Гвардейская",
          "Георгиевская",
          "Гершоны",
          "Гефест-Кварц",
          "Гоголя",
          "Городская",
          "Городская больница №1",
          "ГОРТОП",
          "Гостиница Беларусь",
          "Гостиница Дружба",
          "Гостиница Юность",
          "Гребной канал",
          "Грибоедова",
          "Гузнянская",
          "Д.П. \"Южный городок\"",
          "Дворец спорта Виктория",
          "Дворникова",
          "Дворцовая",
          "деревня Плоска",
          "Детский городок",
          "Добрая",
          "Дом ветеранов",
          "ДСУ",
          "Дубровка",
          "Екельчика",
          "Есенина",
          "Ж/Д техникум",
          "Жукова",
          "Завод",
          "Завод бытовой химии",
          "Завод Газоаппарат",
          "Завод Цветотрон",
          "Загородная",
          "Загороднева",
          "Заречная",
          "Защитников Отечества",
          "Зеленая",
          "Зона отдыха",
          "Зубачёва",
          "Инволюкс",
          "Инко Фуд",
          "Интертранс",
          "Интурист",
          "К.Боярская",
          "Калиновая",
          "Карасева",
          "Картодром",
          "Карьерная",
          "Катин бор",
          "Кедровая",
          "Киевская",
          "Кирпичная",
          "Кл.Северное",
          "Кладбище",
          "кладбище Плоска",
          "Клары Цеткин",
          "Клейники",
          "Ковалево",
          "Ковельская",
          "Ковры Бреста",
          "Колесника",
          "Колледж торговли",
          "Кольцевая",
          "Комсомольская",
          "Костюшко",
          "Красногвардейская",
          "Краснознаменная",
          "Краснознамённая",
          "Красный двор",
          "Крепость",
          "Криштофовича",
          "Крушинская",
          "Купальская",
          "Лейтенанта Акимочкина",
          "Ленина",
          "Ленинградская",
          "Летная",
          "Лицей",
          "л-та Рябцева",
          "Луцкая",
          "Лысая гора",
          "М. р-н Южный",
          "М. р-н Южный  ",
          "Маг. \"Северный\"",
          "Магазин",
          "Магазин \"Продтовары\"",
          "Махновича",
          "Маш.строит. завод",
          "Маяковского",
          "Медицинская",
          "Микрорайон Вулька",
          "Митьки",
          "Мицкевича",
          "Молодёжная",
          "МОПРа",
          "Московское шоссе",
          "Мостовая",
          "Мошенского",
          "м-рн Заречный",
          "Музей Ж/д техники",
          "Музей спасенн.ценностей",
          "Мухавецкая",
          "Мясокомбинат",
          "Новая",
          "Новосельская",
          "Новые Задворцы",
          "ОАО \"Агротранс\"",
          "ОАО Брестское пиво",
          "Обл.больница",
          "Обсерватория",
          "Овощебаза",
          "Озёрная",
          "Озеро",
          "Октябрьской революции",
          "Орловская",
          "Осипенко",
          "Остановка",
          "Парк 1 МАЯ",
          "Парк Воинов-интернац-ов",
          "Партизанский проспект",
          "Пер. Есенина",
          "пер. Калиновый",
          "Перекресток",
          "Переулок",
          "Пионерская",
          "Площадь Ленина",
          "Пов.Ковердяки",
          "Пов.Козловичи",
          "Поворот Жемчужина",
          "Подгородская",
          "Подсобное хозяйство",
          "Пожарное депо",
          "Поликлиника",
          "Почта",
          "Прибужская",
          "Пригородная",
          "Пригородный вокзал",
          "Приграничная",
          "Промтехника",
          "Пронягина",
          "Проспект Машерова",
          "Проспект Республики",
          "Профсоюзная",
          "ПСО",
          "Пугачево",
          "Пункт подготовки вагонов",
          "Пушкинская",
          "Радужная",
          "Рембыттехника",
          "Республиканская",
          "Речицкая",
          "Рокоссовского",
          "Рынок \"ЛАГУНА\"",
          "Рыньковка",
          "Рябиновая",
          "С/т Жемчужина",
          "С/т Светлячок",
          "С/т Южное 1",
          "С/т Южное 2",
          "Садовая",
          "Сальникова",
          "Санта Бремор",
          "Санта-53",
          "Санта-54",
          "Светлая",
          "Сев. Кольцо",
          "Сикорского",
          "Сиреневая",
          "Сквер Иконникова",
          "Скрипникова",
          "Славнефть",
          "Смирнова",
          "Советская",
          "Советской конституции",
          "Сосновая",
          "Спортшкола",
          "Средняя Школа №1",
          "Стадион Брестский",
          "Стадион Локомотив",
          "Стадион Строитель",
          "Станция юннатов",
          "Старые Задворцы",
          "Стафеева",
          "Стимово",
          "СТО-2",
          "Строительная",
          "Строительный рынок",
          "СЭЗ Брест",
          "Т.Д.ИДЕАЛ",
          "Театр",
          "Тельмы",
          "Тенистая",
          "Технический университет",
          "Тихая",
          "Торговый центр Восток",
          "Транспортная",
          "Троллейбусный парк",
          "Трудовая",
          "ТЭЦ",
          "Тюхиничи",
          "ул. Вересковая",
          "ул.Ландшафтная",
          "Университет",
          "Училище олимпийского резерва",
          "Учительская",
          "ФОК",
          "Фомина",
          "Форт",
          "Хлебпром",
          "ЦГБ",
          "Центральная",
          "ЦМТ",
          "ЦУМ",
          "Чернинская",
          "Чулочный комбинат",
          "Шафрановая",
          "Школа",
          "Школьная",
          "Шоссейная",
          "Электросети",
          "Юбилейная",
          "Я. Купалы",
          "Ямно",
          "Ясеневая",
       "Орджоникидзе","К.Маркса","Гимназия №1","Промстройбанк","Свердлова"];
    $( "#top_input" ).autocomplete({source: availableTags}); // подсказка при заполенении формы
	$( "#bottom_input" ).autocomplete({source: availableTags});
  });


/*window.onload = function () { // пафасное появление sidebar'a
    $( "#sidebar" ).fadeToggle( 1000, function() {
    });

}*/



 $(document).ready(function(){

     GetSavedCookies();

     $( "#cost_time" ).hide(); // изначально прячем
     //alert( document.cookie );
     $( document ).tooltip({track: true}); // трек мышки для подсказок



     $( "search" ).button(); // вызвод jquery модуля кнопки
     $( "button_swap" ).button();
     
    $("button_swap").click(function () { // смена значений для назначений
        var temp = $('#top_input').val();
        $('#top_input').val($('#bottom_input').val())
        $('#bottom_input').val(temp);
        SaveCookies();
        

    });
     $( "#no_transport" ).hide(); // прячем слой с подсказкой про отсутствие выбора транспорта
     var time;
     var stopTimeUpdate = false;
     var intervalID;

         intervalID  = setInterval(function setCurrentTime() {
         var minutes, hours;
         var date = new Date();
         if (date.getMinutes() < 10) minutes = "0" + date.getMinutes();
         else minutes = date.getMinutes();
         if (date.getHours() < 10) hours = "0" + date.getHours();
         else hours = date.getHours();
         time = hours + ':' + minutes;
         $('#time_input').val(time);
     }, 1000);
     $('#time_input').click( function(){ clearInterval(intervalID)});


     $("search").click( function(){
         SaveCookies();
         
         var r1 = 1, r2 = 1, r3 = 1, c= 0;

         if ( document.getElementById("r1").checked) r1 = 0; // флаги транспорта
         if ( document.getElementById("r2").checked) r2 = 0;
         if ( document.getElementById("r3").checked) r3 = 0;




         if ( document.getElementById("c1").checked) c = "F"; // типы приоритета
         if ( document.getElementById("c2").checked) c = "C";
         if ( document.getElementById("c3").checked) c = "M";

         var cost = parseInt($('#cost_input').val(), 10);
         if(isNaN(cost)) cost = 0;



         if (availableTags.indexOf($('#top_input').val()) == -1 || availableTags.indexOf($('#bottom_input').val()) == -1 || (r1+r2+r3 == 0) ){
             //alert("Привет, ты че охуел?");
             $( "#no_transport" ).slideDown( "slow", function() {
             });
             if (r1+r2+r3 != 0) document.getElementById("no_transport").innerHTML = "Выберите остановки!";
             if (r1+r2+r3 == 0) document.getElementById("no_transport").innerHTML = "Выберите остановки и <br> транспорт!";
             if (availableTags.indexOf($('#top_input').val()) != -1 && availableTags.indexOf($('#bottom_input').val()) != -1 && r1+r2+r3 != 0) document.getElementById("no_transport").innerHTML = "Выберите транспорт!";
             return;

         }
         else {
             $( "#no_transport" ).slideUp( "slow", function() {
             });
         }
         send_requset = availableTags.indexOf($('#top_input').val()) + " " + availableTags.indexOf($('#bottom_input').val()) + " " + c + " " + cost +" " + /*"12:00"*/$('#time_input').val();
         //alert(send_requset);

         parserfromserver();
         //initMap();
         //popup = new time_popup(map, popup_pos);
         //alert( document.cookie );


     });
     $('#logo').click(function () {
         //$("#sidebar_st").animate({ left: '-262px', opacity :0}, "slow");
         $("#map_handler").removeAttr("float: left");
         //$("#map_handler").animate({ right: '0px', width:'992px'}, "slow");


     })

     $('#cost_input').iMask({ // маска для ввода цены минуты
         type      : 'fixed'
         , mask      : '9999 руб.'
         , stripMask : false
         , maskEmptyChr : ' '


     });
     /*$('#time_input').iMask({ // маска для ввода цены минуты
         type      : 'fixed'
         , mask      : '99:99'
         , stripMask : false
         , maskEmptyChr : ' '


     });*/

     if (getCookie("choise_2") == "active") {
         $("#cost_time").fadeToggle("slow", function () {
             flag = true;
         });
     }


         $("#c2").click(function () { // показываем, если кликнули вторую кнопку ставим флаг да
             if (flag == false) {
             $("#cost_time").fadeToggle("slow", function () {

             });
             }
             flag = true;
         });


         $("#c1").click(function () { // прячем ставим флаг нет, чтобы не могли сработать эти обработчики снова
             if (flag == true) {
                 $("#cost_time").fadeToggle("slow", function () {
                     // Animation complete.
                 });
                 flag = false;
             }
         });

         $("#c3").click(function () { // прячем **
             if (flag == true) {
                 $("#cost_time").fadeToggle("slow", function () {
                     // Animation complete.
                 });
                 flag = false;
             }
         });
     






 });

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.07704652587041, 23.740843534469604&radius=5000&types=bus_station&key=AIzaSyDX3PwHZjDBxhdmU2tFWXzykqQ82a_q-9k
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJB_f_eGIOIUcRk07TJHHH7W8&key=AIzaSyDX3PwHZjDBxhdmU2tFWXzykqQ82a_q-9k -- инфа по place_id
