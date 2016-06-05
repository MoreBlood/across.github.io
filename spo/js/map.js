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

function StartNumbers() {
  var id0 = 0, id1 = 0, id2 = 0, id3 = 0;
  for(var index in country){
    id0 += parseInt(country[index].doo,10);
    id1 += parseInt(country[index].obr,10);
    id2 += parseInt(country[index].poo,10);
    id3 += parseInt(country[index].odo,10);
  }
  $('#doo').find("span").animateNumber({ number: id0 });
  $('#obr').find("span").animateNumber({ number: id1 });
  $('#poo').find("span").animateNumber({ number: id2 });
  $('#odo').find("span").animateNumber({ number: id3 });

}

function onRegionClickCallBack(element, code, region)
{
  for(var index in country){
    if (region == country[index].name ){
      $('#doo').find("span").animateNumber({ number: country[index].doo  },'fast');
      $('#obr').find("span").animateNumber({ number: country[index].obr },'fast');
      $('#poo').find("span").animateNumber({ number: country[index].poo },'fast');
      $('#odo').find("span").animateNumber({ number: country[index].odo },'fast');
      break;

    }
  }
  

}
