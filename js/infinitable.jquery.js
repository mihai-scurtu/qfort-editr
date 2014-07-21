(function($) {
	$.fn.infiniTable = function() {
		if(!this.is('table')) {
			$.error('Subject is not a table');
		}

		init(this);

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

		// init cells
		$.each(rows, function(i){
			$.each($(this).find('td'), function(j) {
				// add coords
				$(this).data({
					x: i,
					y: j
				});

				// add input box
				if($(this).find('input').size() == 0) {
					var text = $(this).text();
					$(this).empty().append($('<input type="text">').val(text));
				}
			});
		});
	}
}(jQuery));