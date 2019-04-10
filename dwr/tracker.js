$(function() {
  $('.items img').click(function(e) {
    $(e.target).toggleClass('have');
  });

  $('div span').click(function(e) {
    $(e.target).toggleClass('found');
  });

  $('div span i').click(function(e) {
    var t = $(e.target);

    if (t.hasClass('c')) {
      t.toggleClass('open');
      return false;
    }

    if (t.hasClass('s')) {
      t.toggleClass('silver');
      return false;
    }

    if (t.hasClass('silver')) {
      t.removeClass('silver');
      t.addClass('gold');
    } else if (t.hasClass('gold')) {
      t.removeClass('gold');
    } else {
      t.addClass('silver');
    }

    return false;
  });

  var time = 0;
  var start = 0;
  var timer_id = 0;

  var update_timer = function() {
    time = performance.now() - start;

    var cs = Math.floor(time / 10) % 100;
    var s = Math.floor(time / 1000) % 60;
    var m = Math.floor(time / 60000) % 60;
    var h = Math.floor(time / 3600000);

    var ts = '';

    if (time >= 3600000) {
      ts += h + ':';
      if (m < 10) ts += '0';
    }

    if (time >= 60000) {
      ts += m + ':';
      if (s < 10) ts += '0';
    }

    ts += s;

    if (time < 600000) {
      ts += '.';
      if (cs < 10) ts += '0';
      ts += cs;
    }

    $('#timer').text(ts);
  };

  var toggle_timer = function() {
    if (timer_id > 0) {
      clearInterval(timer_id);
      timer_id = 0;
    } else {
      start = performance.now() - time;
      timer_id = setInterval(update_timer, 10);
    }
  };

  $('#timer').click(toggle_timer);
  $(document).keydown(function(e) {
    if (e.target.hasAttribute('contenteditable')) return;

    if (e.key == ' ') {
      toggle_timer();
      e.preventDefault();
    }
  });

  $('#map').click(function(e) {
    var offset = $(this).offset();
    var x = e.pageX - offset.left - 24;
    var y = e.pageY - offset.top - 24;

    $('#hint').remove();

    var poi = $('<span>x</span>');
    poi.css({ 'left': x + 'px', 'top': y + 'px' });

    $(this).append(poi);

    e.preventDefault();
  });
});
