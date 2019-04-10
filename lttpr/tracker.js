$(function() {
  $('img[data-max]').click(function(e) {
    var img = $(e.target);
    var count = img.attr('data-count');
    if (count > 0) {
      count--;
    } else {
      count = img.attr('data-max');
    }
    img.attr('data-count', count);
    img.attr('src', 'chest' + count + '.png');
  });

  $('.map .poi').click(function(e) {
    $(e.target).toggleClass('done');
  });

  $('.chests img.boss').click(function(e) {
    $(e.target).toggleClass('dead');
  });

  updateMaps();
});
