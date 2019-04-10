$(function () {
  var maxFloor = {
    castle: 5,
    darkness: 1,
    desert: 2,
    eastern: 2,
    escape: 4,
    hera: 6,
    ice: 7,
    mire: 2,
    overworld: 1,
    skull: 1,
    swamp: 2,
    thieves: 2,
    tower: 7,
    turtle: 3,
  };

  var world = 'overworld';
  var floor = 0;

  var setMap = function() {
    if (floor < 0) floor = 0;
    if (floor > maxFloor[world]) floor = maxFloor[world];

    $('img#map').attr('src', world + floor + '.png');
  };

  $('ul#nav li').click(function(e) {
    world = $(e.target).text().toLowerCase();
    floor = 0;
    setMap();
  });

  $(document).keydown(function(e) {
    if (e.key == 'ArrowUp') {
      floor--;
      setMap();
      e.preventDefault();
    } else if (e.key == 'ArrowDown') {
      floor++;
      setMap();
      e.preventDefault();
    }
  });
});
