<?php

require_once('config.php');

if (isset($_GET["email"]) && isset($_GET["verification_code"])) {
    $email = $_GET["email"];
    $hash = $_GET["verification_code"];
    $query = "UPDATE user SET verified = 'Y', url = 'NULL' WHERE email = '$email' AND url = '$hash'";
        $queryResult = $conn->query($query);
        if ($conn -> affected_rows > 0){
        	echo 'Verification Successful';
        	header("Location: /index.html?email=$email&message=Email Verified. Please login to continue..");
        }
        else echo 'Verification Failed. Please try again';
}

?>
