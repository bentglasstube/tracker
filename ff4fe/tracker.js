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
    avail('#mistitem', done('mistdragon'));
    avail('#mistchar', have('package'));
    avail('#zot img', have('earthcrystal'));
    avail('#dwarf img', underworld);
    avail('#feymarch img', underworld);
    avail('#babil', underworld);
    avail('#canon', underworld && have('towerkey'));
    avail('#sealed', underworld && have('lucakey'));
    avail('#sylph', underworld && have('pan'));
    avail('#lunar', have('darkcrystal'));
    avail('#giant', have('darkcrystal'));
    avail('#bahamut', have('darkcrystal'));

    avail('#towns .underworld', underworld);
    avail('#towns .moon', have('darkcrystal'));

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

  $('#bosses p').click(function(e) {
    $(e.target).toggleClass('done');
    updateTracker();
  });

  $('#towns p').click(function(e) {
    var t = $(e.target);
    if (t.hasClass('available')) {
      if (t.hasClass('done')) {
        t.removeClass('done');
        t.addClass('poi');
      } else if (t.hasClass('poi')) {
        t.removeClass('poi');
      } else {
        t.addClass('done');
      }
    }
  });

  $('#chests p').click(function(e) {
    $(e.target).toggleClass('done');
  });

  $('#chests p i.trap').click(function(e) {
    var count = parseInt($(this).text());
    if (count > 0) $(this).text(count - 1);
    e.stopPropagation();
  });

  $('#Kq').click(function(e) {
    $(e.target).toggleClass('on');
    $('.summon').toggleClass('hide');
    updateTracker();
  });

  $('#Nc').click(function(e) {
    $(e.target).toggleClass('on');
    $('.freechar').toggleClass('hide');
    updateTracker();
  });

  $('#Nk').click(function(e) {
    $(e.target).toggleClass('on');
    $('.freeitem').toggleClass('hide');
    updateTracker();
  });

  updateTracker();

});
