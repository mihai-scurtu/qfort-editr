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
	$('#main input:first').focus();

	// keyboard navigation
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

			case keyCode.RETURN:
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

	$('#main').on('focus', 'input', function(e) {
		var coords = getCoords($(this));
		var cells = $('#main').data('cells');

		$('#main').find('td').removeClass('highlight');

		if(cells && cells.length && cells[0].length) {
			var i, cell;

			for(i = 0; i < $('#main').data('cols'); i++) {
				if(cell = cells[i][coords.y]) {
					cell.addClass('highlight');
				}
			}
			
			for(i = 0; i < $('#main').data('rows'); i++) {
				if(cell = cells[coords.x][i]) {
					cell.addClass('highlight');
				}
			}

			cells[coords.x][coords.y].removeClass('highlight');
		}
	});

	// always prepend "#" to comment field
	$('#comment').on('change focus keyup', function(e) {
		var val = $(this).val();

		if(!val || val.charAt(0) != '#') {
			$(this).val('#' + val);
		}

		
		if(e.which == keyCode.RETURN) {
			$(this).blur();
		}
	});

	$('#comment').on('blur', function(e) {
		// remove empty hash
		if($(this).val() == '#') {
			$(this).val('');
		}

	});
});


function getCoords(elem) {
	if(elem.is('input')) elem = elem.parent();
	
	return {x: elem.data('x'), y: elem.data('y')};
}