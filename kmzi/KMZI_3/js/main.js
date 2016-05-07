
function Generate()
{	
	var multipl = parseInt(document.getElementById("multipl").value, 10),
	priras = parseInt(document.getElementById("priras").value, 10),
	count = parseInt(document.getElementById("count").value, 10),
    start = parseInt(document.getElementById("start").value, 10),
    razd = document.getElementById("razd").value,
    output = document.getElementById("out");
	output_val = start + razd;

	for (var i = 0; i < count - 1; i++)
	{
		var temp = (multipl * start + priras);		
		start = temp  % count;
		output_val += start + razd;
	}
	output.value = output_val.substring(0, output_val.length - 2)
}

function clear_bottom()
{
    document.getElementById("out").value  = null;
}
