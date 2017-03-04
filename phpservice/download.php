<?php  

try{

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$url = $request->url;
	$timestamp = $request->timestamp;
	$apikey = '8fce77d0-d5d9-4086-92ee-860bb17a9e62';
	$file = "resume.pdf";

	session_start();
	if(!isset($_SESSION['username']) && !isset($timestamp)){
		$result = array(
	        "status" => "Error",
	        "message" => "Please donot try to HACK :P"
		);
		echo json_encode($result);
		return;
	}

	if($timestamp){
		$url = $url . '&timestamp='.$timestamp;
	}

	//var  downloadurl = CVM.Config.apis.pdfRocket.url+'?value='+url+'&filename='+CVM.Config.apis.pdfRocket.downloadFile+'&apikey='+CVM.Config.apis.pdfRocket.apikey;
	$result = file_get_contents("http://api.html2pdfrocket.com/pdf?apikey=" . urlencode($apikey) . "&value=" . urlencode($url));
	//file_put_contents($file,$result);

	header('Content-Description: File Transfer');
	header('Content-Type: application/pdf');
	header('Expires: 0');
	header('Cache-Control: must-revalidate');
	header('Pragma: public');
	header('Content-Length: ' . strlen($result));	 
	// Make the file a downloadable attachment - comment this out to show it directly inside the
	// web browser.  Note that you can give the file any name you want, e.g. alias-name.pdf below:
	header('Content-Disposition: attachment; filename=' . 'resume.pdf' );
	 
	// Stream PDF to user
	echo $result;


} catch (Exception $e) {
	$result = array(
	        "status" => "Error",
	        "message" => $e->getMessage()
		);
	echo json_encode($result);
}

?>
