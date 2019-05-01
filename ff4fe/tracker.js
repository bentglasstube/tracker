$(function() {

  function have(item) {
    return $('#' + item).hasClass('active');
  }

  function done(place) {
    return $('#' + place).hasClass('done');
  }

  function setClass(selector, cond, c) {
    if (cond) $(selector).addClass(c);
    else $(selector).removeClass(c);
  }

  function avail(selector, cond) {
    setClass(selector, cond, 'available');
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
    avail('#feymarch img', underworld);
    avail('#babil', underworld);
    avail('#canon', underworld && have('towerkey'));
    avail('#sealed', underworld && have('lucakey'));
    avail('#sylph', underworld);
    avail('#lunar', have('darkcrystal'));
    avail('#giant', have('darkcrystal'));
    avail('#bahamut', have('darkcrystal'));

    $('#tracker p').each(function(i, e) {
      var done = true;
      var avail = false;
      var hidden = true;
      $(e).children('img').each(function(i, e) {
        if ($(e).hasClass('hide')) return;
        hidden = false;
        if (!$(e).hasClass('done')) done = false;
        if ($(e).hasClass('available')) avail = true;
      });


      setClass(e, hidden, 'hide');
      setClass(e, done, 'done');
      setClass(e, avail, 'available');
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

  $('#Kq').click(function(e) {
    $('.summon').toggleClass('hide');
    updateTracker();
  });

  $('#Nc').click(function(e) {
    $('.freechar').toggleClass('hide');
    updateTracker();
  });

  $('#Nk').click(function(e) {
    $('.freeitem').toggleClass('hide');
    updateTracker();
  });

  updateTracker();

});
