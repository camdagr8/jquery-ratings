
$(function() {

	$('#state-toggler').on('click', function () {
		var elm = $('#stars-2');
		var enabled = elm.stars('get', 'enabled');
		var state = (enabled === true) ? 'disable' : 'enable';
		var label = (enabled === true) ? 'enable' : 'disable';

		elm.stars(state);
		$(this).text(label);
	});

	$('#max-toggler').on('click', function () {
		var elm = $('#stars-1');
		var max = elm.stars('get', 'max');
			max = (max === 5) ? 10 : 5;

		var lbl = (max === 10) ? 5 : 10;

		elm.stars('max', max);
		$(this).text('max ' + lbl);
	});

	$('#val-toggler').on('click', function () {
		var elm = $('#stars-1');
		var val = elm.stars('get', 'value');
			val = (val === 5) ? 0 : 5;

		var lbl = (val === 0) ? 5 : 0;

		elm.stars('value', val);
		$(this).text('value ' + lbl);
	});

});
