<?php
require_once 'functions.php';

// var_dump($_POST['data']);

if(is_array($_POST['data'])) {
	$data = array_trim($_POST['data']);
}

// if(!headers_sent()) {
// 	header('Location: ./');
// }

?>