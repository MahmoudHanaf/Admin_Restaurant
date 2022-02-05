<?php

include("db_con.php");

$json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $kind_id= $obj['kind_id'];


  if($kind_id){

    $sql =mysqli_query($con,"DELETE FROM `kinds` WHERE kind_id='$kind_id'");

        if(mysqli_affected_rows($con) >0){
           echo "Sucess";
        }else{
            echo  "Eroor";

        }

  }else{
      echo "Eroor";
  }



?>