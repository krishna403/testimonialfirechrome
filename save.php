<?php
$count=0;
//session_start();
foreach(array('video', 'audio') as $type) {
    
    if (isset($_FILES["${type}-blob"])) {
    
        echo 'uploads/';
        
	$fileName = $_POST["${type}-filename"];
        $uploadDirectory = 'uploads/'.$fileName;
        
        if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory)) {
            echo(" problem moving uploaded file");
        }
		echo($fileName);
    }
 }
 
?>