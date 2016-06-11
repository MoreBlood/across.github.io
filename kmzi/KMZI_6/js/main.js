function Encode(message, text)
{
	var message_b = MassToString(AllMesToBinary(document.getElementById("text").value + "|"));	
	var text = document.getElementById("out").value ;
	output = "";
	for (var i = 0, o = 0; i < text.length; i++, o++)
	{
		if (o >= message_b.length) insert = 0;
		else insert = message_b[o];
		if (text[i] != " ") output += "<span style='color:#" + "00000" + insert + ";'>" + text[i] + '</span>';
		else
		{
			output += " ";
			o--;		
		} 
	}
	$("#text_layer").append(output);

}

function Decode(message, text)
{
	text = document.getElementById("text_layer");
	var text_length =  $("#text_layer span").length;

	binary = "";
	for (var i = 0; i < text_length; i++)
	{
		binary += (rgb2hex(text.children[i].style.color))[5]; 
	}

	message = BinaryStrToString(binary);
	for (var i = 0; i < message.length; i++)
    {
      if (message[i] == "|")
      {
        index_stop = i;
        break;
      }       
    }
	alert(message.substring(0,index_stop));

}

function Complete(dex, type)
{ 
  var lenb = 0;
  if (type) temp = dex.toString(2);
  else temp = dex.charCodeAt(0).toString(2);

  if (temp.length > 8) lenb = 16; else lenb = 8;

  for (;temp.length < lenb;) temp = "0" + temp;
  return temp;
}

function AllMesToBinary(message)
{
  var binary = [];

  for (var i = 0; i < message.length; i++)
  {
    binary.push(Complete(message[i]));
  }

  return binary;
}


function MassToString(mass, type)
{
  var str = "";
  
  for (var i = 0; i < mass.length; i++)
  {
    if (type) str += mass[i];
    else
    {
      for (var a = 0; a < mass[i].length; a++)
      {
        str += mass[i][a];
      }
    }
  }
  
  return str;
}

function AllBinaryMessToStr(message)
{
  var str = "";

  for (var i = 0; i < message.length; i++)
  {
    str += BinaryToLetter(message[i]);
  }

  return str;
}

function BinaryToLetter(binary)
{
  return String.fromCharCode(parseInt(binary, 2));
}

function BinaryStrToString(binary)
{
  var str = "";

  for (var i = 0; i < binary.length; i+=8)
  {   
    str += BinaryToLetter(binary.substring(i, i+8));
  }

  return str;
}


var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

function rgb2hex(rgb) 
{
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) 
{
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
