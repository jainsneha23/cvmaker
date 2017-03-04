<?php
session_start();
if(isset($_SESSION['username'])){
	$result = array(
        "status" => "Success",
        "message" => "User ".$_SESSION['username']." logged In",
        "user" => $_SESSION['username']
	);
}else{
	$result = array(
		"message" => "Logout Failed.",
	    "status" => "Error"
	);
}
echo json_encode($result)
?>