$(function() {
  var sets = {
    'item': [ 'blank.png', 'boots.png', 'candle.png', 'cross.png', 'flute.png', 'glove.png', 'hammer.png', 'heart.png', 'key.png', 'kid.png', 'magic.png', 'medicine.png', 'dig.png', 'raft.png', 'trophy.png' ],
    'town': [ 'blank.png', 'fairy.png', 'fire.png', 'jump.png', 'life.png', 'reflect.png', 'shield.png', 'spell.png', 'thunder.png' ],
    'pos': [ 'blank.png', 'west.png', 'east.png', 'maze.png', 'vod.png' ],
    'oldwoman': [ 'oldwoman.png', 'oldwoman5.png', 'oldwoman6.png', 'oldwoman7.png' ],
  };

  var next = function(set_name, current) {
    var set = sets[set_name];
    if (set) {
      for (var i = 0; i < set.length; ++i) {
        if (set[i] == current) {
          if (i == set.length - 1) {
            return set[0];
          } else {
            return set[i + 1];
          }
        }
      }
    }

    return current;
  }

  var prev = function(set_name, current) {
    var set = sets[set_name];
    if (set) {
      for (var i = 0; i < set.length; ++i) {
        if (set[i] == current) {
          if (i == 0) {
            return set[set.length - 1];
          } else {
            return set[i - 1];
          }
        }
      }
    }

    return current;
  }

  var increment = function(e) {
    var set = $(e.target).attr('data-click');
    var current = $(e.target).attr('src');
    var newitem = next(set, current);
    $(e.target).attr('src', newitem);
    e.preventDefault();
  };

  var decrement = function(e) {
    var set = $(e.target).attr('data-click');
    var current = $(e.target).attr('src');
    var newitem = prev(set, current);
    $(e.target).attr('src', newitem);
    e.preventDefault();
  };

  var menuTarget = undefined;
  var showMenu = function(x, y, target) {
    menuTarget = target;
    var menu = $('#menu');

    menu.css('left', x + 'px');
    menu.css('top', y + 'px');
    menu.show();
  };

  var closeMenu = function() {
    menuTarget = undefined;
    $('#menu').hide();
  };

  var addNote = function(encounter, location) {
    var dt = $('<dt>' + encounter + '</dt>');
    var dd = $('<dd>' + location + '</dd>');
    $('#notes').append(dt, dd);
  };

  $('img[data-click]').click(increment);
  $('img[data-click]').contextmenu(decrement);
  $('img[data-click]').bind('mousewheel', function(e) {
    e.originalEvent.wheelDelta < 0 ? increment(e) : decrement(e);
  });

  $('.toggle').click(function(e) {
    $(e.target).toggleClass('done');
    e.preventDefault();
  });

  $('div.caves div').each(function(i, e) {
    $(e).append('<b class="check l"></b>');
    $(e).append('<b class="check r"></b>');
  });

  $('.check').click(function(e) {
    $(e.target).toggleClass('done');
    e.preventDefault();
  });

  $('#standard').click(function(e) {
    $('button').removeClass('active');
    $(e.target).addClass('active');
    $('.standard').show();
    $('.classic').hide();
  });

  $('#classic').click(function(e) {
    $('button').removeClass('active');
    $(e.target).addClass('active');
    $('.standard').hide();
    $('.classic').show();
  });

  $('#map i').click(function(e) {
    $(e.target).toggleClass('done');
    e.preventDefault();
  });

  $('#map i').contextmenu(function(e) {
    showMenu(e.pageX, e.pageY, $(e.target));
    e.stopPropagation();
    e.preventDefault();
  });

  $('#map').contextmenu(function(e) {
    closeMenu();
    e.preventDefault();
  });

  $('#menu li').click(function(e) {
    var t = $(e.target);
    if (menuTarget) {
      menuTarget.addClass('poi');
      if (t.hasClass('palace')) {
        menuTarget.addClass('palace');
      } else if (t.hasClass('town')) {
        menuTarget.addClass('town')
      } else if (t.hasClass('dock')) {
        menuTarget.addClass('dock');
      }

      addNote(t.text(), menuTarget.attr('title'));
    }

    closeMenu();
  });

  $('.classic').hide();
});
