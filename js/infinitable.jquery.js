(function($) {
	$.fn.infiniTable = function() {
		var _this = this;
		if(!_this.is('table')) {
			$.error('Subject is not a table');
		}

		init(_this);

		_this.on('focus', 'input', function(e) {
			// console.log(_this.data(), $(this).parent().data());

			if($(this).parent().data('x') == _this.data('cols') - 1) {
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
			cols: table.find('tr:first').find('td').size(),
			cells: []
		});

		// init cells
		$.each(rows, function(i){
			$.each($(this).find('td'), function(j) {
				initCell(table, $(this), j, i);
			});
		});
	}

	/**
	 * Initialize a cell
	 * @param  {$} table The table juery object
	 * @param  {$} cell The cell jqery object
	 * @param  {int} x    The cell's x coordinate
	 * @param  {int} y    The cell's y coordinate
	 */
	var initCell = function(table, cell, x, y) {
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

		if(table.data && table.data('cells')) {
			// initialize a new array row if needed
			if(!table.data('cells')[x]) {
				table.data('cells')[x] = []
			}

			// register cell
			table.data('cells')[x][y] = cell;
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
		var newCols = table.data('cols');
		var newRows = table.data('rows');

		if(dir == 'x' || dir === undefined) {
			newCols += 1;

			// add a new cell to each row
			table.find('tr').each(function(i) {
				var cell = $('<td>');
				initCell(table, cell, newCols - 1, i);

				$(this).append(cell);
			});
		}

		if(dir == 'y' || dir === undefined) {
			newRows += 1;

			// create a new row
			var row = $('<tr>');

			for(i = 0; i < newCols; i++) {
				var cell = $('<td>');
				initCell(table, cell, i, newRows - 1); 

				row.append(cell);
			}

			table.append(row);
		}

		// update table size
		table.data({
			cols: newCols,
			rows: newRows
		});
	}
}(jQuery));