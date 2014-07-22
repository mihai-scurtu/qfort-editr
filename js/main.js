var keyCode = {
	LEFT: 		37,
	UP: 		38,
	RIGHT: 		39,
	DOWN: 		40,
	TAB: 		9,
	RETURN: 	13
}

$(function() {
	$('#main').infiniTable();

	$('#main').on('keyup', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var coords = getCoords($(this).find('input:focus'));
		var target = coords;

		console.log(e.which);

		switch(e.which) {
			case keyCode.UP:
				target.y = Math.max(0, coords.y - 1);
				break;

			case keyCode.DOWN:
				target.y = Math.min($('#main').data('rows') - 1, coords.y + 1);
				break;

			case keyCode.LEFT:
				target.x = Math.max(0, coords.x - 1);
				break;

			case keyCode.RIGHT:
				target.x = Math.min($('#main').data('cols') - 1, coords.x + 1);
				break;

			default: 
				return true;
		}

		$('#main').data('cells')[target.x][target.y].find('input').focus();
		return false;
	});
});


function getCoords(elem) {
	if(elem.is('input')) elem = elem.parent();
	
	return {x: elem.data('x'), y: elem.data('y')};
}