
		/*$(document).ready(function(){
			var touch = $('.hidebtn');
		    var menu = $('#nav');
			var btn = $('#search_slide');
		 
		    $(touch).on('click', function(e) {
		        e.preventDefault();
		        menu.slideToggle();
		    });*/
			
		    /*$(window).resize(function(){
		        var wid = $(window).width();
		        if(wid > 767 && menu.is(':hidden')) {
		            menu.removeAttr('style');
		        }
		    });
		});*/

	$(document).ready(function(){

		var target = $('.topNav').position();

    $(window).scroll(function(){
        if ($(window).scrollTop() > target.top){
            $('.topNav').css({position: 'fixed', marginTop: '0 !important', top: 0});
            //$('.topNav').addClass( "nav-deselected");
            $('.top-btn').css({opacity: 1});
        }
		else if ($(window).scrollTop() < target.top){
            $('.topNav').css({position: '', marginTop: '0px'});
            //$('.topNav').removeClass( "nav-deselected");
            $('.top-btn').css({opacity: 0});};
    });
});


$(document).ready(function() {
	

	$("#form").bind('submit', function() {
		//устанавливаем событие отправки для формы с id=form
		var form_data = $(this).serialize(); //собераем все данные из формы
		$.ajax({
			type: "POST", //Метод отправки
			url: "mail.php", //путь до php фаила отправителя
			data: form_data
			});
	});
	
});