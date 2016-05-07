var Init = "";

function swap() 
{
    var temp = document.getElementById("message").value;
    document.getElementById("message").value = document.getElementById("out").value;
    document.getElementById("out").value = null;
}

function clear_bottom()
{
    document.getElementById("out").value  = null;
}

function TestBit(type) 
{
	var  output = document.getElementById("out");
	output.value = "";
	var key = document.getElementById("key").value;
    var message = document.getElementById("message").value;	
	 
	if (type) 
	{
		output.value = Encrypt(message, key);
	}
	else
	{
		output.value = Decrypt(message, key);
    }
	
}

function Encrypt(mess, key_)
{
	var encrypted = [];
	encrypted.push(BinaryToLetter(Method(XOR(mess[0], Init),key_, true)));

	for (var i = 1; i < mess.length; i++) 
	{		
        encrypted.push(BinaryToLetter(Method(XOR(mess[i], encrypted[i - 1]),key_, true)));
    }

	return MassToString(encrypted);
}

function Decrypt(mess, key_) 
{
	var decrypted = [];
	decrypted.push(String.fromCharCode(XOR_2(parseInt(Method(mess[0], key_, false), 2), Init)));
    
    for (var i = 1; i < mess.length; i++)
    {        
        decrypted.push(String.fromCharCode(XOR_2(parseInt(Method(mess[i], key_, false), 2), mess[i - 1]))) ;
    }
	return MassToString(decrypted, true);
	
}

function count_key() 
{
    var count =  document.getElementById("key").value;

    document.getElementById("counter").innerHTML = count.length;
    Init =  RandomVector();
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


function RandomVector()
{
	return String.fromCharCode(Math.floor(Math.random() * 255));	
}

function XOR(a, b)
{	
	return (a.charCodeAt(0) ^ b.charCodeAt(0)) ;
}

function XOR_2(a, b)
{	
	return (a ^ b.charCodeAt(0)) ;
}

function Method (mess, key_, type)
{	
	var parts = [];
	var t_parts = [];

	if (type) mess = Complete(mess, true);	
	else mess = Complete(mess, false);

	for (var i = 0; i < mess.length / key_.length; i++)
	{
		parts[i] = [];
		t_parts[i] = [];

		for (var a = 0; a < key_.length; a++)
		{
			t_parts[i][a] = "";
			parts[i][a] = mess[a + i*key_.length];
		}
	}
	
	{
	for (var i = 0; i < parts.length; i++)
	{
		for (var a = 0; a < parts[i].length; a++)
			{
				if (type) t_parts[i][a] += parts[i][parseInt(key_[a],10)];
				else t_parts[i][a] += parts[i][key_.indexOf(a)];
			}				
	}	
	}


	return MassToString(t_parts, false);
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


function BinaryToLetter(binary)
{
	return String.fromCharCode(parseInt(binary, 2));
}

