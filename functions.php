<?php 
function array_trim($arr) {
	$max_x = count($arr);
	$max_y = count($arr[0]);

	// trim empty rows
	for($i = $max_x - 1; $i >= 0; $i--) {
		if(count(array_filter($arr[$i]))) {
			$max_y = $i + 1;
			break;
		}
	}

	$arr = array_slice($arr, 0, $max_y);

	for($i = $max_y - 1; $i >= 0; $i--) {
		for($j = 0; $j < $max_x; $j++) {
			if($arr[$i][$j] !== '') {
				$max_x = $i + 1;
				break(2);
			}
		}
	}

	for($i = $max_y - 1; $i >= 0; $i--) {
		$arr[$i] = array_slice($arr[$i], 0, $max_x);
	}

	return $arr;
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

function array2csv($arr) {
	ob_start();
	
	for($i = 0; $i < count($arr); $i++) {
		for($j = 0; $j < count($arr[$i]); $j++) {
			echo '"'.$arr[$i][$j].'",';
		}

		echo PHP_EOL;
	}

	return ob_get_clean();
}

?>
