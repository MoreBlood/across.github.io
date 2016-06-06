var text_targ;
var freq = 3;
var byte_shift = 56;

function readSingleFile(e)
{
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  else  
  var reader = new FileReader();
  var reader_text = new FileReader();
  e_text = e;
  var file_text = file;

  reader.onloadend = function(e) 
  {
    var contents = e.target.result;    
  };
  reader.readAsDataURL(file);

  reader_text.onloadend = function(e_text) 
  {
    console.warn("Ready!")
    text_targ = e_text.target.result;
  };  
  reader_text.readAsBinaryString(file_text);
}

function Show()
{  
  $('#save_btn').remove();  
  $('#image_layer').children().remove();
  displayContents(text_targ);
  $('#label_open').after(' <a id="save_btn" class="btn btn-info btn-file" href="data:image/bmp;base64,' 
  + btoa(AllBinaryMessToStr(Stenography(AllMesToBinary(text_targ)))) +'" download="encoded.bmp">Сохранить</a>');
}

function ShowUndecoded()
{  
  
  $('#image_layer').children().remove();
  $('#save_btn').remove();
  DeStenography(text_targ);

}

function displayContents(contents) 
{  
  var morphedImage = AllBinaryMessToStr(Stenography(AllMesToBinary(contents)));
  FileFromArr(morphedImage);
  var element = document.getElementById('file-content');
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);


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

function BinaryToLetter(binary)
{
  return String.fromCharCode(parseInt(binary, 2));
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

function Stenography(binary_image)
{
   var message = document.getElementById("out").value + "|";
   var mess_binary = MassToString(AllMesToBinary(message));

   for (var i = 0; i < mess_binary.length;  i++)
   {
      var temp = binary_image[i+byte_shift].substring(0,7) + mess_binary[i];
      binary_image[i+byte_shift] = temp;

   }
   return binary_image;
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

function DeStenography(binary_image)
{
   binary_image = AllMesToBinary(binary_image);
   var message = "";
 
   for (var i = 0; i < binary_image.length - byte_shift; i++)
   {
      message += binary_image[i+byte_shift][7];
   }   
   var index_stop = 0;
   var message_conv = BinaryStrToString(message);

   for (var i = 0; i < message_conv.length; i++)
   {
      if (message_conv[i] == "|")
      {
        index_stop = i;
        break;
      } 
      
   }
   $('#image_layer').append('<p class="bg-primary">' + message_conv.substring(0,index_stop)+ '</p>');
   return message;
}

function show_image(src, width, height, alt) 
{
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;
  document.body.appendChild(img);
}

function FileFromArr(message)
{
  var img = document.createElement("img");
  img.width = 400;
  img.height = 400;
  img.src = "data:image/bmp;base64," + btoa(message);
  $('#image_layer').append(img);

}
