<?php

include("db_con.php");

$json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $kind_name= $obj['kind_name'];
  $kind_photo= $obj['kind_photo'] ;
  $kind_details= $obj['kind_details'];
  $kind_small= $obj['kind_small'];
  $kind_middle= $obj['kind_middle'];
  $kind_large= $obj['kind_large'];
  $kind_content= $obj['kind_content'];
  $categoris_kind_id= $obj['categoris_kind_id'];

  if($kind_name && $kind_photo && $kind_details && $kind_small && $kind_middle && $kind_large && $kind_content && $categoris_kind_id){


    $select_Items=mysqli_query($con,"SELECT * FROM `kinds` WHERE kind_name='$kind_name' AND categoris_kind_id='$categoris_kind_id'");

     if(mysqli_num_rows($select_Items) >0){
      echo "This Meal is excited already ";
     
     }else{
      $sql =mysqli_query($con,"INSERT INTO `kinds`(`kind_name`, `kind_photo`, `kind_details`, `kind_small`, `kind_middle`, `kind_large`, `kind_content`, `categoris_kind_id`) VALUES 
      ('$kind_name','$kind_photo','$kind_details','$kind_small','$kind_middle','$kind_large','$kind_content','$categoris_kind_id')");
  
          if(mysqli_affected_rows($con) >0){
             $kind_id=mysqli_insert_id($con);
             echo json_encode($kind_id);
          }else{
              echo  "Eroor";
  
          }
      
     }


   


  }else{
      echo "Eroor";
  }



?>