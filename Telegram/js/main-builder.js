var preventSpam = 0;

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function GetSavedCookies() {

	if (getCookie('lang') == undefined) $(".en").addClass('lang_active');
    $("." + getCookie('lang')).addClass('lang_active');    
    $("head").append("<style id='lang-style'>"  + (getCookie('lang') == 'ru' ? 'en' : 'ru')  + "{display:none;}" + getCookie('lang') + "{display:inherit;}</style>");
   
}

function SaveCookies(lang) { // заносим cookie в память (пока без срока хранения)
    var time = "/";
    setCookie("lang", lang, time);    
}


$(document).ready(function () {
  var element_to_change, type = 0;
  $("*").on("click", function (event) {
    if ($(event.target).attr('name') != "change" && $(event.target).attr('name') != "input_hex" && $(event.target).attr('name') != "change_bg")
      $(".overlay-view").css({
                display:'none'
          });
    if ($(event.target).attr('name') == "change"){
        show_hex();
            
            element_to_change = $(event.target);
            type = 0;
          }
    if ($(event.target).attr('name') == "change_bg"){
        show_hex();
            
            element_to_change = $(event.target);
            type = 1;
    }
    
            
  });
  var times = "6:20 7:04 7:38 9:11 10:47 12:06 13:15 14:17 15:38 17:05 18:35 19:56 21:16 22:17 6:22 7:06 7:40 9:13 10:49 12:08 13:17 14:19 15:40 17:07 18:37 19:58 21:18 22:19 6:24 7:08 7:42 9:15 10:51 12:10 13:19 14:21 15:42 17:09 18:39 20:00 21:20 22:21 6:25 7:10 7:43 9:17 10:53 12:12 13:21 14:23 15:44 17:11 18:41 20:02 21:22 22:23 6:27 7:12 7:45 9:19 10:55 12:14 13:23 14:25 15:46 17:14 18:43 20:04 21:24 22:25 6:31 7:16 7:49 9:23 10:59 12:18 13:27 14:29 15:50 17:18 18:47 20:08 21:28 22:29 6:33 7:19 7:52 9:25 11:01 12:20 13:29 14:32 15:53 17:21 18:49 20:10 21:30 22:31 6:37 7:23 7:56 9:29 11:05 12:24 13:33 14:36 15:57 17:25 18:53 20:14 21:34 22:35 6:39 7:25 7:58 9:31 11:07 12:26 13:35 14:38 15:59 17:27 18:55 20:16 21:36 22:37 6:41 7:27 8:00 9:33 11:09 12:28 13:37 14:40 16:01 17:29 18:57 20:18 21:38 22:39 6:42 7:29 8:02 9:35 11:10 12:29 13:38 14:42 16:03 17:31 18:59 20:20 21:39 22:41 6:44 7:31 8:04 9:37 11:12 12:31 13:40 14:44 16:05 17:33 19:01 20:22 21:41 22:43 6:45 7:33 8:06 9:38 11:13 12:32 13:41 14:45 16:06 17:35 19:02 20:23 21:42 22:44 6:47 7:35 8:08 9:40 11:15 12:34 13:43 14:47 16:08 17:37 19:04 20:25 21:44 22:46 6:49 7:37 8:10 9:42 11:17 12:36 13:45 14:49 16:10 17:39 19:06 20:27 21:46 22:48 6:50 7:39 8:12 9:44 11:19 12:38 13:47 14:51 16:12 17:41 19:08 20:29 21:48 22:50 6:52 7:41 8:14 9:46 11:21 12:40 13:49 14:53 16:14 17:43 19:10 20:31 21:50 22:52 6:53 7:43 8:15 9:47 11:23 12:42 13:51 14:55 16:16 17:45 19:12 20:33 21:52 22:53";

  $("#process").click(function (argument) {
    var array = new Array();
    array = ($("#data").val().split($("#razd").val()));
    for(var key = 0; key < array.length; key++){
 
        console.log(array[key]);
      }
    
    
})
  function show_hex() {
    $(".overlay-view").css({
              top: event.pageY ,
                left: event.pageX,
                display: 'flex'
            });
  }

  function change_color(element, type) {
    var tag = element.attr('class').split(" ").join('.');
  /*.map( function() {
    return this.tagName;
  })
  .get()
  .join( ", " );*/
  //alert(tag);

    switch (type){
      case 0:
      $("<style type='text/css'>" + '.' + tag + '{ color:' + $("#color_code").val() + "}</style>").appendTo("head");
      break;
      case 1:
      $("<style type='text/css'>" + '.' + tag + '{ background:' + $("#color_code").val() + "}</style>").appendTo("head");
      break;
      case 2:
      element.css({
              color: $("#color_code").val()
              });
      break;
    }

  }

        //alert((e.pageX - posX) + ' , ' + (e.pageY - posY));
    //alert($(this).attr('class'));
  });

