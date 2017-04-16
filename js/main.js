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
	var kawaii_opacity = 0;
	$('.story').addClass('slideInUp', 'visible');
	$('.like').click(function(){		
		$(this).addClass('liked').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass('liked');
    });
		if (kawaii_opacity < 0.5) kawaii_opacity += 0.05;
		$(".kawaii").css({'opacity' : kawaii_opacity});
	});
	GetSavedCookies();
	/*$("#works").click(function(){
		$("#my-story2").addClass("bounceIn");
	})*/
	//$("head").append("<link rel='stylesheet' type='text/css' href='css/boilerplate.css'/><link href='css/portfolioStyle.css' rel='stylesheet' type='text/css'>");
	$(".lang").click(function(){
		$("#en, #ru").removeClass('lang_active');
		$(this).addClass('lang_active');
		$("#lang-style").remove();
		$("head").append("<style id='lang-style'>"  + ($(this).attr('id') == 'ru' ? 'en' : 'ru')  + "{display:none;}" + $(this).attr('id') + "{display:inherit;}</style>");
		SaveCookies($(this).attr('id'));
	});	
    var target = $('.topNav').position();

    $(window).scroll(function () {
        if ($(window).scrollTop() > target.top && $('.topNav').css("position") != "fixed" ) {
            $('.topNav').css({
                position: 'fixed',
                marginTop: '0 !important',
                top: 0
            });
            $('.top-btn').css({
                opacity: 1
            });
            $('.topNav').before("<div id='nav-fix' style='height:" +  $('.topNav').height() + "px'></div>");
        } else if ($(window).scrollTop() < target.top && $('.topNav').css("position") == "fixed" ) {
            $('.topNav').css({
                position: '',
                marginTop: '0px'
            });
            $('.top-btn').css({
                opacity: 0
            });
            $('#nav-fix').remove();
        };
    });

    $("#form").bind('submit', function (e) {
        e.preventDefault();
        var form_data = $(this).serialize();
        //console.log(form_data);
        if (preventSpam == 0) $.ajax({
            type: "POST",
            url: "http://mbdes.esy.es/mail.php",
            data: form_data,
            success: function(){
              var form_height = $("#form").outerHeight(true) + $(".btn").outerHeight(true);
              $("#form").replaceWith("<div class='form_completed zoomIn' style='height:" + form_height + "px'>  <div class='thank_holder'><img class='thank_you' src='img/round-done-button.png'></div><div class='thank_text'><ru>Спасибо!</ru><en>Thank you!</en></div></div>");
              preventSpam++;             
       		    //alert("mail - success");
    		},
            error: function (){
                var form_height = $("#form").outerHeight(true) + $(".btn").outerHeight(true);
                $("#form").replaceWith("<div class='form_completed zoomIn' style='height:" + form_height + "px'>  <div class='thank_holder'><img class='thank_you' src='img/cancel-button.png'></div><div class='thank_text'><ru>Что пошло не так....</ru><en>Ooops...</en></div></div>");
            }
        });
    });
});

