$(function() {
  var sets = {
    'overworld': [ '', 'X', 'P', 'H', '$', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'S2', 'S3', 'W1', 'W2', 'W3', 'W4', 'BA', 'BB', 'BC', 'BM', 'BR' ],
    'item': [ 'blank.png', 'book.png', 'boomerang.png', 'bow.png', 'heart.png', 'key.png', 'ladder.png', 'mag-boomerang.png', 'power-bracelet.png', 'raft.png', 'recorder.png', 'red-candle.png', 'red-ring.png', 'silver-arrows.png', 'wand.png', 'white-sword.png'],
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

  var getBackground = function(e) {
    var css = $(e).css('background-image');
    return css.substring(css.lastIndexOf('/') + 1, css.length - 2)
  }

  var cycle = function(e, set, func) {
    var current = set == 'overworld' ? $(e.target).text() : getBackground(e.target);
    var newitem = func(set, current);

    if (set == 'overworld') {
      $(e.target).text(newitem);
    } else {
      $(e.target).css('background-image', 'url("' + newitem + '")');
    }

    e.preventDefault();
  };

  var bindMouse = function(selector, set) {
    $(selector).click(function(e) { cycle(e, set, next); });
    $(selector).contextmenu(function(e) { cycle(e, set, prev); });
  };

  bindMouse('table.map td', 'overworld');
  bindMouse('i.item', 'item');

  $('i.heart,i.triforce').click(function(e) { $(e.target).toggleClass('have'); });
});
