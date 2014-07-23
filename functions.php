<?php 
function array_trim($arr) {
	dump_array($arr);

	$max_x = count($arr[0]);
	$max_y = count($arr);

	// trim empty rows
	for($i = $max_y - 1; $i >= 0; $i--) {
		if(count(array_filter($arr[$i]))) {
			$max_x = $i + 1;
			break;
		}
	}

	$arr = array_slice($arr, 0, $max_x);
	dump_array($arr);

	for($i = $max_x - 1; $i >= 0; $i--) {
		for($j = 0; $j < $max_y; $j++) {
			if($arr[$i][$j] !== '') {
				$max_y = $i + 1;
				break(2);
			}
		}
	}

	for($i = $max_x - 1; $i >= 0; $i--) {
		$arr[$i] = array_slice($arr, 0, $max_y);
	}

	dump_array($arr);
}

function dump_array($arr) {
	echo '<pre>';

	for($i = 0; $i < count($arr); $i++) {
		for($j = 0; $j < count($arr[$i]); $j++) {
			echo '"'.$arr[$i][$j].'" ';
		}

		echo PHP_EOL;
	}

	echo '</pre>';
}

?>
