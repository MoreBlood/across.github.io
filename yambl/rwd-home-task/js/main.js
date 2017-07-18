"use strict";
var imageCount = 13;
var text = "Sportsman do offending supported extremity breakfast by listening. Decisively advantages nor expression unpleasing she led met. Estate was tended ten boy nearer seemed. As so seeing latter he should thirty whence. Steepest speaking up attended it as. Made neat an on be gave show snug tore. Resources exquisite set arranging moonlight sex him household had. Months had too ham cousin remove far spirit. She procuring the why performed continual improving. Civil songs so large shade in cause. Lady an mr here must neat sold. Children greatest ye extended delicate of. No elderly passage earnest as in removed winding or. Boy desirous families prepared gay reserved add ecstatic say. Replied joy age visitor nothing cottage. Mrs door paid led loud sure easy read. Hastily at perhaps as neither or ye fertile tedious visitor. Use fine bed none call busy dull when. Quiet ought match my right by table means. Principles up do in me favourable affronting. Twenty mother denied effect we to do on. Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished out law. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an. Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. Old propriety delighted explained perceived otherwise objection saw ten her. Doubt merit sir the right these alone keeps. By sometimes intention smallness he northward. Consisted we otherwise arranging commanded discovery it explained. Does cold even song like two yet been. Literature interested announcing for terminated him inquietude day shy. Himself he fertile chicken perhaps waiting if highest no it. Continued promotion has consulted fat improving not way. Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me. Up mr ignorant produced distance although is sociable blessing. Ham whom call all lain like. Ought these are balls place mrs their times add she. Taken no great widow spoke of it small. Genius use except son esteem merely her limits. Sons park by do make on. It do oh cottage offered cottage in written. Especially of dissimilar up attachment themselves by interested boisterous. Linen mrs seems men table. Jennings dashwood to quitting marriage bachelor in. On as conviction in of appearance apartments boisterous. Yourself off its pleasant ecstatic now law. Ye their mirth seems of songs. Prospect out bed contempt separate. Her inquietude our shy yet sentiments collecting. Cottage fat beloved himself arrived old. Grave widow hours among him no you led. Power had these met least nor young. Yet match drift wrong his our. To sure calm much most long me mean. Able rent long in do we. Uncommonly no it announcing melancholy an in. Mirth learn it he given. Secure shy favour length all twenty denote. He felicity no an at packages answered opinions juvenile. Up branch to easily missed by do. Admiration considered acceptance too led one melancholy expression. Are will took form the nor true. Winding enjoyed minuter her letters evident use eat colonel. He attacks observe mr cottage inquiry am examine gravity. Are dear but near left was. Year kept on over so as this of. She steepest doubtful betrayed formerly him. Active one called uneasy our seeing see cousin tastes its. Ye am it formed indeed agreed relied piqued. ";

$('.title').html(getPartOfTheText(text, 0, 3));
$('.sub-title').html(capitalizeFirstLetter(getPartOfTheText(text, 20, 55)));

var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";

for (var i = 0; i < imageCount;) {
    i++;

    var prefix = "";
    // превью для ретины без префикса
    if (!matchMedia(query).matches) {
         prefix = '_prw';
    }

    var url = "'.\/img\/" + i + prefix + ".jpg'";
    var _class = "";
    var textPart = capitalizeFirstLetter(getPartOfTheText(text, (i - 1) * 15, 15 * i));

    if (i % 4 === 0) _class = "fourth";
    if (i % 7 === 1) _class = "first";
    //language=HTML
    $('.gallery').append(
        '<div class="image-wrapper ' + _class + '" id=' + i + '>' +
        '<div class="image-container" style="background-image: url(' + url + ')">' +
        '<div class="image-description holder">' +
        '<div class="image-description text">' +
        '<div class="text-holder">' + textPart + '</div>' +
        '</div>' +
        '<div class="image-description blur" style="background-image: url(' + url + ')"></div>' +
        '</div></div></div>'
    );
}

var counter = 0;

$('.image-container').each(function() {
    setContainerBasis($(this));
});

$('.image-wrapper').on('click', function () {
    var prefix = "";

    //превью для ретины с префиксом
    if (matchMedia(query).matches) {
        prefix = "_high";
    }

    var url = ".\/img\/" + $(this).attr('id') + prefix + ".jpg";
    $('.show-off').css({
        'background-image': 'url(' + url + ')',
        'visibility': 'visible'
    });
    $('.content').css({'filter': 'blur(10px)'});
    $('html').css({'overflow': 'hidden'});
});

$('.show-off').on('click', function () {
    $('.show-off').css({'visibility': 'hidden'});
    $('.content').css({'filter': ''});
    $('html').css({'overflow': ''});
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPartOfTheText(text, start, stop) {
    return text.split(/\s+/).slice(start, stop).join(" ");
}

function setContainerBasis(image) {
    var time = 50;
    var actualImage = new Image();
    actualImage.src = image.css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");

    actualImage.onload = function () {
        image.parent().css({
            'flex-basis': (image.height() / this.height) * this.width + 'px'
        });
            setTimeout(fadeIn, time + counter * time, image);
        counter++;
    };
}

var fadeIn = function (elem) {
    elem.parent().css({'opacity': '1'})
};