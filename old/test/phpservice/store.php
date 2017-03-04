<?php

try {

	include("config.php");

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$email = $request->email;
	$data = $request->data;

	if(isset($request->timestamp)){
		$timestamp = $request->timestamp;
	}

	if($email == null){
		$result = array(
	        "status" => "Error",
	        "message" => "Email is required"
		);
		echo json_encode($result);
	}

	session_start();
	if(!isset($_SESSION["username"]) && !isset($timestamp)){
		throw new Exception("Please donot try to hack :P");
	}

	if(isset($_SESSION["username"])){
		$query = "SELECT * from datatable where email = '$email'";
		$queryResult = $conn->query($query);

		if ($queryResult->num_rows > 0) {
			$query = "UPDATE datatable SET data = '$data' WHERE email = '$email'";
		} else {
		    $query = "INSERT into datatable (email,data) values ('$email','$data')";
		}
	}
	else if(isset($timestamp)){
		$newemail = $email.$timestamp;
		$query = "INSERT into datatable (email,data) values ('$newemail','$data')";

	}else{
		throw new Exception("Please donot try to hack :P");
	}

	if ($conn->query($query) === TRUE) {
	    $result = array(
	        "status" => "Success",
	        "message" => "Record added successfully"
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