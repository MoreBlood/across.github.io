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
  $("#ok_hex").click(function (argument) {
    change_color(element_to_change, type);
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

