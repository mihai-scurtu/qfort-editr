<?php
require_once 'functions.php';

if(is_array($_POST['data'])) {
	$data = array_trim($_POST['data']);

	if($_POST['comment'] == '#') {
		$_POST['comment'] = false;
	}

	$comment = $_POST['comment'] ? $_POST['comment'] : '#qfort-editr-blueprint';
	$filename = str_replace(array('#', ' '), array('', '-'), $comment).'.csv';

	if(count($data)) {
		header('Content-type: text/csv');
		header('Content-Disposition: attachment; filename="'.$filename.'"');

		echo $_POST['comment'].PHP_EOL.array2csv($data);
	}
}

// if(!headers_sent()) {
// 	header('Location: ./');
// }

?>