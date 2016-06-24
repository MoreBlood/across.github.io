$(document).ready(function () {

    var target = $('.topNav').position();

    $(window).scroll(function () {
        if ($(window).scrollTop() > target.top) {
            $('.topNav').css({
                position: 'fixed',
                marginTop: '0 !important',
                top: 0
            });
            $('.top-btn').css({
                opacity: 1
            });
        } else if ($(window).scrollTop() < target.top) {
            $('.topNav').css({
                position: '',
                marginTop: '0px'
            });
            $('.top-btn').css({
                opacity: 0
            });
        };
    });

    $("#form").bind('submit', function () {

        var form_data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: form_data
        });
    });
});