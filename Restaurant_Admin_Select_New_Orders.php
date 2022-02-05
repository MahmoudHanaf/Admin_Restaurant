<?php

include("db_con.php");
 
$Data =array();
$Items =array();

$sql =mysqli_query($con,"SELECT user.user_name,user.user_photo,order_id,order_total,order_date ,user.user_email,user.user_phone,orders.order_note,orders.order_latitude,orders.order_longitude,orders.order_latitudeDelta,orders.order_longitudeDelta 
 FROM `orders`,`user` WHERE order_user_id=user.user_id
ORDER BY order_date DESC");

if(mysqli_num_rows($sql) >0){
   
 while($row =mysqli_fetch_object($sql)){
      $Data [] =$row ;

   
 }

 echo json_encode($Data);



}else{
    echo "Error";
}



?>

