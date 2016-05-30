jQuery(document).ready(function () {
  jQuery('#vmap').vectorMap({
    map: 'russia_ru',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: '#85177F',
    hoverOpacity: 0.7,
    borderWidth: 2,
    borderOpacity: 1,
    borderColor: 'white',
    selectedColor: 'rgba(133, 23, 127, 0.35)',
    enableZoom: true,
    showTooltip: true,
    scaleColors: ['#C8EEFF', '#006491'],
    normalizeFunction: 'polynomial',
    onRegionClick: onRegionClickCallBack
  });
});


function onRegionClickCallBack(element, code, region)
{
  var doo = document.getElementById("doo"),
  obr = document.getElementById("obr"),
  poo = document.getElementById("poo"),
  odo = document.getElementById("odo");

  if (code == 'ma')  var plus = 128;
  else var plus = 0;
  
  doo.children[0].innerHTML = 2589 + plus;
  obr.children[0].innerHTML = 657 + plus;
  poo.children[0].innerHTML = 236 + plus;
  odo.children[0].innerHTML = 745 + plus;    
}
