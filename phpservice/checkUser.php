<?php

try {

	include("config.php");

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$email = $request->email;

	$query = "SELECT * from user where email = '$email'";
	$queryResult = $conn->query($query);

	if ($queryResult->num_rows > 0) {
		$row = mysqli_fetch_assoc($queryResult);
		if($row['verified'] == 'Y'){
			$result = array(
				"data" => "User found",
			    "status" => "Success"
			);
		}else{
			$result = array(
				"data" => "Please verify your email to continue...",
			    "status" => "Error"
			);			
		}		
	}
	else{
		$result = array(
		    "status" => "Error",
		    "message" => "User data not found"
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