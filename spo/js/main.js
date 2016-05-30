
	
		$(document).ready(function(){
			var touch = $('.hidebtn');
		    var menu = $('#nav');
		 
		    $(touch).on('click', function(e) {
		        e.preventDefault();
		        menu.slideToggle();
		    });
		    $(window).resize(function(){
		        var wid = $(window).width();
		        if(wid > 767 && menu.is(':hidden')) {
		            menu.removeAttr('style');
		        }
		    });
		});
	$(document).ready(function(){
    $(window).scroll(function(){
        if ($(window).scrollTop() > 310){
            $('.leftside').stop().animate({"opacity":"1"},1000)
        }
		else if ($(window).scrollTop() < 310){
            $('.leftside').stop().animate({"opacity":"0"},1000)
        }
    });
});

var table;
//Фильтрация 
$(document).ready(function() {
        
        $('#scroll_stats').filterTable(
        {
        	filterExpression: 'filterTableFindAny',
        	inputSelector: '#search_data'
        });
        /*
        table = $("#scroll_stats").tablesorter({
        	cancelSelection: false,
        	sortList:[[0,0]],
        	//headers: { 0: { sorter: false} }
        	
        }); */

});

function RevertSort()
{
	/*
			var sorting = [[0,0]];
			$("#scroll_stats").trigger("sorton",[sorting]);		
	*/

}