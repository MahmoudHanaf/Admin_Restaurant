<?php

include("db_con.php");

$json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $kind_name= $obj['kind_name'];
  $kind_photo= 'https://o.remove.bg/downloads/897d9048-8580-4b58-ae30-2a523e2a5113/0c13365ebb347f9ab1d036ce02962a35-removebg-preview.png' ;
  $kind_details= $obj['kind_details'];
  $kind_small= $obj['kind_small'];
  $kind_middle= $obj['kind_middle'];
  $kind_large= $obj['kind_large'];
  $kind_content= $obj['kind_content'];
  $categoris_kind_id= $obj['categoris_kind_id'];
  $kind_id= $obj['kind_id'];


  if($kind_name && $kind_photo && $kind_details && $kind_small && $kind_middle && $kind_large && $kind_content && $categoris_kind_id){

    $sql =mysqli_query($con,"UPDATE `kinds` SET `kind_name`='$kind_name',`kind_photo`='$kind_photo',`kind_details`='$kind_details',
    `kind_small`='$kind_small',`kind_middle`='$kind_middle',`kind_large`='$kind_large',`kind_content`='$kind_content',`categoris_kind_id`='$categoris_kind_id' WHERE kind_id='$kind_id'");

        if(mysqli_affected_rows($con) >0){
           echo "Sucess";
        }else{
            echo  "Eroor";

        }

  }else{
      echo "Eroor";
  }



?>