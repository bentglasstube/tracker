$(function() {
  var status = {
    garland: false,
    ship: false, canoe: false, airship: false,
    tnt: false, canal: false,
    ruby: false, rod: false,
    crown: false, crystal: false, herb: false, key: false,
    floater: false,
    slab: false, translated: false, chime: false,
    bottle: false, oxyale: false,
    cube: false,
  };

  var accessible = {
    coneria: function() { return true; },
    fiends: function() { return true; },
    matoya: function() { return status.garland; },
    pravoka: function() { return status.garland; },
    elfland: function() { return status.ship; },
    marsh: function() { return status.ship; },
    astos: function() { return status.ship; },
    dwarf: function() { return status.ship; },
    melmac: function() { return status.canal; },
    earth: function() { return status.canal; },
    titan: function() { return status.airship || (status.canal && status.ruby); },
    sarda: function() { return status.airship || (status.canal && status.ruby); },
    crescent: function() { return status.canal; },
    volcano: function() { return status.canoe; },
    ice: function() { return status.canoe; },
    airship: function() { return status.canoe && status.floater; },
    ordeal: function() { return status.canoe; },
    cardia: function() { return status.airship; },
    sea: function() { return status.oxyale; },
    waterfall: function() { return status.airship; },
    gaia: function() { return status.airship; },
    mirage: function() { return status.chime; },
    caravan: function() { return status.airship; },
    mgmt: function() { return status.airship; },
  };

  var updateTracker = function() {
    var pois = $('#map i');
    for (var i = 0; i < pois.length; ++i) {
      var p = $(pois[i]);
      if (accessible[p.attr('id')]()) {
        p.removeClass('locked');
      } else {
        p.addClass('locked');
      }
    }
  }

  var hilight = function() {
    for (var i = 0; i < arguments.length; ++i) {
      $('#' + arguments[i]).removeClass('dim');
    }
  }

  var clicker = function(e) {
    var poi = $(e.target).attr('id');

    switch (poi) {
      case 'fiends':
        status.garland = true;
        break;

      case 'matoya':
        if (status.crystal) {
          status.crystal = false;
          status.herb = true;
          hilight('elfland');
        }
        break;

      case 'pravoka':
        status.ship = true;
        break;

      case 'elfland':
        if (status.herb) {
          status.herb = false;
          status.key = true;
          hilight('coneria', 'fiends', 'dwarf', 'astos', 'marsh');
        }
        break;

      case 'astos':
        if (status.crown) {
          status.crown = false;
          status.crystal = true;
          hilight('matoya');
        }
        break;

      case 'dwarf':
        if (status.tnt) status.canal = true;
        break;

      case 'melmac':
        if (status.slab) {
          status.slab = false;
          status.translated = true;
          hilight('mgmt');
        }
        break;

      case 'sarda':
        status.rod = true;
        hilight('earth');
        break;

      case 'crescent':
        status.canoe = true;
        break;

      case 'airship':
        status.airship = true;
        break;

      case 'waterfall':
        status.cube = true;
        hilight('mirage');
        break;

      case 'gaia':
        if (status.bottle) status.oxyale = true;
        break;

      case 'mgmt':
        if (status.translated) status.chime = true;
        break;

      case 'tnt':
        status.tnt = true;
        hilight('dwarf');
        break;

      case 'crown':
        status.crown = true;
        hilight('astos');
        break;

      case 'ruby':
        status.ruby = true;
        break;

      case 'floater':
        status.floater = true;
        break;

      case 'slab':
        status.slab = true;
        hilight('melmac');
        break;

      case 'bottle':
        status.bottle = true;
        hilight('gaia');
        break;
    }

    var t = $(e.target);
    if (t.is('img')) {
      t.addClass('have');
    } else {
      t.addClass('dim');
    }

    updateTracker();
  };


  $('#map i').click(clicker);
  $('#items img').click(clicker);

  updateTracker();
});
