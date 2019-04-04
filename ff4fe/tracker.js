$(function() {

  function have(item) {
    return $('#' + item).hasClass('active');
  }

  function done(place) {
    return $('#' + place).hasClass('done');
  }

  function avail(selector, cond) {
    if (cond) $(selector).addClass('available');
    else $(selector).removeClass('available');
  }

  function updateTracker() {
    $('#cecil').attr('src', done('ordeals') ? 'cecilpal.png' : 'cecildk.png');
    $('#rydia').attr('src', done('dwarfchar') ? 'rydiaadult.png' : 'rydiachild.png');

    var underworld = have('magmakey') || done('eblan');

    avail('#adamant', have('hook') && have('tail'));
    avail('#baron img', have('baronkey'));
    avail('#eblan', have('hook'));
    avail('#wife', underworld);
    avail('#wife2', have('pan') && underworld);
    avail('#kaipo', have('sandruby'));
    avail('#magnes', have('twinharp'));
    avail('#mist', have('package'));
    avail('#zot img', have('earthcrystal'));
    avail('#dwarf img', underworld);
    avail('#feymarch', underworld);
    avail('#babil', underworld);
    avail('#canon', underworld && have('towerkey'));
    avail('#sealed', underworld && have('lucakey'));
    avail('#lunar', have('darkcrystal'));

    $('#tracker p').each(function(i, e) {
      var done = true;
      var avail = false;
      $(e).children('img').each(function(i, e) {
        if (!$(e).hasClass('done')) done = false;
        if ($(e).hasClass('available')) avail = true;
      });

      $(e).removeClass('done');
      $(e).removeClass('available');
      if (done)  $(e).addClass('done');
      if (avail) $(e).addClass('available');
    });
  }

  $('#party img').click(function(e) {
    $(this).toggleClass('active');
  });

  $('#items img').click(function(e) {
    $(this).toggleClass('active');
    updateTracker();
  });

  $('#tracker img').click(function(e) {
    if ($(this).hasClass('available')) {
      $(this).toggleClass('done');
      updateTracker();
    }
  });

  updateTracker();

});
