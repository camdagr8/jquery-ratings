(function($) {

  $.fn.stars = function(action, params) {
    var ns = {

      enable: function (elms) {
        elms.each(function () {
          $(this).removeClass('disabled');
          $(this).trigger('stars:enabled', [this.__star]);
        });

        return ns.set(elms, 'enabled', true);
      },

      disable: function (elms) {
        elms.each(function () {
          $(this).addClass('disabled');
          $(this).trigger('stars:disabled', [this.__star]);
        });

        return ns.set(elms, 'enabled', false);
      },

      draw: function (elm) {
        $(elm).html('');

        var conf = elm.__star;

        var contFull    = $('<span class="stars-full" />').appendTo($(elm));
        var contEmpty   = $('<span class="stars-empty" />').appendTo($(elm));
        var countFull   = Math.ceil(conf.value);
        var countEmpty  = conf.max - countFull;

        for (var i = 0; i < conf.max; i++) {
          contEmpty.append(conf.star.empty);
          contFull.append(conf.star.full);
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
      },

      rate: function (elm, e) {
        // 0.0 - Get the configuration -> exit if none
        var conf = elm.__star;
        if (typeof conf === 'undefined') { return; }

        // 1.0 - Get the x position mouse
        var x = e.clientX - elm.offsetLeft;

        // 1.1 - Get the percentage of the element where the click happened
        var p = x / $(elm).outerWidth();

        // 2.0 - Get the new value
        var v = Number(conf.max * p);
            v = Number((Math.round(v * 2) / 2).toFixed(1));

        // 2.1 - Set the new value
        $(elm).stars('value', v);

        // 3.0 - Trigger the change event
        $(elm).trigger('stars:change', [conf, v]);
      },

      resize: function (elm) {
        var conf = elm.__star;
        if (typeof conf === 'undefined') { return; }

        var contEmpty = $(elm).find('.stars-empty');
        var contFull  = $(elm).find('.stars-full');

        if (contFull.length < 1 || contEmpty.length < 1) { return; }

        var per = conf.value / conf.max;
        var w = per * contEmpty.innerWidth();
            w = Math.floor(w);

        $(elm).css({opacity: 1});

        contFull.css({width: w+'px'});
      },

      init: function (elms) {
        return elms.each(function () {

          // 0.0 - Default config
          var defaults = {
            enabled   : true,
            max       : 5,
            star      : {
              empty   : '<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 23l9 6-4-10 9-6h-10l-4-10-4 10h-10l9 6-4 10 9-6zM16 21.753l-6.8 4.547 3.2-7.7-7.2-4.6h7.5l3.3-8.5 3.3 8.5h7.5l-7.2 4.6 3.2 7.7-6.8-4.547z"></path></svg>',
              full    : '<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 23l-9 6 4-10-9-6h10l4-10 4 10h10l-9 6 4 10z"></path></svg>'
            },
            value     : 0,
          };

          // 0.1 - Get passed parameters
          var d  = $(this).data('stars');

          this.__star = $.extend(defaults, action);
		  this.__star = $.extend(this.__star, d);

          var conf = this.__star;

		  var exp = new RegExp(/<\/?[\w\s="/.':;#-\/\?]+>/gi);
          var starEmpty = (exp.test(conf.star.empty) === true) 	? conf.star.empty 	: $(this).find(conf.star.empty).html();
		  var starFull 	= (exp.test(conf.star.full) === true) 	? conf.star.full 	: $(this).find(conf.star.full).html();

          this.__star.star.empty = starEmpty;
          this.__star.star.full = starFull;

          ns.draw(this);

          $(this).on('mousemove', ns.onMouseMove);
          $(this).on('mouseout', ns.onMouseOut);
          $(this).on('mouseup', ns.onMouseUp);

        });
      },

      onMouseMove: function (e) {
        if (e.buttons < 1) { return; }

        var conf = $(this)[0].__star;
        if (conf.enabled !== true) { return; }

        ns.rate($(this)[0], e);
      },

      onMouseOut: function (e) {
        if (e.buttons < 1) { return; }

        var conf = $(this)[0].__star;
        if (conf.enabled !== true) { return; }

        ns.rate($(this)[0], e);
      },

      onMouseUp: function (e) {
        var conf = $(this)[0].__star;
        if (conf.enabled !== true) { return; }

        ns.rate($(this)[0], e);
      },

      set: function (elms, property, newValue) {
        return elms.each(function () {
          this.__star[property] = newValue;

		  if (property === 'max') {
			this.__star.value = Math.min(this.__star.value, this.__star.max);
		  }

          if (property === 'value') {
			this.__star.value = Math.min(this.__star.value, this.__star.max);
            ns.resize(this);
          } else {
            ns.draw(this);
          }

          $(this).trigger("stars:update", [this.__star]);
          $(this).trigger("stars:update."+property, [this.__star]);
        });
      }
    };

    switch (action) {
	  case 'disable':
        return ns.disable(this);
        break;

      case 'enable':
        return ns.enable(this);
        break;

	  case 'get':
		return this[0].__star[params];
		break;

      case 'max':
        return ns.set(this, 'max', params);
        break;

      case 'value':
        return ns.set(this, 'value', params);
        break;

      default:
        return ns.init(this);
    }
  };

  $('[data-stars]').stars();

}(window.jQuery));
