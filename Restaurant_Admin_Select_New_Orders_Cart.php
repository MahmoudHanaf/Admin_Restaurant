<?php

include("db_con.php");

$Items =array();



$json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $order_id= $obj['order_id'];
// $order_id=1;
  

$sql =mysqli_query($con,"SELECT kinds.kind_name,cart_count,cart_price,orders.order_id,user.user_photo 
FROM `user`,`orders`,`cart`,`kinds` WHERE order_id='$order_id' AND cart.order_cart_id='$order_id' AND
cart.kind_cart_id=kinds.kind_id AND
order_user_id=user.user_id");

if(mysqli_num_rows($sql) >0){
   
 while($row =mysqli_fetch_object($sql)){
    $Items [ ]= $row ;

 }
    
 echo json_encode($Items);
    

}else{
    echo "Error";
}



?>

