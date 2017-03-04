<?php
define("DB_HOST", "127.0.0.1");
define("DB_NAME", "cvmakerc_cvbuilder");
define("DB_USER", "cvmakerc_admin");
define("DB_PASS", "Jain@5246");
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

define("COOKIE_RUNTIME", 1209600);
define("COOKIE_DOMAIN", ".127.0.0.1");
define("COOKIE_SECRET_KEY", "1gp@TMPS{+$78sfpMJFe-92s");

define("EMAIL_USE_SMTP", true);
define("EMAIL_SMTP_HOST", "customers.freehosting.com");
define("EMAIL_SMTP_AUTH", true);
define("EMAIL_SMTP_USERNAME", "cvmakerc");
define("EMAIL_SMTP_PASSWORD", "Jain@5246");
define("EMAIL_SMTP_PORT", 465);
define("EMAIL_SMTP_ENCRYPTION", "ssl");

define("EMAIL_PASSWORDRESET_URL", "cvmaker.co.in/password_reset.php");
define("EMAIL_PASSWORDRESET_FROM", "cvmakerc@cvmaker.co.in");
define("EMAIL_PASSWORDRESET_FROM_NAME", "Instant CV Maker");
define("EMAIL_PASSWORDRESET_SUBJECT", "Password reset for Instant CV Maker");
define("EMAIL_PASSWORDRESET_CONTENT", "Please click on this link to reset your password:");

define("EMAIL_VERIFICATION_URL", "cvmaker.co.in/phpservice/verify.php");
define("EMAIL_VERIFICATION_FROM", "support@cvmaker.co.in");
define("EMAIL_VERIFICATION_FROM_NAME", "Instant CV Maker");
define("EMAIL_VERIFICATION_SUBJECT", "Account activation for Instant CV Maker");
define("EMAIL_VERIFICATION_CONTENT", "Thank you for registering in Instant CV Maker. Please click on this link to activate your account:");

define("HASH_COST_FACTOR", "10");

?>