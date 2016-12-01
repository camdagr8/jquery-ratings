(function($) {

  $.fn.ratings = function() {
    var ns = {
      enable: function (elms, silent) {
        elms.each(function () {
          $(this).removeClass('disabled');
		  if (silent !== true) {
			$(this).trigger('ratings:enabled', [this.__ratings]);
		  }
        });

        return ns.set(elms, 'enabled', true, silent);
      },

      disable: function (elms, silent) {
        elms.each(function () {
          $(this).addClass('disabled');
		  if (silent !== true) {
			$(this).trigger('ratings:disabled', [this.__ratings]);
		  }
        });

        return ns.set(elms, 'enabled', false, silent);
      },

      draw: function (elm) {
        $(elm).html('');

        var conf = elm.__ratings;

        var contEmpty   = $('<span class="ratings-empty" />').appendTo($(elm));
		var contFull    = $('<span class="ratings-full" />').appendTo($(elm));

		var countEmpty  = conf.max - countFull;
	    var countFull   = Math.ceil(conf.value);

        for (var i = 0; i < conf.max; i++) {
          contEmpty.append(conf.icons.empty);
          contFull.append(conf.icons.full);
        }

        var per = conf.value / conf.max;
        var w = per * contEmpty.innerWidth();
        var h = contEmpty.innerHeight();

        $(elm).css({
          opacity: 1,
          width: contEmpty.innerWidth(),
          height: contEmpty.innerHeight()
        });

        contFull.css({
          width: w+'px',
          height: h+'px'
        });

		return elm;
      },

	  init: function (elms, params) {
        return elms.each(function () {

          // 0.0 - Default config
          var defaults = {
            enabled   : true,
            max       : 5,
            icons 	  : {
              empty   : '<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 23l9 6-4-10 9-6h-10l-4-10-4 10h-10l9 6-4 10 9-6zM16 21.753l-6.8 4.547 3.2-7.7-7.2-4.6h7.5l3.3-8.5 3.3 8.5h7.5l-7.2 4.6 3.2 7.7-6.8-4.547z"></path></svg>',
              full    : '<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 23l-9 6 4-10-9-6h10l4-10 4 10h10l-9 6 4 10z"></path></svg>'
            },
            value     : 0
          };

          // 0.1 - Get passed parameters
          var d  = $(this).data('ratings');

          this.__ratings = $.extend(defaults, params);
		  this.__ratings = $.extend(this.__ratings, d);

		  // 0.2 - Localize the configuration object
          var conf = this.__ratings;

		  // 1.0 - Get the icon templates
		  var exp = new RegExp(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          var ratingsEmpty 	= (exp.test(conf.icons.empty) === true) ? conf.icons.empty 	: $(this).find(conf.icons.empty).html();
		  var ratingsFull 	= (exp.test(conf.icons.full) === true) 	? conf.icons.full 	: $(this).find(conf.icons.full).html();

          this.__ratings.icons.empty = ratingsEmpty;
          this.__ratings.icons.full  = ratingsFull;

		  // 2.0 - Draw the UI
          ns.draw(this);

		  // 3.0 - Apply interactive listener
          $(this).on('mousemove', ns.onMouseMove);
          $(this).on('mouseout', ns.onMouseOut);
          $(this).on('mouseup', ns.onMouseUp);
        });
      },

      onMouseMove: function (e) {
        if (e.buttons < 1) { return; }

        var conf = $(this)[0].__ratings;
        if (conf.enabled !== true) { return; }

        ns.rate($(this)[0], e, true);
      },

      onMouseOut: function (e) {
        if (e.buttons < 1) { return; }

        var conf = $(this)[0].__ratings;
        if (conf.enabled !== true) { return; }

        ns.rate($(this)[0], e);
      },

      onMouseUp: function (e) {
        var conf = $(this)[0].__ratings;
        if (conf.enabled !== true) { return; }

        ns.rate($(this)[0], e);
      },

	  rate: function (elm, e, silent) {

        // 0.0 - Get the configuration -> exit if none
        var conf = elm.__ratings;
        if (typeof conf === 'undefined') { return; }

        // 1.0 - Get the x position mouse
		var x = e.pageX - $(elm).offset().left;

        // 1.1 - Get the percentage of the element where the click happened
        var p = x / $(elm).outerWidth();

        // 2.0 - Get the new value
        var v = Number(conf.max * p);
            v = Number((Math.round(v * 2) / 2).toFixed(1));

        // 2.1 - Set the new value
        $(elm).ratings('value', v, true);

        // 3.0 - Trigger the change event
		if (silent !== true) {
		  $(elm).trigger('ratings:change', [v]);
		}
      },

	  redraw: function (elms, silent) {
		elms.each(function () {
		  ns.draw(this);

		  if (silent !== true) {
			$(this).trigger('ratings:redrawn', [this.__ratings]);
		  }
		});
	  },

      resize: function (elm) {
        var conf = elm.__ratings;
        if (typeof conf === 'undefined') { return; }

        var contEmpty = $(elm).find('.ratings-empty');
        var contFull  = $(elm).find('.ratings-full');

        if (contFull.length < 1 || contEmpty.length < 1) { return; }

        var per = conf.value / conf.max;
        var w = per * contEmpty.innerWidth();
            w = Math.ceil(w);

        $(elm).css({opacity: 1});

        contFull.css({width: w+'px'});
      },

      set: function (elms, property, newValue, silent) {
        return elms.each(function () {
          this.__ratings[property] = newValue;

		  if (property === 'max') {
			this.__ratings.value = Math.min(this.__ratings.value, this.__ratings.max);
		  }

          if (property === 'value') {
			this.__ratings.value = Math.min(this.__ratings.value, this.__ratings.max);
            ns.resize(this);
          } else {
            ns.draw(this);
          }

		  if (silent !== true) {
			$(this).trigger("ratings:update", [this.__ratings]);
			$(this).trigger("ratings:update."+property, [this.__ratings]);
		  }
        });
      }
    };

    switch (arguments[0]) {
	  case 'disable':
        return ns.disable(this, arguments[1]);
        break;

      case 'enable':
        return ns.enable(this, arguments[1]);
        break;

	  case 'get':
		return this[0].__ratings[arguments[1]];
		break;

      case 'max':
        return ns.set(this, 'max', arguments[1], arguments[2]);
        break;

	  case 'redraw':
		return ns.redraw(this, arguments[1]);
		break;

      case 'value':
        return ns.set(this, 'value', arguments[1], arguments[2]);
        break;

      default:
        return ns.init(this, arguments[0]);
    }
  };

  // Default element query
  $('[data-ratings]').ratings();

}(window.jQuery));
