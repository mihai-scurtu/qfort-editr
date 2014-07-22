<?php 
function array_trim($arr) {
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

	var_dump($arr);
}

?>
