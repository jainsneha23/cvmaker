<?php

try {

    include("config.php");
    require_once('PHPMailer.php');
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $user_email = trim($request -> email);
    $user_password = $request -> password;


    // check if we have a constant HASH_COST_FACTOR defined (in config/hashing.php),
    // if so: put the value into $hash_cost_factor, if not, make $hash_cost_factor = null
    $hash_cost_factor = (defined('HASH_COST_FACTOR') ? HASH_COST_FACTOR : null);

    // crypt the user's password with the PHP 5.5's password_hash() function, results in a 60 character hash string
    // the PASSWORD_DEFAULT constant is defined by the PHP 5.5, or if you are using PHP 5.3/5.4, by the password hashing
    // compatibility library. the third parameter looks a little bit shitty, but that's how those PHP 5.5 functions
    // want the parameter: as an array with, currently only used with 'cost' => XX.
    $user_password_hash = password_hash($user_password, PASSWORD_DEFAULT, array('cost' => $hash_cost_factor));
                    // generate random hash for email verification (40 char string)
    $user_activation_hash = sha1(uniqid(mt_rand(), true));

    $query = "INSERT INTO user VALUES('$user_email', '$user_password_hash', 'N' ,'$user_activation_hash', now())";
    $queryResult = $conn->query($query);

    if ($queryResult == TRUE) {
        // send a verification email
        $result = sendVerificationEmail($user_email, $user_activation_hash);
        if ($result['status'] == "Error") {
            $query = "DELETE FROM user WHERE email='$user_email'";
            $queryResult = $conn->query($query);
        }
    } else {
        $result = array(
            "message" => "Registration Error",
            "status" => "Error"
            );
    }
} catch (Exception $e) {
    $result = array(
            "status" => "Error",
            "message" => $e->getMessage()
        );
}
echo json_encode($result);

    /*
     * sends an email to the provided email address
     * @return boolean gives back true if mail has been sent, gives back false if no mail could been sent
     */
function sendVerificationEmail($user_email, $user_activation_hash)
{
    try{

        $mail = new PHPMailer(); // create a new object
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = EMAIL_SMTP_AUTH; // authentication enabled
        $mail->SMTPSecure = EMAIL_SMTP_ENCRYPTION;
        $mail->Host = EMAIL_SMTP_HOST;
        $mail->Username = EMAIL_SMTP_USERNAME;
        $mail->Password = EMAIL_SMTP_PASSWORD;
        $mail->Port = EMAIL_SMTP_PORT;

        $mail->IsHTML(true);
        $mail->From = EMAIL_VERIFICATION_FROM;
        $mail->FromName = EMAIL_VERIFICATION_FROM_NAME;
        $mail->Subject = EMAIL_VERIFICATION_SUBJECT;

        $mail->AddAddress($user_email);

        // the link to your register.php, please set this value in config/email_verification.php
        $body = EMAIL_VERIFICATION_CONTENT.'<br><a href="'.EMAIL_VERIFICATION_URL.'?email='.urlencode($user_email).'&verification_code='.urlencode($user_activation_hash).'">Verify account</a>';

        $mail->Body = $body;

        if(!$mail->Send()){
            $result = array(
            "message" => "MESSAGE_VERIFICATION_MAIL_NOT_SENT: " . $mail->ErrorInfo,
            "status" => "Error"
            );
            
        }
        else{
            $result = array(
            "message" => "MESSAGE_VERIFICATION_MAIL_SENT",
            "status" => "Success"
            );
        }
    } catch (Exception $e) {
        $result = array(
            "status" => "Error",
            "message" => $e->getMessage()
        );
    }
    return $result;
}
