<?php
require_once 'functions.php';

if(is_array($_POST['data'])) {
	$data = array_trim($_POST['data']);

	$keyword = $_POST['keyword'];
	$comment = $_POST['comment'];

	// var_dump($keyword); die;

	$filename = preg_replace('/[^a-zA-Z0-9\-]+/', '-', $comment.$keyword).'.csv';

	if(count($data)) {
		header('Content-type: text/csv');
		header('Content-Disposition: attachment; filename="'.$filename.'"');

		echo $keyword.' '.$comment.PHP_EOL.array2csv($data);
	}
}

// if(!headers_sent()) {
// 	header('Location: ./');
// }

?>