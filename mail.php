<?php
if($_POST['name']&&$_POST['message']&&$_POST['email'] != ""){
    $to = "ak@moreblood.xyz"; //Почта получателя
    $subject = 'Обратная связь' ;
    $message = '
                        Имя: '.$_POST['name'].'
                        E-mail: '.$_POST['email'].' 
                        Сообщение: '.$_POST['message'].'
                        Дата: '.date("Y-m-d (H:i:s)",time()).'
                        IP-адрес: '.$_SERVER['REMOTE_ADDR'].'                        
                   
                ';    
    mail($to, $subject, $message,"From: feedback@" . $_SERVER['HTTP_HOST'] ); 
}
?>