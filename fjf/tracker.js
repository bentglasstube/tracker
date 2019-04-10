$(function() {
  var jobs = [
    '',
    'Knight',
    'Monk',
    'Thief',
    'Dragoon',
    'Ninja',
    'Samurai',
    'Berserker',
    'Hunter',
    'Sorcerer',
    'White Mage',
    'Black Mage',
    'Time Mage',
    'Summoner',
    'Blue Mage',
    'Red Mage',
    'Beastmaster',
    'Chemist',
    'Geomancer',
    'Bard',
    'Dancer',
    'Mime',
    'Void',
  ];

  function getJob(e) {
    var job = parseInt(e.attr('data-job'), 10);
    return isNaN(job) ? 0 : job;
  }

  function setJob(e, i) {
    e.find('p').text(jobs[i]);
    e.find('img').css('object-position', '0 ' + (-90 * i) + 'px');
    e.attr('data-job', i);
  }

  function saveData() {
    var data = {
      jobs: [
        getJob($('#butz')),
        getJob($('#lenna')),
        getJob($('#faris')),
        getJob($('#galuf')),
      ],
      time: timer.time,
      cara: $('#galuf img').attr('src') == 'cara.png',
    };

    localStorage.setItem('data', JSON.stringify(data));
  }

  function loadData() {
    var rawData = localStorage.getItem('data');
    if (rawData) {
      var data = JSON.parse(rawData);

      timer.time = data.time;

      setJob($('#butz'), data.jobs[0]);
      setJob($('#lenna'), data.jobs[1]);
      setJob($('#faris'), data.jobs[2]);
      setJob($('#galuf'), data.jobs[3]);

      if (data.cara) $('#galuf img').attr('src', 'cara.png');
    }
  }

  $(document).keypress(function(e) {
    switch (e.key) {
      case 'c':
      case 'k':
        $('#galuf img').attr('src', 'cara.png');
        saveData();
        break;

      case 'g':
        $('#galuf img').attr('src', 'galuf.png');
        saveData();
        break;
    }
  });

  $('.char').click(function(e) {
    setJob($(this), (getJob($(this)) + 1) % jobs.length);
    saveData();
    e.preventDefault();
  });

  $('.char').contextmenu(function(e) {
    setJob($(this), (getJob($(this)) + jobs.length - 1) % jobs.length);
    saveData();
    e.preventDefault();
  });

  $('#galuf').mousedown(function(e) {
    if (e.which == 2) {
      var t = $(e.target);
      if (t.attr('src') == 'galuf.png') {
        t.attr('src', 'cara.png');
      } else {
        t.attr('src', 'galuf.png');
      }
      saveData();
      e.preventDefault();
    }
  });

  $('#timer').contextmenu(function(e) {
    e.preventDefault();

    var hmsc = window.prompt('Enter timer value');

    if (hmsc == null || hmsc == '') return;

    var parts = hmsc.split(/:/);
    while (parts.length < 3) parts.unshift(0);

    var h = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var s = parseFloat(parts[2]);

    if (isNaN(h) || isNaN(m) || isNaN(s)) return;

    timer.time = s * 1000 + m * 1000 * 60 + h * 1000 * 60 * 60;
    saveData();
  });

  setInterval(saveData, 1000);

  loadData();
});
