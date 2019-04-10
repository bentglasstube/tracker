var jobs = [
  'Freelancer',
  'Knight',
  'Monk',
  'Thief',
  'Dragoon',
  'Ninja',
  'Samurai',
  'Berserker',
  'Ranger',
  'MysticKnight',
  'WhiteMage',
  'BlackMage',
  'TimeMage',
  'Summoner',
  'BlueMage',
  'RedMage',
  'Beastmaster',
  'Chemist',
  'Geomancer',
  'Bard',
  'Dancer',
  'Mime',
];



function compareWeapons(a, b) {
  var apts = 0;
  var bpts = 0;

  if (a.special && b.special) return 0;
  else if (a.special) apts = 1;
  else if (b.special) bpts = 1;

  if (a.attack > b.attack) apts = 1;
  else if (b.attack > a.attack) bpts = 1;

  if (a.strength > b.strength) apts = 1;
  else if (b.strength > a.strength) bpts = 1;

  if (a.stamina > b.stamina) apts = 1;
  else if (b.stamina > a.stamina) bpts = 1;

  if (a.magic > b.magic) apts = 1;
  else if (b.magic > a.magic) bpts = 1;

  if (a.agility > b.agility) apts = 1;
  else if (b.agility > a.agility) bpts = 1;

  if (a.critical > b.critical) apts = 1;
  else if (b.critical > a.critical) bpts = 1;

  if (apts > bpts) return 1;
  else if (bpts > apts) return -1;
  else return 0;
}

function compareArmor(a, b) {
  var apts = 0;
  var bpts = 0;

  if (a.special && b.special) return 0;
  if (a.special) apts = 1;
  else if (b.special) bpts = 1;

  if (a.defense > b.defense) apts = 1;
  else if (b.defense > a.defense) bpts = 1;

  if (a.mdef > b.mdef) apts = 1;
  else if (b.mdef > a.mdef) bpts = 1;

  if (a.evade > b.evade) apts = 1;
  else if (b.evade > a.evade) bpts = 1;

  if (a.mevade > b.mevade) apts = 1;
  else if (b.mevade > a.mevade) bpts = 1;

  if (a.agility > b.agility) apts = 1;
  else if (b.agility > a.agility) bpts = 1;

  if (a.magic > b.magic) apts = 1;
  else if (b.magic > a.magic) bpts = 1;

  if (a.strength > b.strength) apts = 1;
  else if (b.strength > a.strength) bpts = 1;

  if (a.stamina > b.stamina) apts = 1;
  else if (b.stamina > a.stamina) bpts = 1;

  if (apts > bpts) return 1;
  else if (bpts > apts) return -1;
  else return 0;
}

function setImageOffset(e, x, y) {
  if (isNaN(x) || isNaN(y)) {
    var offset = $(e).css('object-position').replace(/px/g, '');
    var parts = offset.split(/ /);
    var xo = -1 * parts[0];
    var yo = -1 * parts[1];

    if (isNaN(x)) x = xo;
    if (isNaN(y)) y = yo;
  }

  $(e).css('object-position', (-x) + 'px ' + (-y) + 'px');
}

var jobSelects = $('.char select.job');
for (var i = 0; i < jobSelects.length; ++i) {
  var select = $(jobSelects[i]);

  for (var j = 0; j < jobs.length; ++j) {
    var option = $('<option>' + jobs[j] + '</options>');
    select.append(option);
  }

  select.change(function(e) {
    var t = $(e.target);
    console.log('job changed to ' + t.val());

    var index = t.prop('selectedIndex');
    var offset = 30 * index;

    setImageOffset(t.parent().find('img'), NaN, 30 * index);
  });
}

var weapons = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'weapons.json',
});

var armor = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'armor.json',
});

$('.item.typeahead').typeahead(null,
  // TODO make datasets for each armor slot
  { name: 'weapons', display: 'name', source: weapons },
  { name: 'armor', display: 'name', source: armor },
);

$('#q').typeahead(null,
  { name: 'weapons', display: 'name', source: weapons },
  { name: 'armor', display: 'name', source: armor },
);

$('#q').bind('typeahead:select', function(e, item) {
  console.log("Chose " + JSON.stringify(item));
  // showItem(item);

  for (var i = 0; i < 4; ++i) {
    var c = $($('.char')[i]);
    var sprite = c.find('img');
    var job = c.find('select').val();

    if (item.jobs.includes(job)) {
      sprite.addClass('crunk');
    } else {
      sprite.removeClass('crunk');
      setImageOffset(sprite, 0, NaN);
    }
  }
});

setInterval(function() {
  var crunks = $('img.crunk');
  for (var i = 0; i < crunks.length; ++i) {
    setImageOffset($(crunks[i]), Math.random() < 0.5 ? 0 : 240, NaN);
  }
}, 100);
