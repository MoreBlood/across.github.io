function Ferma() 
{
	var start = parseInt(document.getElementById("start").value, 10),
	output = document.getElementById("out");
	
	var breaked = new Array();	
	Array.prototype.push.apply(breaked, Method(start));	

	while (true)
	{
		var temp = new Array();
		for (var i = 0; i < breaked.length; i ++)
		{			
			Array.prototype.push.apply(temp,Method(breaked[i]));					
		}

		if (arraysEqual(breaked, temp)) break;
		else breaked = temp;
	}
	output.value = MassToString(breaked.sort(compareNumbers), true);	
}

function Method(what_to_break) {

	var x, y;
	var breakable = new Array();
	if ((Math.pow(x = Math.round(Math.sqrt(what_to_break)), 2) - what_to_break) < 0) x++;

	for (var i = 0; i < what_to_break; i++)
	{
		var temp = Math.pow((x + i), 2) - what_to_break;
		if (   Math.sqrt(temp) % 1 == 0 )
		{		
			y = Math.sqrt(temp);
			if ((x + i - y) != 1) breakable.push(x + i - y);
			if ((x + i + y) != 1) breakable.push(x + i + y);
			break;
		} 
	}
	return breakable;
}

function arraysEqual(a, b) 
{
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) 
  {
  	if (a[i] !== b[i]) return false;
  }
  return true;
}

function compareNumbers(a, b) 
{
  return a - b;
}

function MassToString(mass, type)
{
	var str = "",
	razd = document.getElementById("razd").value;
	
	for (var i = 0; i < mass.length; i++)
	{
		if (type) str += mass[i] + razd;
		else
		{
			for (var a = 0; a < mass[i].length; a++)
			{
				str += mass[i][a] + razd;
			}
		}
	}
	
	return str.substring(0, str.length - razd.length);
}
function clear_bottom()
{
    document.getElementById("out").value  = null;
}