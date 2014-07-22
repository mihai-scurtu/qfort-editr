(function($) {
	$.fn.infiniTable = function() {
		var _this = this;
		if(!_this.is('table')) {
			$.error('Subject is not a table');
		}

		init(_this);

		_this.on('focus', 'input', function(e) {
			console.log(_this.data(), $(this).parent().data());

			if($(this).parent().data('x') == _this.data('cells') - 1) {
				expandTable(_this, 'x');
			}

			if($(this).parent().data('y') == _this.data('rows') - 1) {
				expandTable(_this, 'y');
			}

			// console.log(_this.data());
		});

		return this;
	}	

	var init = function(table) {
		// rows cache
		var rows = table.find('tr');

		// init an empty table
		if(rows.size() == 0) {
			table.append($('<tr>').append('<td>'));

			rows = table.find('tr');
		}

		// save table size
		table.data({
			rows: table.find('tr').size(),
			cells: table.find('tr:first').find('td').size()
		});


		// init cells
		$.each(rows, function(i){
			$.each($(this).find('td'), function(j) {
				initCell($(this), j, i);
			});
		});
	}

	/**
	 * Initialize a cell
	 * @param  {$} cell The cell jqery object
	 * @param  {int} x    The cell's x coordinate
	 * @param  {int} y    The cell's y coordinate
	 */
	var initCell = function(cell, x, y) {
		// add coords
		cell.data({
			x: x,
			y: y
		});

		// add input box
		if(cell.find('input').size() == 0) {
			var text = cell.text();
			cell.empty().append($('<input type="text">').attr('maxlength', 1).val(text));
		}
	}

	/**
	 * Expands the table in a direction (or both), initializing each new cell
	 * @param  {$} table The table jquery object
	 * @param  {'x'|'y'|undefined} dir   The direction to expand:
	 *                    'x' => add new column
	 *                    'y' => add new row
	 *                    undefined => add both
	 */
	var expandTable = function(table, dir) {
		var newCells = table.data('cells');
		var newRows = table.data('rows');

		if(dir == 'x' || dir === undefined) {
			newCells += 1;

			// add a new cell to each row
			table.find('tr').each(function(i) {
				var cell = $('<td>');
				initCell(cell, newCells - 1, i);

				$(this).append(cell);
			});
		}

		if(dir == 'y' || dir === undefined) {
			newRows += 1;

			// create a new row
			var row = $('<tr>');

			for(i = 0; i < newCells; i++) {
				var cell = $('<td>');
				initCell(cell, i, newRows - 1); 

				row.append(cell);
			}

			table.append(row);
		}

		// update table size
		table.data({
			cells: newCells,
			rows: newRows
		});
	}
}(jQuery));