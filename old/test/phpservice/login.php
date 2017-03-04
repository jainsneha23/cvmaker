<?php
try {
	include("config.php");

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$email = $request->email;
	$password = $request->password;

	$query = "SELECT * from user where email = '$email'";
	$queryResult = $conn->query($query);

	if ($queryResult->num_rows > 0) {
		$row = mysqli_fetch_assoc($queryResult);
		if($row['verified'] != 'Y'){
			 $result = array(
		    	"message" => "Please verify your email to continue...",
		        "status" => "Error"
			);
		}
		else if(password_verify($password, $row['password'])){
		    $result = array(
		    	"message" => "Login Success",
		        "status" => "Success"
			);
			session_start();
			$_SESSION['username'] = $email;
		}else{
			$result = array(
		    	"message" => "Wrong Password. Please try again.",
		        "status" => "Error"
			);
		}
	}else{
		$result = array(
		    "status" => "Error",
		    "message" => "User not found. Please try again."
		);
	}

} catch (Exception $e) {
	$result = array(
	        "status" => "Error",
	        "message" => $e->getMessage()
		);
}
echo json_encode($result);
?>