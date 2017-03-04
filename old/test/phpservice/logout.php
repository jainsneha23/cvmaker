<?php
session_start();
session_unset();
if(session_destroy())
{
	$result = array(
		    	"message" => "Logout Successful.",
		        "status" => "Success"
			);
}else{
	$result = array(
		    	"message" => "Logout Failed.",
		        "status" => "Error"
			);
}
echo json_encode($result)
?>