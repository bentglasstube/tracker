$(function() {
  function setClassIf(elements, set, cls) {
    if (set) {
      elements.addClass(cls);
    } else {
      elements.removeClass(cls);
    }
  }

  function threeWay(element, classA, classB) {
    if (element.hasClass(classA)) {
      element.removeClass(classA);
      element.addClass(classB);
    } else if (element.hasClass(classB)) {
      element.removeClass(classB);
    } else {
      element.addClass(classA);
    }
  }

  $('.items img').click(function(e) {
    var t = $(e.target);

    if (t.attr('id') == 'key') {
      threeWay(t, 'silver', 'gold');
    } else {
      t.toggleClass('have');
    }

    var silver = $('#key').hasClass('silver');
    var gold = $('#key').hasClass('gold');
    var jailor = $('#jailor').hasClass('have');

    setClassIf($('i.silver'), !silver && !gold, 'unavailable');
    setClassIf($('i.gold'), !gold, 'unavailable');
    setClassIf($('i.jailor'), !jailor, 'unavailable');
    setClassIf($('i.gold.jailor'), !gold || !jailor, 'unavailable');

    // if (t.hasClass('have')) new FireworkBurst($(document.body), 100);
  });

  $('.chars img').click(function(e) {
    var t = $(e.target);

    if (t.attr('id') == 'hero') return false;
    if (t.attr('id') == 'bran') $('#area2').toggleClass('unavailable');
    if (t.attr('id') == 'peta') $('#area3').toggleClass('unavailable');
    t.toggleClass('have');
  });

  $('div>span>i').click(function(e) {
    var t = $(e.target);

    if (t.hasClass('unavailable')) return false;
    if (t.parents('.unavailable').length > 0) return false;

    if (t.hasClass('flute')) {
      var p = $(t.parent());
      if (p.hasClass('search')) p = $('div>span.search');
      threeWay(p, 'no', 'yes');
    } else {
      t.toggleClass('done');

      var p = t.parent();

      if (t.hasClass('battle')) {
        var c = $(p.hasClass('castle') ? '#moon' : '#star');
        setClassIf(p, !t.hasClass('done'), 'yes');
        setClassIf(c, t.hasClass('done'), 'have');
      }

      var done = true;
      p.children('i').each(function(i, e) {
        if ($(e).hasClass('flute')) return;
        if (!$(e).hasClass('done')) done = false;
      });
      done ? p.addClass('done') : p.removeClass('done');
      return false;
    }
  });

  $('#loc').click(function(e) {
    $('#loc').parent().addClass('active');
    $('#eq').parent().removeClass('active');
    $('.island').show();
    $('.equipment').hide();
    e.preventDefault();
  });

  $('#eq').click(function(e) {
    $('#loc').parent().removeClass('active');
    $('#eq').parent().addClass('active');
    $('.island').hide();
    $('.equipment').show();
    e.preventDefault();
  });

  $('.equipment').hide();
});
