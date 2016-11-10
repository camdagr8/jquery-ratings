
$(function() {

	$('#state-toggler').on('click', function () {
		var elm = $('#ratings-2');
		var enabled = elm.ratings('get', 'enabled');
		var state = (enabled === true) ? 'disable' : 'enable';
		var label = (enabled === true) ? 'enable' : 'disable';

		elm.ratings(state);
		$(this).text(label);
	});

	$('#max-toggler').on('click', function () {
		var elm = $('#ratings-1');
		var max = elm.ratings('get', 'max');
			max = (max === 5) ? 10 : 5;

		var lbl = (max === 10) ? 5 : 10;

		elm.ratings('max', max);
		$(this).text('max ' + lbl);
	});

	$('#val-toggler').on('click', function () {
		var elm = $('#ratings-1');
		var val = elm.ratings('get', 'value');
			val = (val === 5) ? 0 : 5;

		var lbl = (val === 0) ? 5 : 0;

		elm.ratings('value', val);
		$(this).text('value ' + lbl);
	});

});
