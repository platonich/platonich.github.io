<?php

session_start();

//for use with javascript unescape function
function encode($input) {
	$temp = ''; 
	$length = strlen($input); 
	for($i = 0; $i < $length; $i++) {
		$temp .= '%' . bin2hex($input[$i]);
	} 
	return $temp; 
}


//if posting only
if(isset($_POST['submit'])) {
	$return = array('type' => 'error', 'session' => $_SESSION);

		$to = 'goca17@gmail.com'; // Change this line to your email.
		
		$name = isset($_POST['name']) ? trim($_POST['name']) : '';
		$email = isset($_POST['email']) ? trim($_POST['email']) : '';
		$message = isset($_POST['comment']) ? trim($_POST['comment']) : '';
		$subject = 'Guestbook Form Submission';
		
		if($name) {
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: {$name} support@logicathemes.com \r\n";
			
			$message .= 'New Guestbook Form Submission<br />';
			$message .= ' <br /> Name: ' . $name;
			
			@$send = mail($to, $subject, $message, $headers);
			
			if($send) {
				$return['type'] = 'success';
				$return['message'] = 'Email successfully sent.';
			} else {
				$return['message'] = 'Error sending email.';
			}
		} else {
			$return['message'] = 'Error validating email.';
		}

	die(json_encode($return));
}



if(isset($_POST['get_auto_value'])) {
	$num1 = rand(1, 10);
	$num2 = rand(1, 10);
	
	$_SESSION['_form_validate'] = $num1 + $num2;
	
	$return = array(
		'data' => encode("What is {$num1} + {$num2}"),
		'session' => $_SESSION
	);
	
	die(json_encode($return));
}

?>