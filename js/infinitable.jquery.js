(function($) {
	$.fn.infiniTable = function() {
		var _this = this;
		if(!_this.is('table')) {
			$.error('Subject is not a table');
		}

		init(_this);

		_this.on('focus click', 'input', function(e) {
			// console.log(_this.data(), $(this).parent().data());

			// select input content
			this.select();

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
		var rows = table.find('tr:not(.guide)');

		// init an empty table
		if(rows.size() == 0) {
			table.append($('<tr>').append('<td>'));

			rows = table.find('tr');
		}

		// save table size
		table.data({
			rows: rows.size(),
			cols: rows.eq(0).find('td').size(),
			cells: []
		});

		// add guide row (or empty it)
		if(table.find('tr.guide').size() == 0) {
			table.prepend($('<tr>').addClass('guide'));
		} else {
			table.find('tr.guide').empty();
		}

		// generate guide row cells
		$(table.find('tr.guide')).each(function() {
			var i;
			for(i = 0; i <= table.data('cols'); i++) {
				$(this).append($('<td>').html(i ? i : '&nbsp;'));
			}
		});

		// init rows
		$.each(rows, function(i){
			initRow(table, $(this), i);
		});
	}

	var initRow = function(table, row, y) {
		// add guide cell
		if(row.find('td.guide').size() == 0) {
			row.prepend($('<td>').addClass('guide').html(y + 1));
		} else {
			row.find('td.guide').html(y + 1);
		}

		// init cells
		row.find('td:not(.guide)').each(function(i) {
			initCell(table, $(this), i, y);
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
			cell.empty().append($('<input type="text">').attr('maxlength', 2)
				.attr('name', 'data['+y+']['+x+']').val(text))
				.attr('autocomplete', 'off');
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
			table.find('tr:not(.guide)').each(function(i) {
				var cell = $('<td>');
				initCell(table, cell, newCols - 1, i);

				$(this).append(cell);
			});

			// generate guide row cells
			$(table.find('tr.guide')).each(function() {
				$(this).append($('<td>').html(newCols));
			});
		}

		if(dir == 'y' || dir === undefined) {
			newRows += 1;

			// create a new row
			var row = $('<tr>');

			for(i = 0; i < newCols; i++) {
				var cell = $('<td>');
				// initCell(table, cell, i, newRows - 1); 
				row.append(cell);
			}

			initRow(table, row, newRows - 1);

			table.append(row);
		}

		// update table size
		table.data({
			cols: newCols,
			rows: newRows
		});
	}
}(jQuery));