<?php
// Muaz Khan     - www.MuazKhan.com 
// MIT License   - https://www.webrtc-experiment.com/licence/
// Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC
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
 /*
$u_agent = $_SERVER['HTTP_USER_AGENT'];
$ub = '';
if(preg_match('/MSIE/i',$u_agent)){
  $ub = "ie";}
elseif(preg_match('/Firefox/i',$u_agent)){
  $ub = "mozilla";}
elseif(preg_match('/Chrome/i',$u_agent)){
   $ub = "chrome";}
 
   
 if($ub=='chrome'){  
 if(!empty($_POST["video-filename"])){
     
     $revitem= strrev($_POST["video-filename"]);
  //   $char=substr( $str, 0, 4 );
     $cropeditem= substr($revitem,4);
     $file=  trim(strrev($cropeditem));
     
     
   if(file_exists('uploads/'.$file.'webm') && file_exists('uploads/'.$file.'wav')){
     
     $audioFile='uploads/'.$file.'wav';
     $videoFile='uploads/'.$file.'webm';
                    
      $mergedFile = 'uploads/'.$file.'webm-merged';
      
      echo "Starting ffmpeg...\n\n";
     $merge= "-i $audioFile -i $videoFile 0:0 -map 1:0 $mergedFile"; 
	exec('ffmpeg '.$merge.' 2>&1', $out, $ret);
	echo "Done.\n";
   
     
     
     var_dump($merge);
   //  exec('ffmpeg '.$merge.' 2>&1', $out, $ret);
        // file_put_contents($mergedFile);
        
      //  if (!move_uploaded_file($mergedFile,'uploads/')) {
      //      echo(" problem moving uploaded file");
      //  }
       // session_unset();
   }
 }
 }  
*/
?>