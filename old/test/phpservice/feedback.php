<?php

try {

	include("config.php");

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$username = $request->username;
	$email = $request->email;
	$message = $request->message;

	$query = "INSERT into feedback (username,email,message) values ('$username','$email','$message')";

	if ($conn->query($query) === TRUE) {
	    $result = array(
	        "status" => "Success",
	        "message" => "Thanks for writing to Us."
		);
	} else {
		$result = array(
	        "status" => "Error",
	        "message" => $conn->error
		);
	}

	echo json_encode($result);

} catch (Exception $e) {
	$result = array(
	        "status" => "Error",
	        "message" => $e->getMessage()
		);
    echo json_encode($result);
}


?>