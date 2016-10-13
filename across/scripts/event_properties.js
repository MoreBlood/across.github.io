ymaps.ready(init);
var myMap;

function init () {
    myMap = new ymaps.Map("map", {
        center: [52.09859696487728, 23.712100982666016], // Углич
        zoom: 11
    }, {
        balloonMaxWidth: 350,
        searchControlProvider: 'yandex#search'
    });

    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'Координаты скопированы &nbsp;&nbsp;&nbsp;&nbsp;' ,
                contentBody: coords[0].toPrecision(10) + ","  +  coords[1].toPrecision(10) /*'<br>' + '<input id="coordinates" type="text" value = '  +  coords[0].toPrecision(10) + ","  +  coords[1].toPrecision(10) + ">" +
                '<button id="btn" onclick="copyText()">copy</button>'*/
            });
            var coordinate_pressed = coords[0].toPrecision(10) + ","  +  coords[1].toPrecision(10);
            copyText(coordinate_pressed);
        }
        else {
            myMap.balloon.close();
        }

    });

}
console.clear();
function copyText(kek){
    function selectElementText(element) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(element);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }
    var element = document.createElement('DIV');
    element.textContent = kek;
    document.body.appendChild(element);
    selectElementText(element);
    document.execCommand('copy');
    element.remove();
}

