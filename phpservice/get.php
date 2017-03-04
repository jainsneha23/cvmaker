<?php

try {

	include("config.php");

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$email = $request->email;
	$isDownload = $request->isDownload;

	session_start();
	if(!isset($_SESSION['username']) &&  $isDownload == false){
		$result = array(
	        "status" => "Error",
	        "message" => "User not logged In"
		);
		echo json_encode($result);
		return;
	}
	$query = "SELECT * from datatable where email = '$email'";
	$queryResult = $conn->query($query);

	if ($queryResult->num_rows > 0) {
		$row = mysqli_fetch_assoc($queryResult);
	    $result = array(
	    	"data" => $row['data'],
	        "status" => "Success"
		);
	} else {
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